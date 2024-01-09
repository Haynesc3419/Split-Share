import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveExerciseComponent } from './save-exercise-modal.component';

describe('SaveExerciseComponent', () => {
  let component: SaveExerciseComponent;
  let fixture: ComponentFixture<SaveExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
