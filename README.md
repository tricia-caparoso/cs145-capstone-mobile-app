# CS 145 Capstone - Smart Bike Rack

## What you need?
* [React-native](https://facebook.github.io/react-native/docs/getting-started.html)
* [AWS-Amplify](https://github.com/aws-amplify/amplify-js)

## Additional Documentations
* [Get Started with React-native](https://facebook.github.io/react-native/)
* [Get Started with AWS-Amplify](https://aws-amplify.github.io/)
* [Using AWS-Amplify with React-native](https://facebook.github.io/react-native/blog/2018/03/05/AWS-app-sync)
* [Running your App on a physical device](https://facebook.github.io/react-native/docs/running-on-device): You can check this out if you are not planning on using Expo to run your app

## Cloning and Setup
1. To clone the repository
```bash
git clone https://github.com/tricia-caparoso/cs145-capstone-mobile-app.git
```
2. Setting up the application
```bash
cd SmartRack
npm install
```
3. Running the application on physical device

    a. Make sure USB debugging is enabled on your device. This can be found on the Developer Options.

    b. Plug-in the device and run the code below
    ```bash
    adb devices
    ```
    c. For running the app in Android,
    ```bash
    react-native run-android
    ```
    For iOS,
    ```bash
    react-native run-ios
    ```
