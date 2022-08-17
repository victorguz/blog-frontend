import { LOGICAL_STATUS } from '../core/constants.config';

export class PostInterface {
  public id?: number;
  public name?: string;
  public image?: string;
  public description?: string;
  public content?: string;
  public tags?: string;
  public created_date?: Date;
  public modified_date?: Date;
  public status?: LOGICAL_STATUS;
}
