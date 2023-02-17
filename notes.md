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
