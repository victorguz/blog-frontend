import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
  editor = new EditorJS({
    holder: 'editor-js',
  });

  constructor() {}

  ngOnInit(): void {}
}
