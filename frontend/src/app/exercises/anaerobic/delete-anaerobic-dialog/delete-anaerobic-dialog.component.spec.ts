import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAnaerobicDialogComponent } from './delete-anaerobic-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: DeleteAnaerobicDialogComponent;
  let fixture: ComponentFixture<DeleteAnaerobicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAnaerobicDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAnaerobicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
