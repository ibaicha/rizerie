import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementDialogComponent } from './mouvement-dialog.component';

describe('MouvementDialogComponent', () => {
  let component: MouvementDialogComponent;
  let fixture: ComponentFixture<MouvementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
