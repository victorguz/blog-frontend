import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss'],
})
export class BlogCategoriesComponent implements OnInit {
  public formControl = new FormControl('');

  public categories = [
    {
      id: 1,
      name: 'Home',
      category: 'home',
      route: '/public/blog',
    },
    {
      id: 2,
      name: 'Frontend',
      category: 'frontend',
      route: '/public/blog/category',
    },
    {
      id: 3,
      name: 'Backend',
      category: 'backend',
      route: '/public/blog/category',
    },
    {
      id: 4,
      name: 'UX/UI',
      category: 'uxui',
      route: '/public/blog/category',
    },
  ];
  public showSearch: boolean = true;
  public category: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['category']) {
        this.formControl.reset();
        this.category = params['category'];
      }
    });

    this.formControl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.router.navigate(['', this.category], {
          queryParams: {
            search: value,
          },
        });
      }
    });
  }

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
