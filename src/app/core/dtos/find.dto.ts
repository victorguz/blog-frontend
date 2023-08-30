import { LOGICAL_STATUS } from '../constants.config';
import { QueryOrderByDto } from './query.dto';

export interface FindDto {
  limit?: number;
  offset?: number;
  status?: LOGICAL_STATUS;
  orderby?: QueryOrderByDto[];
}
