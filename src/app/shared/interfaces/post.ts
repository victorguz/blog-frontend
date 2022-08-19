import { LOGICAL_STATUS } from '../../core/constants.config';
import { FindDto } from '../dtos/find.dto';

export interface PostInterface extends FindDto {
  id?: number;
  name?: string;
  description?: string;
  content?: string;
  tags?: string;
  image?: number | string;
  category?: string;
}
