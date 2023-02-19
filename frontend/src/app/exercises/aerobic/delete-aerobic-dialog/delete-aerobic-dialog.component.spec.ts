import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAerobicDialogComponent } from './delete-aerobic-dialog.component';

describe('DeleteAerobicDialogComponent', () => {
  let component: DeleteAerobicDialogComponent;
  let fixture: ComponentFixture<DeleteAerobicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAerobicDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAerobicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
