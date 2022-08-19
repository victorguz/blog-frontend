import { LOGICAL_STATUS } from '../../core/constants.config';
import { QueryOrderByDto } from './query-orderby.dto';

export abstract class FindDto {
  public status?: LOGICAL_STATUS;
  public created_date?: Date;
  public modified_date?: Date;
  public limit?: number;
  public offset?: number = 0;
  public orderby?: QueryOrderByDto[];
}
