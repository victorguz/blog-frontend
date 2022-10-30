export interface SelectQueryDto {
  table: string;
  select: string[];
  where: object;
  limit: number;
  offset: number;
  orderby: QueryOrderByDto[];
}
export class QueryOrderByDto {
  column!: string;
  order!: string | 'desc' | 'asc' | 'DESC' | 'ASC';

  public static asString(body: QueryOrderByDto) {
    return `${body.column} ${body.order}`;
  }
}
export interface DeleteQueryDto {
  table: string;
  where: object;
  limit: number;
}
export interface CreateQueryDto {
  table: string;
  values: any;
}
export interface UpdateQueryDto extends CreateQueryDto {
  where: object;
  limit: number;
}
