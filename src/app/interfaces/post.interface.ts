import { FormControl } from "@angular/forms";
import { FindDto } from "../core/dtos/find.dto";

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
}

export interface CreatePostForm  {
  name: FormControl<string>;
  description: FormControl<string>;
  content: FormControl<string>;
  tags: FormControl<string>;
  status: FormControl<string>;
  image: FormControl<string>;
  category: FormControl<string>;
}

export interface SelectPost extends Partial<FindDto>,Partial<Post> {}

export interface Post {
  id: number;
  name: string;
  description: string;
  content: string;
  image: string;
  tags: string;
  category: string;
  created_date: Date;
  modified_date: Date;
}
