fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios slack_testflight
```
fastlane ios slack_testflight
```
Slack notification for succesful build to TestFlight
### ios certificates
```
fastlane ios certificates
```
Fetch certificates and provisioning profiles
### ios beta
```
fastlane ios beta
```
Ship to Testflight.

----

## Android
### android slack_playstore
```
fastlane android slack_playstore
```
Slack notification for succesful build to Playstore
### android beta
```
fastlane android beta
```
Ship to Playstore Beta.

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
