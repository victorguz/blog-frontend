import { CONSTANTS, LOGICAL_STATUS } from '../constants.config';
import { QueryOrderByDto } from './query.dto';

export class FindDto {
  limit?: number = CONSTANTS.MAX_RECORDS_TO_TAKE;
  offset?: number = 0;
  status?: LOGICAL_STATUS = LOGICAL_STATUS.ENABLED;
  orderby?: QueryOrderByDto[];
}
