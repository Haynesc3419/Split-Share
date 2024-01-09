import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";
import {ExerciseService} from "../../../services/exercise/exercise.service";

@Component({
  selector: 'app-save-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './save-exercise-modal.component.html',
  styleUrl: './save-exercise-modal.component.less'
})
export class SaveExerciseModalComponent implements OnInit {
  @Input('user') user: any;

  @Input('exercise') exercise?: any = {};

  @Input('isEdit') isEdit!: boolean;

  exerciseForm: FormGroup;
  bsModalService: BsModalService;
  exerciseService: ExerciseService;

  constructor(formBuilder: FormBuilder,
              bsModalService: BsModalService,
              exerciseService: ExerciseService) {
    this.exerciseForm = formBuilder.group({
      id: [this.exercise.id],
      name: [this.exercise.name, Validators.required],
      description: [this.exercise.description, Validators.required],
      setRangeBottom: [this.exercise.setRangeBottom, Validators.required],
      setRangeTop: [this.exercise.setRangeTop, Validators.required],
      repRangeBottom: [this.exercise.repRangeBottom, Validators.required],
      repRangeTop: [this.exercise.repRangeTop, Validators.required]
    });
    this.bsModalService = bsModalService;
    this.exerciseService = exerciseService;
  }

  ngOnInit() {
    this.fillDefaultFields();
  }

  fillDefaultFields() {
    Object.keys(this.exercise).forEach((key: string) => {
      this.exerciseForm.controls[key].setValue(this.exercise[key]);
    });
  }

  submit(): void {
    if (!this.exerciseForm.valid) {
      console.log('form not valid')
      return;
    }

    this.exercise = {
      id: this.exerciseForm.get('id')?.value,
      name: this.exerciseForm.get('name')?.value,
      description: this.exerciseForm.get('description')?.value,
      setRangeBottom: this.exerciseForm.get('setRangeBottom')?.value,
      setRangeTop: this.exerciseForm.get('setRangeTop')?.value,
      repRangeBottom: this.exerciseForm.get('repRangeBottom')?.value,
      repRangeTop: this.exerciseForm.get('repRangeTop')?.value
    }

    if (this.isEdit) {
      this.exerciseService.editExercise(this.exercise).subscribe(()=>{
        this.close();
      });
    } else {
      this.exerciseService.saveExerciseToUser(this.exercise, this.user.id).subscribe(()=>{
        this.close();
        this.exerciseService.removeExerciseFromUser(this.exercise.id, this.user.id).subscribe();
      });
    }
  }

  close(): void {
    this.bsModalService.hide();
  }

}
