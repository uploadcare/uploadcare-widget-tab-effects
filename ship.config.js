module.exports = {
  mergeStrategy: {toSameBranch: ['master']},
  pullRequestReviewers: ['nd0ut'],
  publishCommand: ({tag}) => `npm stage publish --tag ${tag}`,
  beforePublish: ({exec}) => exec('node ./scripts/publish-to-s3.js'),
}
