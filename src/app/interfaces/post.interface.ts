import { FormControl } from '@angular/forms';
import { LOGICAL_STATUS } from '../core/constants.config';
import { FindDto } from '../core/dtos/find.dto';
import { ArchivosInterface } from '../core/interfaces/shared.interfaces';

export interface UpdatePost {
  id?: number;
  name: string;
  description: string;
  content: string;
  image: string;
  tags: string;
  category: string;
}
export interface CreatePost {
  name: string;
  description: string;
  content: string;
  tags: string;
  status: string;
  image: string;
  category: string;
  publication_date: Date;
}

export interface CreatePostForm {
  name: FormControl<string>;
  description: FormControl<string>;
  content: FormControl<string>;
  tags: FormControl<string>;
  status: FormControl<LOGICAL_STATUS>;
  image: FormControl<string>;
  category: FormControl<string>;
  publication_date: FormControl<Date>;
}

export interface SelectPost extends Partial<FindDto>, Partial<Post> {}

export interface Post {
  id: number;
  name: string;
  description: string;
  content: string;
  image: ArchivosInterface;
  tags: string;
  category: string;
  created_date: Date;
  modified_date: Date;
}
