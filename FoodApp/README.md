# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [
`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project
uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you
can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with
  our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll
  create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Build IOS Development Build With .p12 and .mobileprovision files

- Setup credentials.json
- Setup eas.json, ensure that the build profile development has this:
   ```json
   "ios": {
           "credentialsSource": "local"
         }
   ```
- Run the following command:
   ```bash
    npx expo install expo-dev-client
   ```  
### if you use EAS to build
- Run the following command:
   ```bash
    npm install -g eas-cli
    eas login
    eas build:configure
    eas build --platform ios --profile development 
   ```
### if you use local to build 
- **Requirements:** 
  - .p12 and .mobileprovision files for your device.
  - macos and xcode.
  - ios device and connected to mac.
- Run the following command:
  - create "ios" build folder: Do not select device when prebuild done (ctr+c)
     ```bash
      expo run:ios --device
     ```
  - open the project in Xcode:
     ```bash
      open -a Xcode ios
     ```
  - in target settings:
    - "signing & capabilities": uncheck "Automatically manage signing" and select provisioning profile.
    (you will need import .p12 to keychain (login) and .mobileprovision to Xcode)
    - "build settings" -> "signing": set following sections (all column) as your certificate and provisioning profile:
      - "code signing identity"
      - "development team" 
      -"provisioning profile" 
      (do this step for all targets and every time you run "expo prebuild --clean")
  - run expo run:ios --device again and select device to build.
  - wait and it will install on your device

### for build apk, ipa locally
- Run the following command: We need to set the path to the google-services.json file because EAS does not support .env file.
   ```bash
  export GOOGLE_SERVICES_JSON="/Users/yudhna_/FrontEnd_DiaDiemAnUong/FoodApp/GoogleService-Info.plist" && eas build --profile development --platform ios --local
   ```


### Reference
- https://docs.expo.dev/
   
  