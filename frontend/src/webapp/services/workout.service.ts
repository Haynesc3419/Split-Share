import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Workout} from "../domain/workout";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  httpClient: HttpClient;
  baseUrl: string = 'http://localhost:8081/api/workout';

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  saveWorkoutToUser(workout: Workout, userId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/save/${userId}`, {workout}, {
      params: {
        name: workout.name,
        description: workout.description,
        exerciseIds: workout.exerciseIds
      }});
  }

  editWorkout(workout: Workout): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/edit`, {}, {
      params: {
        id: workout.id,
        name: workout.name,
        description: workout.description,
        exerciseIds: workout.exerciseIds
      }});
  }

  removeWorkoutFromUser(workoutId: string, userId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/remove/${workoutId}/${userId}`, {});
  }

  getWorkoutFromId(workoutId: string): Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.baseUrl}/${workoutId}`, {});
  }
}
