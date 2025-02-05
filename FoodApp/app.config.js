export default {
    "expo": {
        "name": "FoodAppOu",
        "slug": "FoodApp",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "foodappou",
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,
        "plugins": [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    "image": "./assets/images/splash-icon.png",
                    "imageWidth": 200,
                    "resizeMode": "contain",
                    "backgroundColor": "#E95322"
                }
            ],
            "expo-font",
            [
                "expo-location",
                {
                    "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location.",
                    "locationAlwaysPermission": "Allow $(PRODUCT_NAME) to use your location.",
                    "locationWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location.",
                    "isIosBackgroundLocationEnabled": true,
                    "isAndroidBackgroundLocationEnabled": true
                }
            ],
            "@react-native-google-signin/google-signin",
            [
                "expo-image-picker",
                {
                    "photosPermission": "The app accesses your photos to let you share them with your friends."
                }
            ],



        ],
        "ios": {
            "supportsTablet": true,
            "bundleIdentifier": "com.Mrdochien2025.FoodApp",
            "infoPlist": {
                "UIBackgroundModes": [
                    "location",
                    "fetch",
                    "remote-notification"
                ],
                "NSLocationWhenInUseUsageDescription": "This app requires access to your location when open.",
                "NSLocationAlwaysAndWhenInUseUsageDescription": "This app requires access to your location even when closed.",
                "NSLocationAlwaysUsageDescription": "This app requires access to your location when open.",
                "NSCameraUsageDescription": "This app requires access to your camera to take photos.",
                "NSMicrophoneUsageDescription": "This app requires access to your microphone for audio recording.",
                "NSPhotoLibraryUsageDescription": "This app requires access to your photo library to save images.",
                "NSPhotoLibraryAddUsageDescription": "This app needs access to your photo library to store media files.",
                "NSUserNotificationUsageDescription": "This app would like to send you notifications.",
                "NSMotionUsageDescription": "This app needs access to motion sensors for better user experience.",
                "deploymentTarget": "15"
            },
            "appleTeamId": "U8H6FJX25X",
            "googleServicesFile": process.env.GOOGLE_SERVICES_JSON ?? "./GoogleService-Info.plist"
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            "package": "com.wangedoc.FoodApp",
            "permissions": [
                "android.permission.ACCESS_COARSE_LOCATION",
                "android.permission.ACCESS_FINE_LOCATION",
                "android.permission.ACCESS_BACKGROUND_LOCATION",
                "android.permission.FOREGROUND_SERVICE",
                "android.permission.FOREGROUND_SERVICE_LOCATION",
                "android.permission.CAMERA",
                "android.permission.RECORD_AUDIO",
                "android.permission.READ_EXTERNAL_STORAGE",
                "android.permission.WRITE_EXTERNAL_STORAGE",
                "android.permission.POST_NOTIFICATIONS",
                "android.permission.VIBRATE"
            ],
            "useNextNotificationsApi": true
        },
        "web": {
            "bundler": "metro",
            "output": "static",
            "favicon": "./assets/images/favicon.png"
        },
        "experiments": {
            "typedRoutes": true
        },
        "extra": {
            "router": {
                "origin": false
            },
            "eas": {
                "projectId": "9ff97309-a234-4e13-b8a5-c5349bd6edf7"
            }
        },
        "owner": "hoanganhduy"
    }
}
