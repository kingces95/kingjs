const assert = require('assert')
const ChildProcess = require('child_process')
const fs = require('fs')
const Process = require('process')

const createLinks = require('..')

const RepoDir = 'repo'
const TempRepoDir = `.${RepoDir}`

async function exists(path) {
  return new Promise((resolve) => {
    fs.exists(path, o => resolve(o))
  })
}

async function exec(command) {
  return new Promise((resolve, reject) => {
    ChildProcess.exec(command, (error, stdout, stderr) => {
      if (error)
        reject(error)
      else if (stderr)
        reject(stderr)
      else 
        resolve(stdout)
    })
  })
}

async function removeDir(path) {
  if (!await exists(path))
    return

  await exec(`rm -r "${path}"`)
}

function copyDir(source, target) {
  return exec(`cp -R "${source}" "${target}"`)
}

async function testTool(action) {
  await removeDir(TempRepoDir)
  try {
    await copyDir(RepoDir, TempRepoDir)
    Process.chdir(TempRepoDir)
    await action()
  } finally {
    Process.chdir('..')
    await removeDir(TempRepoDir)
  }
}

testTool(async () => {
  await createLinks()
  require('./.repo/a')
})