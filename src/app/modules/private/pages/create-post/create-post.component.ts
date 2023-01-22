import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '../../../../core/services/helpers.service';
import { CreatePostForm } from '../../../../interfaces/post.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  public form: FormGroup<CreatePostForm> =
    this.helpers.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });

  constructor(private helpers: HelpersService) {}

  ngOnInit(): void {}
}
