import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaerobicExercisesComponent } from './anaerobic-exercises.component';

describe('ExercisesComponent', () => {
  let component: AnaerobicExercisesComponent;
  let fixture: ComponentFixture<AnaerobicExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaerobicExercisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaerobicExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
