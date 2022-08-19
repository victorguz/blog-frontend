// Use export const to declare global variables here
// try to don't use environment variables or secret keys here
export enum LOGICAL_STATUS {
  DISABLED = 'DIS',
  ENABLED = 'ENA',
  DELETED = 'DEL',
}
export enum ContentType {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
}
export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
export const LIMITE_CARGA = '4';

export const PostCategories = [
  { name: 'Frontend', value: 'frontend' },
  { name: 'Backend', value: 'backend' },
  { name: 'UX/UI', value: 'uxui' },
];
