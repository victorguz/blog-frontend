import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostOverviewComponent } from './blog-post-overview.component';

describe('BlogPostOverviewComponent', () => {
  let component: BlogPostOverviewComponent;
  let fixture: ComponentFixture<BlogPostOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
