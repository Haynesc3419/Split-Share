import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SaveExerciseModalComponent} from "../save-exercise/save-exercise-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {Exercise} from "../../../domain/exercise";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../domain/user";
import {CurrentUserService} from "../../../services/user/current-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-exercises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-exercises.component.html',
  styleUrl: './manage-exercises.component.less'
})
export class ManageExercisesComponent implements OnInit {
  user: any;
  savedExercises: any[] = [];
  bsModalRef: any;
  bsModalService: BsModalService;
  exerciseService: ExerciseService;
  userService: UserService;
  currentUserService: CurrentUserService;
  columnHeaders: string[] = [];
  router: Router;
  currentUser: User | null = null;

  constructor(bsModalService: BsModalService,
              exerciseService: ExerciseService,
              currentUserService: CurrentUserService,
              router: Router,
              userService: UserService) {
    this.bsModalService = bsModalService;
    this.exerciseService = exerciseService;
    this.userService = userService;
    this.currentUserService = currentUserService;
    this.router = router;
  }

  ngOnInit() {
    this.columnHeaders = ['Name', 'Description', 'Target Set Range', 'Target Rep Range', ''];
    this.currentUser = this.currentUserService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigateByUrl('login');
    } else {
      this.userService.getUserById(this.currentUser.id).subscribe((user: User) => {
        this.user = user;
        this.loadSavedExercises();
      });
    }
  }

  loadSavedExercises() {
    let savedExercises: Exercise[] = [];
    for (let i = 0; i < this.user.savedExerciseIds.length; i++) {
      this.exerciseService.getExerciseFromId(this.user.savedExerciseIds.at(i)).subscribe((exercise: Exercise) => {
        savedExercises.push(exercise);
      })
    }
    this.savedExercises = savedExercises;
  }

  saveExercise() {
    this.bsModalRef = this.bsModalService.show(SaveExerciseModalComponent, {
      class: 'modal-lg',
      initialState: {
        user: this.user,
        isEdit: false
      }
    });
  }

  editExercise(exercise: Exercise) {
    this.bsModalRef = this.bsModalService.show(SaveExerciseModalComponent, {
      class: 'modal-lg',
      initialState: {
        user: this.user,
        exercise: exercise,
        isEdit: true
      },
    });
  }

  removeExercise(exerciseId?: string) {
    if (!exerciseId) {
      return;
    }
    this.exerciseService.removeExerciseFromUser(exerciseId, this.user.id).subscribe({
      next: () => location.reload(),
      error: () => console.log('error')
    })
  }

  processRowData(exercise: Exercise): string[] {
    return [
      exercise.name,
      exercise.description,
      `[${exercise.setRangeBottom}, ${exercise.setRangeTop}]`,
      `[${exercise.repRangeBottom}, ${exercise.repRangeTop}]`,
    ]
  }
}
