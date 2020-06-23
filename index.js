const core = require('@actions/core');
const os = require('os')
const fs = require('fs')
try {
  const key = core.getInput('key');
  const secret = core.getInput('secret');
  const profile = core.getInput('profile');
  const region = core.getInput('region');
  console.log(`Setting up profile ${profile} in region ${region}...`)
  const awsDir = `${os.homedir()}/.aws`
  const credentials = `${awsDir}/credentials`
  const config = `${awsDir}/config`
  if (!fs.existsSync(awsDir)) {
    fs.mkdirSync(awsDir)
  }
  fs.appendFileSync(credentials, `[${profile}]\n`)
  fs.appendFileSync(credentials, `aws_access_key_id=${key}\n`)
  fs.appendFileSync(credentials, `aws_secret_access_key=${secret}\n`)
  fs.appendFileSync(config, `[profile ${profile}]\n`)
  fs.appendFileSync(config, `region ${region}\n`)
} catch (error) {
  core.setFailed(error.message);
}