import { OutputData } from '@editorjs/editorjs';
import edjsParser from 'editorjs-parser';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import { friendlyString } from './services/functions.service';
import { REGEX } from './constants.config';

export class EditorJsConfig {
  public static readonly CUSTOM_PARSERS = {
    header: (data: { text: string; level: number }, config) => {

      return `
      <h${data.level}
        class="post-content-header ${this.friendlyHeaderName(data.text)}">
        ${data.text}
      </h${data.level}>`;
    },
    image: (
      data: {
        url: string;
        caption: string;
        withBorder: boolean;
        withBackground: boolean;
        stretched: boolean;
      },
      config
    ) => {
      const imageClasses: string[] = [];
      if (data.withBorder) imageClasses.push('border');
      if (data.withBackground) imageClasses.push('bg-white');
      if (data.stretched) imageClasses.push('px-4 pe-4');
      return `
    <div class="post-content-image ${imageClasses.join(' ')} mt-3 mb-3">
      <img
        src="${data.url}"
        alt="${data.caption}"
        class="img-fluid">
      <span>${data.caption}</span>
    </div>`;
    },
  };

  public static readonly PARSER = new edjsParser(
    undefined,
    this.CUSTOM_PARSERS
  );

  public static readonly TOOLS = {
    header: {
      class: Header,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    image: SimpleImage,
    code: InlineCode,
    marker: Marker,
  };

  public static parseOutputToHtml(outputData: OutputData) {
    return this.PARSER.parse(outputData);
  }

  public static friendlyHeaderName(text: string) {
    return `header-${friendlyString(text)}`.toLowerCase();
  }
}
