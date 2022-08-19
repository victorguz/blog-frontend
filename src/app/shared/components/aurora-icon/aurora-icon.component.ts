import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'aurora-icon',
  templateUrl: './aurora-icon.component.html',
  styleUrls: ['./aurora-icon.component.scss'],
})
export class AuroraIconComponent implements OnChanges {
  @Input() public name?: string;
  @Input() public color?: string = 'black';
  @Input() public size: number | string = 30;
  @Input() public src?: string;

  ngOnChanges(): void {
    this.src = this.src ? this.src : `assets/images/svg/${this.name}.svg`;
  }
}
