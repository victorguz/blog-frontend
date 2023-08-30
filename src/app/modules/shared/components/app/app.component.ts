import { AfterContentInit, AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    // this.onScrollDown();
  }
  onScrollDown() {
    let prevScrollpos = window.scrollY;
    console.log(prevScrollpos);

    if (window.innerWidth > 992) {
      const interval = setInterval(() => {
        let navbar = document.getElementById('public-navbar')!;
        let publicContent = document.getElementById('public-content')!;
        if (navbar && publicContent) {
          console.log('si existen');

          window.onscroll = function () {
            let currentScrollPos = window.scrollY;
            if (prevScrollpos > currentScrollPos) {
              navbar.style.top = '0';
              publicContent.style.paddingTop = '92px';
            } else {
              navbar.style.top = '-92px';
              publicContent.style.paddingTop = '1rem';
            }
            prevScrollpos = currentScrollPos;
          };
          clearInterval(interval);
        } else {
          console.log('no existen', navbar, publicContent);
        }
      }, 100);
    }
  }
}
