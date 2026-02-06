# Firebase Setup for Real-Time Comments

## Prerequisites
1. A Google account
2. Node.js and npm installed (for Firebase CLI)

## Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "portfolio-comments")
4. Enable Google Analytics if desired
5. Choose your Google Analytics account
6. Click "Create project"

## Step 2: Enable Firestore Database
1. In your Firebase project console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database
5. Click "Done"

## Step 3: Get Firebase Configuration
1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web app (</>)
4. Enter an app nickname
5. **Important:** Do NOT check "Also set up Firebase Hosting"
6. Click "Register app"
7. Copy the Firebase configuration object (apiKey, authDomain, etc.)

## Step 4: Update Configuration in firebase-setup.js
1. Open `firebase-setup.js` in your project
2. Replace the placeholder `firebaseConfig` object with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-actual-messaging-sender-id",
    appId: "your-actual-app-id"
};
```

## Step 5: Set Firestore Security Rules (Optional for Test Mode)
If you chose "test mode" in Step 2, Firestore allows all reads/writes for 30 days. For production, set proper security rules:

1. Go to Firestore Database > Rules
2. Update rules (example for comments collection):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{comment} {
      allow read, write: if true; // Allow all for demo - restrict in production
    }
  }
}
```

## Step 6: Test the Setup
1. Open your website in a browser
2. Try adding a comment
3. Open the site in another browser/tab - new comments should appear in real-time
4. Refresh the page - comments should persist

## Troubleshooting
- **Comments not saving**: Check browser console for Firebase errors
- **Real-time not working**: Verify Firestore rules allow reads/writes
- **Config errors**: Ensure all config values are correct and no extra spaces

## Security Note
The current setup allows anyone to read/write comments. For production, implement proper authentication and security rules to prevent spam/abuse.