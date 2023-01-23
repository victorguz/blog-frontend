import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { isJSON } from 'class-validator';
import { HelpersService } from '../../../../../../core/services/helpers.service';
import {
  CreatePostForm,
  Post,
} from '../../../../../../interfaces/post.interface';
import edjsParser from 'editorjs-parser';
import { EditorJsConfig } from '../../../../../../core/editorjs.config';
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class BlogPostViewComponent implements OnInit {
  public post: Post = {
    name: 'Web site design: landing page home page ui',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel porta arcu ac lorem tellus netus. Eget ridiculus diam nunc facilisi egestas aliquet magnis urna. Elit turpis scelerisque mattis turpis aliquam ultricies nunc',
    content: JSON.stringify({
      time: 1674444029446,
      blocks: [
        {
          id: 'D57pZUKhRM',
          type: 'header',
          data: {
            text: 'Editor.js',
            level: 2,
          },
        },
        {
          id: 'FHHJtgjq6W',
          type: 'paragraph',
          data: {
            text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.',
          },
        },
        {
          id: 'ZmhYPLPM7o',
          type: 'header',
          data: {
            text: 'Key features',
            level: 3,
          },
        },
        {
          id: 'K1mchWabw3',
          type: 'list',
          data: {
            style: 'unordered',
            items: [
              'It is a block-styled editor',
              'It returns clean data output in JSON',
              'Designed to be extendable and pluggable with a simple API',
            ],
          },
        },
        {
          id: 'GeVwLgaCFq',
          type: 'header',
          data: {
            text: 'What does it mean «block-styled editor»',
            level: 3,
          },
        },
        {
          id: 'LEvfbR-oOC',
          type: 'paragraph',
          data: {
            text: "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.",
          },
        },
        {
          id: '2jHI31SJVc',
          type: 'paragraph',
          data: {
            text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
          },
        },
        {
          id: 'lvCpXrnBb6',
          type: 'header',
          data: {
            text: 'What does it mean clean data output',
            level: 3,
          },
        },
        {
          id: 'UCJ2uJ1vC2',
          type: 'paragraph',
          data: {
            text: 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below',
          },
        },
        {
          id: '9_2593TJnR',
          type: 'paragraph',
          data: {
            text: 'Given data can be used as you want: render with HTML for Web clients, render natively for mobile apps, create markup for Facebook Instant Articles or Google AMP, generate an audio version and so on.',
          },
        },
        {
          id: 'j0FOFIIgUS',
          type: 'paragraph',
          data: {
            text: 'Clean data is useful to sanitize, validate and process on the backend.',
          },
        },
        {
          id: 'AqKWZfjPNZ',
          type: 'paragraph',
          data: {
            text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
          },
        },
        {
          id: 'ZEG756R7wx',
          type: 'image',
          data: {
            url: 'https://codex.so/public/app/img/external/codex2x.png',
            caption: '',
            withBorder: false,
            withBackground: false,
            stretched: true,
          },
        },
      ],
      version: '2.26.4',
    }),
    id: 1,
    tags: '["development","hola","chao","etiqueta","de","ejemplo"]',
    category: '',
    image: 'assets/images/png/post-example.png',
    created_date: new Date(),
    modified_date: new Date(),
  };

  constructor(private helpers: HelpersService) {}

  ngOnInit(): void {}

  get tags() {
    return this.post.tags && isJSON(this.post.tags)
      ? JSON.parse(this.post.tags)
      : [];
  }

  get content() {
    return EditorJsConfig.parseOutputToHtml(JSON.parse(this.post.content));
  }
}
