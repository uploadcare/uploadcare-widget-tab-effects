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

if (typeof process.env.npm_package_version === 'undefined') {
  throw 'Please, add version to package.json'
}

const CONFIG_PATH = path.join(__dirname, '..', '.awsrc')

if (!fs.existsSync(CONFIG_PATH)) {
  throw 'Please, add AWS configuration file ".awsrc" to the project root.'
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))

if (typeof config.aws_bucket_name === 'undefined') {
  throw 'Please, add to the ".awsrc" file your bucket name under "aws_bucket_name" key.'
}

const getVersionTypes = (version) => [
  version,
  version.replace(/^(\d+\.\d+)\.\d+/, '$1.x'),
  version.replace(/^(\d+)\.\d+\.\d+/, '$1.x'),
]

const BASE_PATH = 'libs/widget-tab-effects/'
const VERSION_TYPES = getVersionTypes(process.env.npm_package_version)
const UPLOAD_CONFIG = {
  ACL: 'public-read',
  Bucket: config.aws_bucket_name,
  ContentType: 'application/javascript; charset=utf-8',
}

let s3 = new AWS.S3({credentials: new AWS.Credentials(config.access_key, config.secret_key)})

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
