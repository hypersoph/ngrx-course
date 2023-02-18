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
