import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BsModalService} from "ngx-bootstrap/modal";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../domain/user";
import {Exercise} from "../../../domain/exercise";
import {SaveExerciseModalComponent} from "../../exercise/save-exercise/save-exercise-modal.component";
import {Workout} from "../../../domain/workout";
import {WorkoutService} from "../../../services/workout.service";
import {SaveWorkoutModalComponent} from "../save-workout-modal/save-workout-modal.component";
import {CurrentUserService} from "../../../services/user/current-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-workouts',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './manage-workouts.component.html',
  styleUrl: './manage-workouts.component.less'
})
export class ManageWorkoutsComponent implements OnInit {
  user: any;
  savedWorkouts: any[] = [];
  bsModalRef: any;
  bsModalService: BsModalService;
  workoutService: WorkoutService;
  userService: UserService;
  columnHeaders: string[] = [];
  router: Router;
  currentUserService: CurrentUserService;
  currentUser: User | null = null;

  constructor(bsModalService: BsModalService,
              workoutService: WorkoutService,
              userService: UserService,
              router: Router,
              currentUserService: CurrentUserService) {
    this.bsModalService = bsModalService;
    this.workoutService = workoutService;
    this.userService = userService;
    this.router = router;
    this.currentUserService = currentUserService;
  }

  ngOnInit() {
    this.columnHeaders = ['Name', 'Description', '# Exercises', ' ']
    this.currentUser = this.currentUserService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigateByUrl('login');
    } else {
      this.userService.getUserById(this.currentUser.id).subscribe((user: User) => {
        this.user = user;
        this.loadSavedWorkouts();
      });
    }
  }

  loadSavedWorkouts() {
    let savedWorkouts: Workout[] = [];
    for (let i = 0; i < this.user.savedWorkoutIds.length; i++) {
      this.workoutService.getWorkoutFromId(this.user.savedWorkoutIds.at(i)).subscribe((workout: Workout) => {
        savedWorkouts.push(workout);
        this.savedWorkouts = savedWorkouts;
      })
    }
  }

  saveWorkout() {
    this.bsModalRef = this.bsModalService.show(SaveWorkoutModalComponent, {
      class: 'modal-lg',
      initialState: {
        user: this.user,
        isEdit: false
      }
    });
  }

  editWorkout(workout: Workout) {
    this.bsModalRef = this.bsModalService.show(SaveWorkoutModalComponent, {
      class: 'modal-lg',
      initialState: {
        user: this.user,
        workout: workout,
        isEdit: true
      },
    });
  }

  removeWorkout(workoutId?: string) {
    if (!workoutId) {
      return;
    }
    this.workoutService.removeWorkoutFromUser(workoutId, this.user.id).subscribe({
      next: () => location.reload(),
      error: () => console.log('error')
    })
  }

  processRowData(workout: Workout): string[] {
    return [
      `${workout.name}`,
      `${workout.description}`,
      `${workout.exerciseIds.length}`
    ]
  }

}
