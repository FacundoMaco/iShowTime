import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSearch } from './event-search';

describe('EventSearch', () => {
  let component: EventSearch;
  let fixture: ComponentFixture<EventSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
