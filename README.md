# Authentication App with React Navigation

This is a minimal project for the Take-Home Exercise.

It includes the following feauture:

-

## Getting Started

1. Clone the project from https://github.com/hisyamzakariaa/authapp

2. Install the dependencies

   npm install

3. For Expo Go, donwload the Expo Go application from app store/play store and scan the generated qr code. This will open the app and you can use it immedietly. (Can skip the rest of the step.)

4. For development build, build project

   npx expo prebuild

5. Run the project

   npm run android / npm run ios

The app will open and you can proceed to use the authentication app.

## Notes

In App.tsx, there is a constant called TIME_LIMIT. Adjust this value accordingly to test the credential validity after the given time. Ideally, when the app is reopen after the adjusted time limit, it will reset the authentication status and reroute user to sign in screen. User will need to login again to continue using the app.

## Resources

This app uses

1. React Navigation -> Navigation
2. Formik -> Form or inputs handling
3. Yup -> Validation
4. Vector Icons -> Icons
