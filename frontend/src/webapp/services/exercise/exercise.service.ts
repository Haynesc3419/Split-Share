import { Injectable } from '@angular/core';
import {Exercise} from "../../domain/exercise";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  baseUrl: string = 'http://localhost:8081/api/exercise';
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  editExercise(exercise: Exercise): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/edit`, {exercise}, {
      params: {
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        setRangeTop: exercise.setRangeTop,
        setRangeBottom: exercise.setRangeBottom,
        repRangeTop: exercise.repRangeTop,
        repRangeBottom: exercise.repRangeBottom
      }});
  }

  saveExerciseToUser(exercise: Exercise, userId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/save/${userId}`, {exercise}, {
      params: {
        name: exercise.name,
        description: exercise.description,
        setRangeTop: exercise.setRangeTop,
        setRangeBottom: exercise.setRangeBottom,
        repRangeTop: exercise.repRangeTop,
        repRangeBottom: exercise.repRangeBottom
      }});
  }

  removeExerciseFromUser(exerciseId: string, userId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/remove/${exerciseId}/${userId}`, {});
  }

  getExerciseFromId(exerciseId: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(`${this.baseUrl}/${exerciseId}`, {});
  }

  getExercisesFromIds(exerciseIds: string[]): Exercise[] {
    let exercises: Exercise[] = [];
    exerciseIds.forEach((id: string) => {
      this.getExerciseFromId(id).subscribe((exercise: Exercise) => {
        exercises.push(exercise)
      })
    });

    return exercises;
  }
}
