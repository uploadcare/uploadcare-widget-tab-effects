/* eslint no-console: "off" */
/*
 Create a credentials file
 at ~/.aws/credentials on Mac/Linux
 or C:\Users\USERNAME\.aws\credentials on Windows
 Read more https://aws.amazon.com/sdk-for-node-js/
 */
const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')

const CONFIG_PATH = path.join(__dirname, '..', '.awsrc')

if (!fs.existsSync(CONFIG_PATH)) {
  throw 'Please, add AWS configuration file ".awsrc" to the project root.'
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))

if (typeof config.aws_bucket_name === 'undefined') {
  throw 'Please, add to the ".awsrc" file your bucket name under "aws_bucket_name" key.'
}

const AWS_BUCKET_NAME = config.aws_bucket_name
const BASE_PATH = 'libs/widget-tab-effects/'
const VERSION = process.env.npm_package_version
const UPLOAD_CONFIG = {
  ACL: 'public-read',
  Bucket: AWS_BUCKET_NAME,
}

let s3 = new AWS.S3()

const readFile = (fileName) => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, '..', 'dist', fileName), (error, data) => {
    if (error) {
      reject(error)
    }
    else {
      resolve(data)
    }
  })
})

const uploadFile = (fileName, data) => new Promise((resolve, reject) => {
  if (VERSION) {
    const uploadParams = Object.assign({}, UPLOAD_CONFIG, {
      Key: `${BASE_PATH}${VERSION}/${fileName}`,
      Body: data,
    })

    s3.upload(uploadParams, (error, data) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(data)
      }
    })
  }
  else {
    reject('Version is undefined')
  }
})

const publishFile = (fileName) => new Promise((resolve, reject) => {
  readFile(fileName)
    .then(data => uploadFile(fileName, data))
    .then(data => resolve(data))
    .catch(error => reject(error))
})

fs.readdir(path.join(__dirname, '..', 'dist'), (error, files) => {
  if (error) {
    throw error
  }

  Promise.all(files.map(fileName => publishFile(fileName)))
    .then(result => console.log(result))
    .catch(error => {
      throw error
    })
})
