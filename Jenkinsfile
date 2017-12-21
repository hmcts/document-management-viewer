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

def product = "evidence"
def app = "document-management-viewer"
def artifactorySourceRepo = "evidence-local"

def ansible = new Ansible(this, "dm")
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

    stage('Node security check') {
      try {
        sh 'yarn test:nsp'
      } catch (Throwable e) {
        def errors = sh(script: 'yarn test:nsp-warn', returnStdout: true)
        slackSend(
          channel: channel,
          color: 'danger',
          message: "${env.JOB_NAME}:  <${env.BUILD_URL}console|Build ${env.BUILD_DISPLAY_NAME}> has vunerabilities: ${errors}")

      }finally{
//                need to generate a nsp report somehow
      }
    }

    stage('Test') {
      sh "yarn test:coverage"
    }

    if ("master" == "${env.BRANCH_NAME}") {
      stage('Sonar') {
        sh "yarn sonar-scan -Dsonar.host.url=$SONARQUBE_URL"
      }
    }

    stage('Package') {
      sh 'yarn build'
    }

    if ("master" == "${env.BRANCH_NAME}") {

      stage('Package (RPM)') {
        rpmVersion = packager.nodeRPM(app)
        version = "{document_management_viewer_version: ${rpmVersion}}"
      }

      stage('Publish RPM') {
        packager.publishNodeRPM(app)
        def rpmName = packager.rpmName(app, rpmVersion)
        rpmTagger = new RPMTagger(this, app, rpmName, artifactorySourceRepo)
      }
    }

    notifyBuildFixed channel: channel

  } catch (e){
    notifyBuildFailure channel: channel
    throw e
  }
}
