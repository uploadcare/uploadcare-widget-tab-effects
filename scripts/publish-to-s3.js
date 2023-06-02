/* eslint no-console: "off" */
/*
 Create a credentials file
 at ~/.aws/credentials on Mac/Linux
 or C:\Users\USERNAME\.aws\credentials on Windows
 Read more https://aws.amazon.com/sdk-for-node-js/
 */
const AWS = require('aws-sdk')
const fs = require('fs-extra')
const path = require('path')

const BUCKET = process.env.WIDGET_TAB_EFFECTS_S3_BUCKET
const BASE_PATH = process.env.WIDGET_TAB_EFFECTS_S3_PATH
const ACCESS_KEY = process.env.WIDGET_TAB_EFFECTS_S3_ACCESS_KEY
const SECRET_KEY = process.env.WIDGET_TAB_EFFECTS_S3_SECRET_KEY

if (!BASE_PATH || !BUCKET || !ACCESS_KEY || !SECRET_KEY) {
  console.log('S3 credentials not found')
  process.exit(0)
}

const getVersionTypes = (version) => [
  version,
  version.replace(/^(\d+\.\d+)\.\d+/, '$1.x'),
  version.replace(/^(\d+)\.\d+\.\d+/, '$1.x'),
]

const VERSION_TYPES = getVersionTypes(process.env.npm_package_version)
const UPLOAD_CONFIG = {
  ACL: 'public-read',
  Bucket: BUCKET,
  ContentType: 'application/javascript; charset=utf-8',
}

let s3 = new AWS.S3({credentials: new AWS.Credentials(ACCESS_KEY, SECRET_KEY)})

const s3upload = (params) => new Promise((resolve, reject) => s3.upload(params, (error, data) => {
  if (error) {
    reject(error)
  }
  else {
    resolve(data)
  }
}))

const getFileNames = async () => await fs.readdir(path.join(__dirname, '..', 'dist'))

const readFile = async (fileName) => await fs.readFile(path.join(__dirname, '..', 'dist', fileName), 'utf-8')

const uploadFile = async (fileName) => {
  const data = await readFile(fileName)

  const uploadParams = Object.assign({}, UPLOAD_CONFIG, {Body: data})

  const uploads = VERSION_TYPES.map(version =>
    s3upload(Object.assign({}, uploadParams, {Key: `${BASE_PATH}${version}/${fileName}`}))
  )

  return await Promise.all(uploads)
}

getFileNames()
  .then(fileNames => Promise.all(fileNames.map(fileName => uploadFile(fileName))))
  .then(uploadedFiles => uploadedFiles.forEach(uploadedFile => console.log('File uploaded: ', uploadedFile)))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
