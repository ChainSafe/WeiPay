## WeiPay ERC20 Wallet
WeiPay is a open source Ethereum and ERC20 wallet available for both IOS and Android mobile devices. WeiPay allows for multiple network and wallet configurations, contract interactions, and contact key management. 

## How To:
+ ```git clone https://github.com/ChainSafe/WeiPay.git```
+ ```npm install, sudo npm install``` (if on linux)
+ ```react-native link```
+ ```react-native run-ios``` || ```react-native run-android```

## Software Requirements  
+ Node 8.0 +
+ XCODE - For IOS Build 
+ Android Studio - Android Build 
 - JDK >= 1.7 (if you run on 1.6 you will get an error on "_cameras = new HashMap<>();")
 - On Android, you require `buildToolsVersion` of `25.0.2+`. _This should easily and automatically be downloaded by Android Studio's SDK Manager._
 - Java should be in your system path

## ESLINT installation
+ Locally install ESLINT module ```sudo npm install eslint --save-dev```
+ For VSCODE users install the ESLINT plugin
+ ```sudo npm install eslint-plugin-react --save-dev```
+ ```sudo npm install eslint-plugin-react-native --save-dev```
+ ```sudo npm install eslint-plugin-import --save-dev```

## IOS physical device third party build error
+ ```git clone https://github.com/ChainSafe/WeiPay.git```
+ ```npm install``` or ```yarn install``` 
+ ```react-native link```
+ React Native/Xcode build issue
  - Double Conversion Errors -> Xcode -> Libraries -> RCTWebSocket.xcodeproj -> Build Phases - > Link Binary   with Libraries -> select libfishhook.a and click " - " button. Click " + " and add libfishhook.a to add the broken dependency.
  - ```https://github.com/facebook/react-native/issues/19839```
  - React Native third party library issue -> ```https://github.com/facebook/react-native/issues/14382```
  - Solution: ```CD /node_modules/react-native/third-party/glog & ./configure```
  - This will throw one last error in xcode, you must change the return value of the function to NULL and comment out the current return statement (return (void*)context->PC_FROM_UCONTEXT;).
  - ```https://github.com/facebook/react-native/issues/16106```
  - Build & run project -> select developer profile -> make sure deployment targets are the same in both your project and the tests project -> WeiPay should build to your physical ios device
  
 ## Common Errors Encountered When Building For IOS

Fixing iOS build error for react native permissions
https://github.com/yonahforst/react-native-permissions/issues/42

Build error fishhook 
https://user-images.githubusercontent.com/637225/41004316-d626d112-68ef-11e8-8a5e-397a55777bc4.png

Select a development team
https://stackoverflow.com/questions/39524148/requires-a-development-team-select-a-development-team-in-the-project-editor-cod

Linking vectors
https://github.com/react-native-training/react-native-elements/issues/503

## Build to physical android device 
 1. Enable the Developers options on the Android Device
 2. Enable Usb debugging in the Developers option
 
 For immediate app testing and debugging, you can build a debug APK. The debug APK is signed with a debug key provided by the SDK tools and allows debugging through adb.

To build a debug APK, open a command line and navigate to the root of your project directory. To initiate a debug build, invoke the assembleDebug task:

  + ```cd android && ./gradlew assembleDebug```
  + ```react-native run-android```

If your device is not found
+ check devices with ```adb devices```
+  Run the following command in the project directory : ```adb reverse tcp:8081 tcp:8081```

