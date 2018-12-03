#!/bin/sh

curl -L -o gradle.properties ${GRADLE_PROPERTIES_URL}
curl -L -o wei-pay-android.keystore ${KEYSTORE_DOWNLOAD_URL}
curl -L -o playstore-api-key.json ${PLAYSTORE_API_KEY}