# WeiPay ERC20 Wallet

WeiPay is a open source cryptocurrency wallet available for both IOS and Android mobile devices. 
WeiPay will support Ethereum out of the box with added support for ERC20 tokens and Bitcoin. 
An api will be created to host token details on IPFS in order for any fork of the wallet to provide 
uniform data to its users with the added benefits of reduced app storage space. 

# ESLINT installation
+ Locally install ESLINT module ```sudo npm install eslint --save-dev```
+ For VSCODE users install the ESLINT plugin
+ ```sudo npm install eslint-plugin-react --save-dev```
+ ```sudo npm install eslint-plugin-react-native --save-dev```
+ ```sudo npm install eslint-plugin-import --save-dev```

# Clean Clone to Build to IOS Device 
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

# How To:

+ ```git clone https://github.com/ChainSafe/WeiPay.git```
+ Navigate into the project directory
+ ```npm install, sudo npm install ./node_module``` (add 'sudo' if on linux)
+ ```react-native link```
+ ```git checkout -b yourBranchName```

# Software Requirements  
+ Node 8.0 +
+ XCODE - For IOS Build 
+ Android Studio - Android Build 
 - JDK >= 1.7 (if you run on 1.6 you will get an error on "_cameras = new HashMap<>();")
 - On Android, you require `buildToolsVersion` of `25.0.2+`. _This should easily and automatically be downloaded by Android Studio's SDK Manager._
 - Java should be in your system path

# Run on Simulator 

+ IOS: ```react-native run-ios```

+ Android: ```react-native run-android```
 - Run the following commands before running the command above
	 - ```sudo npm start``` (if on linux)
	 - Run the simulator from android studio or Connect your android device with usb debugging enabled


# Run on Device 

## IOS  
  1) Open /ios/WeiPay.xcodeproj in xcode 
  2) Sign in to developer team for signing provisions
  3) Choose your iphone as device target 
  4) Click the play button to build and run the project
  5) You will need to navigate to your iphone settings->general and trust your computer. New field will appear.

## Android 

 1.  Enable the Developers options on the Android Device by tapping 'Build Version' 5 times in About section
 2. Enable "Usb debugging" in the Developers option
 3. Run the following command in the project directory : ```adb reverse tcp:8081 tcp:8081```

# To Build and Debug with Android Studio run the following Commands
   
  Commands:
    * Android studio terminal: './gradlew assembleDebug'
    * System terminal 1:
                        * for Mac: ```npm start```
                        * for linux: ```sudo npm start```
    * System ternimal 2: ```react-native run-android```
 

Common Errors Encountered When Building For IOS

Fixing iOS build error for react native permissions
https://github.com/yonahforst/react-native-permissions/issues/42

Build error fishhook 
https://user-images.githubusercontent.com/637225/41004316-d626d112-68ef-11e8-8a5e-397a55777bc4.png

Select a development team
https://stackoverflow.com/questions/39524148/requires-a-development-team-select-a-development-team-in-the-project-editor-cod

Linking vectors
https://github.com/react-native-training/react-native-elements/issues/503
