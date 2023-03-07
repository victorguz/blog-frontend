import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    this.onScrollDown();
  }

  onScrollDown() {
    let prevScrollpos = window.scrollY;
    const navbar = document.getElementById('public-content')!;
    window.onscroll = function () {
      let currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        navbar.style.marginTop = '92px';
      } else {
        navbar.style.marginTop = '1rem';
      }
      prevScrollpos = currentScrollPos;
    };
  }
}
