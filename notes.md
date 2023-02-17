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

### 28. NgRx Effects

When the loadAllCourses action is dispatched we want to create a side effect of fetching courses from the backend

We then dispatch the `allCoursesLoaded` action to store the fetched data in our store.

![image-20230217113749777](assets/image-20230217113749777.png)

![image-20230217113807675](assets/image-20230217113807675.png)

courses.module.ts

Make sure to import the effects module

![image-20230217113824570](assets/image-20230217113824570.png)

### 29. Understanding the NgRx Entity Format

Easiest way to store the new courses state inside the store would be to directly store the array of courses under a course key. However this is not practical for common operations such as looking up courses by id.

![image-20230217115455565](assets/image-20230217115455565.png)

A better way is implement a map. This entities property is a map whose keys are the course ids and the values are the courses corresponding to the course ids. There is still a problem with this in that the ordering of the courses might be important and we would need an auxiliary function to transform this map to an array.

![image-20230217115817620](assets/image-20230217115817620.png)

One way of preserving the order would be to an ids array and an auxiliary function would be able to combine the information with the entities map.

This format below is called the Entity format. It consists of a map of the entities and an array that defines the order of the entities.

![image-20230217120029967](assets/image-20230217120029967.png)

Note that our Courses have a sequence number which is information on the order they should be displayed.

![image-20230217120127678](assets/image-20230217120127678.png)

The NgRx Entity module allows us to very easily store our entity data in the Entity format above. 

Have the CourseState extend the EntityState interface

![image-20230217115225457](assets/image-20230217115225457.png)

Notice that we have the entities and the ids properties now

![image-20230217115254747](assets/image-20230217115254747.png)

### 30. Implementing Reducers Using the NgRx Entity Adapter

Having the courses state in the entity format makes it convenient to query but now it is cumbersome to do common array options on it in this format such as adding courses.

This is why we create an entity adapter. Note that this adapter has many convenience methods shown below.

![image-20230217131147935](assets/image-20230217131147935.png)

We will use the `getInitialState()` method of the adapter to set the initial courses state and then createReducer to create our reducer.

on dispatch of the `allCoursesLoaded` action we want to store all the courses in the store.

![image-20230217133300540](assets/image-20230217133300540.png)

Add the reducer to courses.module.ts

![image-20230217133527143](assets/image-20230217133527143.png)

In the redux devtools on login we can see the courses are successfully being stored in the entity format.

![image-20230217132952314](assets/image-20230217132952314.png)

### 31. NgRx Entity Selectors

The NgRx entity adapter has premade methods for generating selectors. We want to select all courses.

course.reducer.ts

![image-20230217144029767](assets/image-20230217144029767.png)

From this selector we make a few more selectors which are needed to populate the home component.

![image-20230217144114654](assets/image-20230217144114654.png)

home.component.ts

Refactoring the home component to select data from the store instead of making requests to the backend.

![image-20230217144143822](assets/image-20230217144143822.png)
