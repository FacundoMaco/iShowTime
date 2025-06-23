import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetSuccess } from './password-reset-success';

describe('PasswordResetSuccess', () => {
  let component: PasswordResetSuccess;
  let fixture: ComponentFixture<PasswordResetSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordResetSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
