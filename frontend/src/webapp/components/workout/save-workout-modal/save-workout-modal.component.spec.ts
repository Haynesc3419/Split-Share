import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWorkoutModalComponent } from './save-workout-modal.component';

describe('SaveWorkoutModalComponent', () => {
  let component: SaveWorkoutModalComponent;
  let fixture: ComponentFixture<SaveWorkoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveWorkoutModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveWorkoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
