# WeiPay ERC20 Wallet

WeiPay is a open source cryptocurrency wallet available for both IOS and Android mobile devices. 
WeiPay will support Ethereum out of the box with added support for ERC20 tokens and Bitcoin. 
An api will be created to host token details on IPFS in order for any fork of the wallet to provide 
uniform data to its users with the added benefits of reduced app storage space. 

## Hackathon Objectives for WeiPay 
1) Add ERC20 transactions 
2) Add Bitcoin wallet/transactions 
3) Save graphQL/Prisma api json data on IPFS

## WeiPay File Structure 

* android
* ios
* src
  + actions
    + ActionCreator.js
    + ActionTypes.js
  + assets
    + images.js
      + btc.png
      + eth.png
      + QR-CODE.png
  + components
    + common
      + Card.js
      + CardSection.js
      + Input.js
      + Logo.js
    + contacts
      + AddContactList.js
      + AddContactListItem.js
    + tokens
      + CoinList.js
      + ListItem.js
    + CurrencyList.js
    + LanguageList.js
  + constants
    + config 
      + ERC20
    + data
      + json
        + coins.json
        + fiatList.json
        + languageList.json
    + Layout.js
    + Network.js
    + Provider.js
    + Terms.js 
  + navigation
    + drawer
      + index
    + stack
      + index.js
      + navigationStack.js
  + reducers
    + contacts
      + contactsReducer.js
    + fiat
      + fiatListReducer.js
     + language
       + languageListReducer.js
     + navigation
        + navigationReducer.js
     + settings
        + settingsReducer.js
    + wallet
        + NewWalletSetup.js
        + QrScannerReducer.js
        + RestoreWalletReducer.js
    + index.js
  + screens
    + menu 
      + contacts
        + add
          + AddContact.js
          + AddFirstContact.js
        + index.js
        + SelectedContact.js
      + settings
         + BackupPhrase.js
         + ChangeCurrency.js
         + index.js
         + LanguageChange.js
         + Search.js
    + portfolio
      + tabs
         + PortfolioCoin.js
         + PortfolioToken.js
      + index.js
    + qr
      + QrCodeScanner.js
    + tokens
      + add
        + Coins.js
        + index.js
        + Tokens.js
      + history
        + CoinActivity.js
      + receive
        + CoinReceive.js
        + TokenReceive.js
      + send
        + CoinSend.js
        + TokenSend.js
     + setup
      + create
        + ConfirmPassphrase.js
        + CreateWalletName.js
        + GeneratePassphrase.js
      + crypto
        + EnableTokens.js
      + recover
        + CreateWalletName.js
        + RecoverWallet.js
      + terms
        + TermsAndConditions.js
      + index.js 
* App.js
* index.js
* store.js
* package.json



# How To:

+ git clone https://github.com/ChainSafe/WeiPay.git
+ npm install 
+ react-native link
+ git checkout -b yourBranchName

# Software Requirements  
+ Node 8.0 +
+ XCODE - For IOS Build 
+ Android Studio - Android Build 

# Run on Simulator 

+ IOS: react-native run-ios

+ Android: react-native run-android

# Run on Device 

## IOS  
  1) Open /ios/WeiPay.xcodeproj in xcode 
  2) Sign in to developer team for signing provisions
  3) Choose your iphone as device target 
  4) Click the play button to build and run the project
  5) You will need to navigate to your iphone settings->general and trust your computer. New field will appear.

## Android 

# To Build and Debug with Android Studio run the following Commands
  
If there is a react-native-camera folder in Android studio do the following first:
* system terminal:  'npm install react-native-camera --save'
  
  Commands:
    * Android studio terminal: './gradlew assembleDebug'
    * System terminal 1:
                        * for Mac: 'npm start'
                        * for linux: 'sudo npm start'
    * System ternimal 2: 'react-native run-android'
 

Common Errors Encountered When Building For IOS

Fixing iOS build error for react native permissions
https://github.com/yonahforst/react-native-permissions/issues/42

Build error fishhook 
https://user-images.githubusercontent.com/637225/41004316-d626d112-68ef-11e8-8a5e-397a55777bc4.png

Select a development team
https://stackoverflow.com/questions/39524148/requires-a-development-team-select-a-development-team-in-the-project-editor-cod

Linking vectors
https://github.com/react-native-training/react-native-elements/issues/503
