export default {
    "expo": {
        "name": "FoodAppOu",
        "slug": "FoodApp",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "myapp",
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
                    "backgroundColor": "#ffffff"
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
            "@react-native-google-signin/google-signin"
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
                "android.permission.FOREGROUND_SERVICE_LOCATION"
            ],
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