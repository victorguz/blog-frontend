import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
})
export class BlogCategoriesComponent implements OnInit {
  public categories = [
    { id: 1, name: 'Home', category: 'home' },
    { id: 2, name: 'Frontend', category: 'frontend' },
    { id: 3, name: 'Backend', category: 'backend' },
    { id: 4, name: 'UX/UI', category: 'uxui' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  setRoute(category: string) {
    if (category == 'home') {
      this.router.navigate(['/blog/home']);
    } else {
      this.router.navigate(['/blog/category', category]);
    }
  }

  selectedCategory(category: string) {
    if (category == 'home') {
      return location.href.endsWith('/blog/home');
    }
    return location.href.endsWith('/blog/category/' + category);
  }
}
