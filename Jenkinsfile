#!groovy

properties([
  [
    $class: 'GithubProjectProperty',
    displayName: 'Document Management Viewer',
    projectUrlStr: 'https://github.com/hmcts/document-management-viewer/'
  ],
  pipelineTriggers([
    [$class: 'GitHubPushTrigger']
  ])
])


@Library('Reform')
import uk.gov.hmcts.Ansible
import uk.gov.hmcts.Artifactory
import uk.gov.hmcts.Packager
import uk.gov.hmcts.RPMTagger
import uk.gov.hmcts.Versioner

String channel = '#dm-pipeline'

def product = "dm"
def app = "document-management-viewer"
def artifactorySourceRepo = "evidence-local"

def ansible = new Ansible(this, product)
def artifactory = new Artifactory(this)
def packager = new Packager(this, product)
def versioner = new Versioner(this)

def rpmTagger
def rpmVersion
def version


node {
  try {
    stage('Checkout') {
      deleteDir()
      checkout scm
    }

    stage('Build') {
      sh "yarn install"
      sh "yarn setup"
    }

    stage('Lint') {
      sh 'yarn lint'
    }

    stage('Test') {
      sh "yarn test"
    }

    // Will add more stuff soon...

    notifyBuildFixed channel: channel

  } catch (e){
    notifyBuildFailure channel: channel
    throw e
  }
}
