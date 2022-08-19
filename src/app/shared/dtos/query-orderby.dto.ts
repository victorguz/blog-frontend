export abstract class QueryOrderByDto {
  column?: string;
  order?: 'desc' | 'asc' | 'DESC' | 'ASC';
}
