module.exports = {
  mergeStrategy: {toSameBranch: ['master']},
  pullRequestReviewers: ['nd0ut'],
  afterPublish: ({exec}) => exec('node ./scripts/publish-to-s3.js'),
  beforeCommitChanges: ({exec}) => exec('npm run changelog'),
  // Here we update changelog using legacy kacl tool
  updateChangelog: false,
}
