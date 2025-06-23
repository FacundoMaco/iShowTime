import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuccess } from './register-success';

describe('RegisterSuccess', () => {
  let component: RegisterSuccess;
  let fixture: ComponentFixture<RegisterSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
