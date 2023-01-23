import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import EditorJS, { API } from '@editorjs/editorjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorJsConfig } from '../../../../core/editorjs.config';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit, OnChanges {
  @Input() public class = '';
  @Input() public form!: FormGroup;
  @Input() public name!: string;
  @Input() public label!: string;

  editor!: EditorJS;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.editor ==
      new EditorJS({
        holder: 'editor-js',
        inlineToolbar: true,
        tools: EditorJsConfig.TOOLS,
        onChange: async (api, event) => {
          await this.onWrite(api, event);
        },
        placeholder: this.label,
        data: this.value,
        readOnly: this.isDisabled,
      });
  }
  ngOnInit(): void {}

  /**
   * Captura cuando el mouse se mueve en el elemento canvas
   * @param evt
   */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove = (evt: any) => {};

  get isRequired() {
    return this.control.hasValidator(Validators.required);
  }

  get isDisabled() {
    return this.control.disabled;
  }

  get control() {
    return this.form && this.name && this.form.controls[this.name]
      ? this.form.controls[this.name]
      : new FormControl('');
  }

  get value() {
    return this.control ? this.control.value : undefined;
  }

  async onWrite(api: API, event: CustomEvent<any>) {
    try {
      const outputData = await api.saver.save();
      if (outputData.blocks) {
        this.form.get(this.name)?.setValue(outputData);
      } else {
        this.form.get(this.name)?.setValue(undefined);
      }
      console.log(outputData);
    } catch (error) {
      console.log('Saving failed: ', error);
    }
  }
}
