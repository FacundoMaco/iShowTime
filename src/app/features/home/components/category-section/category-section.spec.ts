import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySection } from './category-section';

describe('CategorySection', () => {
  let component: CategorySection;
  let fixture: ComponentFixture<CategorySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
