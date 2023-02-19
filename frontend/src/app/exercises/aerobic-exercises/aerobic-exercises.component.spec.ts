import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AerobicExercisesComponent } from './aerobic-exercises.component';

describe('AerobicExercisesComponent', () => {
  let component: AerobicExercisesComponent;
  let fixture: ComponentFixture<AerobicExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AerobicExercisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AerobicExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
