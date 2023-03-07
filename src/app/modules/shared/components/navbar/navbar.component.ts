import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    this.onScrollDown();
  }

  onScrollDown() {
    let prevScrollpos = window.scrollY;
    const navbar = document.getElementById('navbar')!;
    console.log(navbar);

    window.onscroll = function () {
      let currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        navbar.style.top = '0';
      } else {
        navbar.style.top = '-92px';
      }
      prevScrollpos = currentScrollPos;
    };
  }
}
