#!/bin/sh
yarn test:coverage

xdg-open report/units.html
open report/units.html

xdg-open coverage/index.html
open coverage/index.html

#./gradlew check
#./gradlew jacocoTestReport --info
#./gradlew sonarqube -Dsonar.host.url=$SONARQUBE_URL
#
#xdg-open build/reports/checkstyle/main.html
#open build/reports/checkstyle/main.html
#
#xdg-open build/reports/checkstyle/test.html
#open build/reports/checkstyle/test.html
#
#xdg-open build/reports/pmd/main.html
#open build/reports/pmd/main.html
#
#xdg-open build/reports/pmd/test.html
#open build/reports/pmd/test.html
#
#xdg-open build/reports/tests/test/index.html
#open build/reports/tests/test/index.html
#
#xdg-open build/reports/jacoco/test/html/index.html
#open build/reports/jacoco/test/html/index.html

