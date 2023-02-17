import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Course } from "./model/course";
import * as  fromCourses from './reducers/course.reducers';
import { CourseState } from "./reducers/course.reducers";

export const selectCoursesState = createFeatureSelector<CourseState>("courses");

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category == 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);
