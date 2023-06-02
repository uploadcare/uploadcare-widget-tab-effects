module.exports = {
  mergeStrategy: {toSameBranch: ['master']},
  pullRequestReviewers: ['nd0ut'],
  beforePublish: ({exec}) => exec('node ./scripts/publish-to-s3.js'),
}
