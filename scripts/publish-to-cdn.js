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

if (!process.argv[2]) {
  throw 'Please, run that script with the argument that contain a name of your bucket'
}

const BASE_PATH = 'libs/widget-tab-effects/'
const VERSION = process.env.npm_package_version

const AWS_BUCKET_NAME = process.argv[2]
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
