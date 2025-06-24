import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateNavbarComponent } from './private-navbar.component';

describe('PrivateNavbar', () => {
  let component: PrivateNavbarComponent;
  let fixture: ComponentFixture<PrivateNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
