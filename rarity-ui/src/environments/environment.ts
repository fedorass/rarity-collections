// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDXQc-TyKBE3x_fraxqxpLnbBLakwkISI8",
    authDomain: "rarity-collection.firebaseapp.com",
    databaseURL: "https://rarity-collection.firebaseio.com",
    projectId: "rarity-collection",
    storageBucket: "rarity-collection.appspot.com",
    messagingSenderId: "235485876481"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
