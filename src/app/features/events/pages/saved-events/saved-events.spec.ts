import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEvents } from './saved-events';

describe('SavedEvents', () => {
  let component: SavedEvents;
  let fixture: ComponentFixture<SavedEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
