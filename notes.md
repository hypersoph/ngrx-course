# [NgRx (with NgRx Data) - The Complete Guide (Angular 15)](https://www.udemy.com/course/ngrx-course/)

setup

`npm install`

`npm run server` - start the server

`npm start` - equivalent to npm run start

To add ngrx store

`ng add @ngrx/store --no-minimal`

Note: without --no-minimal angular will not create the reducers folder in app/

for ease of inspecting the store:

`ng add @ngrx/store-devtools`

###7.  Configuring an NgRx Feature Module using NgRx schematics

`ng generate store auth/Auth --module auth.module.ts`

where auth/Auth is in the form path-from-root-folder/name

path-from-root-folder where the root folder in our case is src/app/ and there is an auth/ folder in it
and the name is related to naming of the feature

### 8. The Store Service API - Implementing the Login Screen

Rename the `State` interface in app/reducers/index.ts to `AppState` to make clear that it is the global state for this application

Provide the store to the login component

![image-20230206111017605](assets/image-20230206111017605.png)

### 9. Defining NgRx Actions Using Action Creators

Naming convention for actions

[dispatch source] Event name

dispatch source - where the action is coming from

Event - event or command that the action corresponds to

![image-20230206114043005](assets/image-20230206114043005.png)

The `props` portion of this defines the type of payload that should be sent with the action

![image-20230206131808693](assets/image-20230206131808693.png)

### 10. Grouping Actions Together with Action Types

We create a file action-types.ts in the auth folder and export everything in auth.actions.ts like so

```typescript
import * as AuthActions from './auth.actions';

export {AuthActions};
```

This is a very useful trick for grouping related actions together and making them accessible across the app.

### 11. NgRx Reducers

initialAuthState will be what is in the auth state by default

We also add how to modify the sate when the login action has been dispatched.

![image-20230206163024868](assets/image-20230206163024868.png)

![image-20230206163248526](assets/image-20230206163248526.png)

### 12. Key concepts summary - tracing ngrx actions and reducers

Rewriting the login() function in login.component.ts for debugging purposes

![image-20230206163836649](assets/image-20230206163836649.png)

And auth/reducers/index.ts

![image-20230206163905936](assets/image-20230206163905936.png)
