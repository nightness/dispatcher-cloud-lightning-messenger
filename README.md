<!-- Comment -->
# Cloud Lightning Messenger

This is a frontend for [cloud-lightning-backend](https://github.com/nightness/cloud-lightning-backend); a OpenSource flexible chat system. It supports private, public, and group messages (with voice support coming soon). This client is built using React Native, more specifically Expo 41; supporting Android, iOS, and Web builds. The backend uses Firebase, for the easy setup; but support for MongoDB is in planning.

You can visit the live site @ [Cloud Lightning Web App](https://cloud-lightning.web.app/)


## Setup

```
npm i -g expo-cli firebase-tools
yarn
```

## Configure
1. Setup a new (or use and existing) firebase project. I also recommend that you double check project settings right away.
2. Click on the 'web button' above the `Add an app to get started` text.
3. Give your app an arbitrary nickname and click the `Register App` button.
4. You'll need the object part in step 6.
5. Create a `private/` folder in the project's root folder
6. Create a `private/FirebaseAuth.ts` file that looks like this...
```tsx
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "[API KEY]",
    authDomain: "[AUTH DOMAIN]",
    databaseURL: "[DATABASE URL",
    projectId: "[PRoJECT ID]",
    storageBucket: "[STORAGE BUCKET]",
    messagingSenderId: "[MESSAGE SENDER ID]",
    appId: "[APP ID]",
    measurementId: "[MEASUREMENT ID]"
}
```
7. From the CLI, in the project folder, type `firebase init` and setup hosting (This entire setup is optional if you just want to run locally)
## Startup

```
expo start
```
