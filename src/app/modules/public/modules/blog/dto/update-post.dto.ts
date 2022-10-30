import { FindDto } from '../../../../../core/dtos/find.dto';

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

export interface SelectPost extends FindDto, Post { }


export interface Post {
  id?: number;
  name?: string;
  description?: string;
  content?: string;
  image?: string;
  tags?: string;
  category?: string;
  created_date?: Date;
  modified_date?: Date;
}
