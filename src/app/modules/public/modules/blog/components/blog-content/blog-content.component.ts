import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss'],
})
export class BlogContentComponent implements OnInit {
  @Input() content!: string;
  
  constructor() {}

  ngOnInit(): void {}
}
