import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { OutputData } from '@editorjs/editorjs';
import { isJSON } from 'class-validator';
import { EditorJsConfig } from '../../../../../../core/editorjs.config';
import { scrollToElement } from '../../../../../../core/services/functions.service';

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.scss'],
})
export class PostIndexComponent implements OnInit, OnChanges {
  @Input() public content!: string;
  public filteredHeaders: any[] = [];

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getFilteredHeaders();
  }

  getFilteredHeaders() {
    if (this.content && isJSON(this.content)) {
      const parsedContent: OutputData = JSON.parse(this.content);
      this.filteredHeaders = parsedContent.blocks
        .filter((val) => val.type == 'header')
        .map((val) => {
          const data: {
            text: string;
            level: number;
          } = val.data;
          return {
            class: EditorJsConfig.friendlyHeaderName(data.text),
            text: data.text,
          };
        });
    }
  }

  scrollToElementVoid(element: string) {
    scrollToElement('.' + element);
  }
}
