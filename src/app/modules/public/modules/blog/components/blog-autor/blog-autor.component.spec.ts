import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAutorComponent } from './blog-autor.component';

describe('BlogAutorComponent', () => {
  let component: BlogAutorComponent;
  let fixture: ComponentFixture<BlogAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogAutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
