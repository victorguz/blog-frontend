import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aurora-social-media',
  templateUrl: './aurora-social-media.component.html',
  styleUrls: ['./aurora-social-media.component.scss'],
})
export class AuroraSocialMediaComponent implements OnInit {
  @Input() size: string | number = 30;
  @Input() orientation: 'center' | 'end' | 'start' = 'start';

  constructor() {}

  ngOnInit(): void {}
}
