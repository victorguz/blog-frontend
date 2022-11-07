import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss'],
})
export class BlogCategoriesComponent implements OnInit {
  public categories = [
    { id: 1, name: 'Home', category: 'home' },
    { id: 2, name: 'Frontend', category: 'frontend' },
    { id: 3, name: 'Backend', category: 'backend' },
    { id: 4, name: 'UX/UI', category: 'uxui' },
  ];
  public showSearch: boolean = false;
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {}

  setRoute(category: string) {
    if (category == 'home') {
      this.router.navigate(['/blog/home']);
    } else {
      this.router.navigate(['/blog/category', category]);
    }
  }

  selectedCategory(category: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (category == 'home') {
        return document.location.href.endsWith('/blog/home');
      }
      return document.location.href.endsWith('/blog/category/' + category);
    }
    return false;
  }
}
