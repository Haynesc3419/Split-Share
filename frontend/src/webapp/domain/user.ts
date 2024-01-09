import {Workout} from "./workout";
import {Exercise} from "./exercise";

export interface User {
  id: string;
  name: string;
  following: User[];
  followers: User[];
  savedWorkoutIds: string[];
  savedExerciseIds: string[];
  dateOfBirth: Date;
  accountCreated: Date;
}
