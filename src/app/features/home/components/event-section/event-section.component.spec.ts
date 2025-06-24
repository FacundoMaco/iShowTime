import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSectionComponent } from './event-section.component';

describe('EventSection', () => {
  let component: EventSectionComponent;
  let fixture: ComponentFixture<EventSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
