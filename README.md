# Authentication App with React Navigation

This is a minimal project for the Take-Home Exercise.

It includes the following feauture:

-

## Getting Started

1. Clone the project from https://github.com/hisyamzakariaa/authapp

2. Install the dependencies

   npm install

   From here, if you want to proceed with Expo Go, follow step 3 to 6. If you want to continue with development build, jump to step 7 and proceed with next steps.

3. For Expo Go, donwload the Expo Go application from app store/play store.

4. Sign in to your account on both platform, Expo CLI on your laptop and Expo Go app on your phone.

5. Run npx expo start --go

6. Scan qr code with your phone and continue to use the applciation.

7. For development build, build project

   npx expo prebuild

8. Connect your phone to your laptop using USB cable

9. Run the project

   npm run android / npm run ios

This will install the build on your phone and you can proceed to use the authentication app when the build is done.

## Notes

In App.tsx, there is a constant called TIME_LIMIT. Adjust this value (in second) accordingly to test the credential validity after the given time. Ideally, when the app is reopen after the adjusted time limit, it will reset the authentication status and reroute user to sign in screen. User will need to login again to continue using the app.

## Resources

This app uses

1. React Navigation -> Navigation
2. Formik -> Form or inputs handling
3. Yup -> Validation
4. Vector Icons -> Icons
