import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl, FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {WorkoutService} from "../../../services/workout.service";
import {User} from "../../../domain/user";
import {UserService} from "../../../services/user/user.service";
import {Exercise} from "../../../domain/exercise";
import {Workout} from "../../../domain/workout";
import {tick} from "@angular/core/testing";

@Component({
  selector: 'app-save-workout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './save-workout-modal.component.html',
  styleUrl: './save-workout-modal.component.less'
})
export class SaveWorkoutModalComponent {
  @Input('user') user: any;

  @Input('workout') workout?: any = {};

  @Input('isEdit') isEdit!: boolean;

  workoutForm: FormGroup;
  bsModalService: BsModalService;
  workoutService: WorkoutService;
  userService: UserService;
  exerciseService: ExerciseService;

  savedExercises: Exercise[] = [];
  formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder,
              bsModalService: BsModalService,
              workoutService: WorkoutService,
              userService: UserService,
              exerciseService: ExerciseService) {
    this.workoutForm = formBuilder.group({
      id: [this.workout.id],
      name: [this.workout.name, Validators.required],
      description: [this.workout.description, Validators.required],
      exerciseIds: formBuilder.array([])
    });
    this.bsModalService = bsModalService;
    this.workoutService = workoutService;
    this.userService = userService;
    this.exerciseService = exerciseService;
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    this.loadSavedExercises();
    this.fillDefaultFields();
  }

  fillDefaultFields() {
    this.workoutForm.controls['id'].setValue(this.workout.id);
    this.workoutForm.controls['name'].setValue(this.workout.name);
    this.workoutForm.controls['description'].setValue(this.workout.description);
    this.workout.exerciseIds.forEach((id: string) => {
      this.exerciseIds.push(new FormControl(id));
    });
  }

  loadSavedExercises(): void {
    this.savedExercises = this.exerciseService.getExercisesFromIds(this.user.savedExerciseIds);
  }

  addExercise() {
    this.exerciseIds.push(new FormControl());
  }

  removeExercise(index: number) {
    this.exerciseIds.removeAt(index);
  }

  get exerciseIds() {
    return this.workoutForm.get('exerciseIds') as FormArray<FormControl>;
  }

  submit(): void {
    if (!this.workoutForm.valid) {
      console.log('form not valid')
      return;
    }

    this.workout = {
      id: this.workoutForm.get('id')?.value,
      name: this.workoutForm.get('name')?.value,
      description: this.workoutForm.get('description')?.value,
      exerciseIds: []
    }

    this.exerciseIds.controls.forEach((control) => {
      this.workout.exerciseIds.push(control.value);
    })

    if (this.isEdit) {
      this.workoutService.editWorkout(this.workout).subscribe(()=> {
        this.close();
        location.reload()
      });
    } else {
      this.workoutService.saveWorkoutToUser(this.workout, this.user.id).subscribe(()=>{
        this.close();
        location.reload();
      });
    }
  }

  close(): void {
    this.bsModalService.hide();
  }
}
