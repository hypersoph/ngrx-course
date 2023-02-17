## Section 5: NgRx Entity in Depth

### 26. Feature Design - Defining Actions First

We will begin by defining the actions

loadAllCourses is more of a command that will tell the application to fetch data from the backend

- it will come from a resolver

allCoursesLoaded is more of an event in response to successful fetching of the courses from the backend.

- this is needed to tell the application to put the fetched data into the store

![image-20230216091142340](assets/image-20230216091142340.png)

Similar to what we did with the auth actions we add a new file under courses/ called action-types.ts so that we can export all the actions under the convenient name `CourseActions`

![image-20230217104744510](assets/image-20230217104744510.png)

### 27. Loading NgRx Entity Data using a Router Resolver

Note the @Injectable annotation to denote that this resolver is an angular service.

To ensure completion of the action, eg. the `first()` operator will make it so that the observable must emit at least one value before letting the router know that the root transition can be completed (router can show the target screen).

`loading = false` we use a flag variable to ensure that the action is dispatched only when it is not already

`finalize()` we must set the loading flag back to false once the action has completed.

![image-20230217110744256](assets/image-20230217110744256.png)

courses.module.ts

We have to add a resolver to the routes for the courses module so that the router will resolve any necessary data for the page before loading the target page.

![image-20230217110432919](assets/image-20230217110432919.png)

We also have to add the resolver into the module's providers since it is an injectable service 

![image-20230217110651036](assets/image-20230217110651036.png)
