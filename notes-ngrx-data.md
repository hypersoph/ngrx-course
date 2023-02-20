## Section 6: NgRx Data In Depth

### 38. Setting up NgRx Data in a Lazy Loaded Module

app.module.ts

The root application module will not itself have any entity associate to it. They are only associate to submodules like the lazy loaded courses feature module. Hence, we pass only an empty configuration object. to the forRoot method.

![image-20230218165928755](assets/image-20230218165928755.png)

courses.module.ts

configuration for the course entity. We will leave the configuration empty for now

![image-20230218165949236](assets/image-20230218165949236.png)

We will also be adding a service to this module

![image-20230218165958031](assets/image-20230218165958031.png)

Because this is a lazy loaded module we have to inject an entity definition service. We will use it to register the entity metadata map.![image-20230218170520195](assets/image-20230218170520195.png)



course-entity.service.ts

The CourseEntityService is actually a facade service which will allow us to do many things such as fetch data from a backend, save and access entity data in the store, and so on.

It brings together all the functionality we need to manage our course entity data.

![image-20230218170023969](assets/image-20230218170023969.png)

### 39. How Does NgRx Data Work? Transparent Fetching Data in Action

courses.resolver.ts

We inject the `coursesService` and use its `getAll()` method. ngrx data will automatically generate a get request to your backend using common conventions. We will be customizing this method to suit our application.

Note that observable returned is for a list of courses so we have to use the pipe operator and map it to a boolean.

![image-20230218180716667](assets/image-20230218180716667.png)

courses.module.ts

As before we add the resolver to the routes.

![image-20230218180728083](assets/image-20230218180728083.png)

![image-20230218180737119](assets/image-20230218180737119.png)

### 40. NgRx Custom Data Service - Fetching Data From the Backend

courses-data.service.ts

All we need to do to override the default behaviour of `getAll()` is to implement a custom data service.

We customize the getAll() method to send back the content of the payload key from the response to a get request to /api/courses.

![image-20230218183347331](assets/image-20230218183347331.png)

courses.module.ts

Make sure to add the new service to providers and register the service.

![image-20230218183404006](assets/image-20230218183404006.png)

Notice the auto generated actions dispatched by ngrx data will take care of requesting data from the backend and updating the store with the courses.

![image-20230218183117908](assets/image-20230218183117908.png)

![image-20230218183839619](assets/image-20230218183839619.png)

### 41. Controlling Data Loading with the NgRx Data loaded flag

Note that ngrx data has provided a loaded flag for us

![image-20230219112603757](assets/image-20230219112603757.png)

courses.resolver.ts'

We are going to tap into the loaded observable and ensure that we only make a request to the backend once, if the courses have not been already loaded.

The `filter` and `first` ensure that the transition to the target page do not happen until the resolver has fully loaded the courses.

![image-20230219112626035](assets/image-20230219112626035.png)

### 42. Querying Store Data with NgRx Data and the entities$ Observable

home.component.ts

Refactoring the home component to stop fetching data from the backend and instead get it from the store using our coursesService.

We don't need the loading flag anymore since that is being handled by ngrx.

![image-20230219193242919](assets/image-20230219193242919.png)

![image-20230219193223954](assets/image-20230219193223954.png)

![image-20230219192613439](assets/image-20230219192613439.png)

courses.module.ts

fixing the sort order of the courses

![image-20230219193305456](assets/image-20230219193305456.png)
