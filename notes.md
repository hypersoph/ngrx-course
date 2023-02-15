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

Note the use of the `debugger` statement to pause execution at those points

- we click on login
- the component login() function is called
- a login action is dispatched
- the corresponding reducer is called
- the store is modified

## Section 3: NgRx Key Concepts - Selectors and Effects

### 13. How to Query the Store Data

We are going to show/hide the login/logout buttons depending on the auth state

**Use the convention of adding a $ sign at the end of a variable name for observable variables.**

Inject the store to the component by adding it to the constructor

![image-20230215095817470](assets/image-20230215095817470.png)

![image-20230215095517767](assets/image-20230215095517767.png)

![image-20230215095531636](assets/image-20230215095531636.png)

This implementation will always work but is inefficient as eg. the same value of true will be emitted to isLoggedIn$ several times through the application run, every time the store changes. We only want to update the values when the auth state changes. To do this, we will use NgRx selectors.

### 14. NgRx Selectors

auth.selectors.ts

![image-20230215101004226](assets/image-20230215101004226.png)

The first argument of createSelector is the slice of state we want

The second argument is a projector function which computes the value of isLoggedIn that we want. In our case we want it to be true if auth.user exists false otherwise.

Using this selector, the computation will only run again if the auth state changes. The results of each calculation will be kept in memory.

---

createSelector can also take a selector is the first argument, in which case the projection function will have access to the output of the selector. We use this to compute the isLoggedOut value.

![image-20230215101415903](assets/image-20230215101415903.png)

app.component.ts

![image-20230215101725652](assets/image-20230215101725652.png)

### 15. NgRx Feature Selectors

Previously we select the auth state using `state["auth"]` but this selection is not type safe and there is no intellisense when we do this

With a feature selector we will be doing the same thing but in a type safe way

![image-20230215103244842](assets/image-20230215103244842.png)

![image-20230215103550907](assets/image-20230215103550907.png)

### 16. Implementing User Logout

app.component.ts

When logout button is clicked a logout action should be dispatched

![image-20230215104759601](assets/image-20230215104759601.png)

index.ts > authReducer

Adding another reducer to define how to modify the auth state

![image-20230215104554026](assets/image-20230215104554026.png)

### 17. Implementing a Router Authentication Guard

We will create an authentication guard which will redirect the user to the login page if they are not logged in.

Note the @Injectable() decorator on the guard which is very easy to miss. If this is not added you will get an NG0204 error. The decorator is needed on every angular service.

![image-20230215111112527](C:\Users\Sophia\AppData\Roaming\Typora\typora-user-images\image-20230215111112527.png)

Add it to the authmodule

![image-20230215111224960](C:\Users\Sophia\AppData\Roaming\Typora\typora-user-images\image-20230215111224960.png)

app.module.ts

Specify that the courses route is protected by the AuthGuard

![image-20230215111245649](C:\Users\Sophia\AppData\Roaming\Typora\typora-user-images\image-20230215111245649.png)

### 18. Introduction to NgRx Effects

auth.module.ts

![image-20230215123257134](assets/image-20230215123257134.png)

app.module.ts

**![image-20230215123311747](assets/image-20230215123311747.png)**

### 19. Understanding NgRx Effects

- we subscribe to the actions observable
- whenever the user login action is dispatched
- as a side effect we will put the user data into local storage

---

- don't forget to add the @Injectable() as this is another angular service

![image-20230215132850352](assets/image-20230215132850352.png)

![image-20230215132918044](assets/image-20230215132918044.png)
