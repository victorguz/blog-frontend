// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'Development',
  version: '2021.0', // "2021.0",//No cambiar a menos que se cree un nuevo proyecto
  api_key: 'asdsdadua7ds78daiidsai6',
  secret_key: 'asdsdadua7ds78daiidsai6',
  jwt_key: 'asdsdadua7ds78daiidsai6',
  app_key: 'asdsdadua7ds78daiidsai6',

  adminRoute: 'admin',
  authRoute: 'auth',
  domain: 'http://localhost:3000/',
  encryptLocalStorage: false,
  //urls basicas necesarias para el buen funcionamiento del framework
  apis: {
    pockets: {
      all: { value: 'pockets', method: 'GET', contentType: 'application/json' },
      id: {
        value: 'pockets/{{:id}}',
        method: 'GET',
        contentType: 'application/json',
      },
      create: {
        value: 'pockets',
        method: 'POST',
        contentType: 'application/json',
      },
      update: {
        value: 'pockets/{{:id}}',
        method: 'PATCH',
        contentType: 'application/json',
      },
      delete: {
        value: 'pockets/{{:id}}',
        method: 'DELETE',
        contentType: 'application/json',
      },
    },
    categories: {
      all: {
        value: 'categories',
        method: 'GET',
        contentType: 'application/json',
      },
      id: {
        value: 'categories/{{:id}}',
        method: 'GET',
        contentType: 'application/json',
      },
      create: {
        value: 'categories',
        method: 'POST',
        contentType: 'application/json',
      },
      update: {
        value: 'categories/{{:id}}',
        method: 'PATCH',
        contentType: 'application/json',
      },
      delete: {
        value: 'categories/{{:id}}',
        method: 'DELETE',
        contentType: 'application/json',
      },
    },
    movements: {
      all: {
        value: 'movements',
        method: 'GET',
        contentType: 'application/json',
      },
      id: {
        value: 'movements/{{:id}}',
        method: 'GET',
        contentType: 'application/json',
      },
      create: {
        value: 'movements',
        method: 'POST',
        contentType: 'application/json',
      },
      update: {
        value: 'movements/{{:id}}',
        method: 'PATCH',
        contentType: 'application/json',
      },
      delete: {
        value: 'movements/{{:id}}',
        method: 'DELETE',
        contentType: 'application/json',
      },
    },
  },
  /**
   * Dominios (dominio.com) a los que se enviará el token en el header de la petición.
   * Utilizar solo en caso que el dominio sea distinto del actual, ya que es allowed por defecto.
   */
  allowedDomains: ['http://localhost:3000/'],
  /**
   * Rutas en las que no se tendrá en cuenta el envío del token.
   * Pueden ser del mismo dominio.
   */
  disallowedRoutes: [],
  //Constants
  COOKIE_USER: 'user_info', //nombre de la cookie donde se almacena la informacion del usuario
  COOKIE_USERK: 'jsfb_assff', //nombre de la cookie donde se almacena la informacion del usuario
  COOKIE_USER_SESSIONS: 'jsfb_NMassff', //nombre de la cookie donde se almacena la informacion del usuario
  MAX_USER_SESSIONS: 'max_jsfb_NMassff', //nombre de la cookie donde se almacena la informacion del usuario
  COOKIE_TOKEN: 'token', //nombre de la cookie donde se almacena el token de la sesión
  LOCAL_DEFAULT_COMPANY: 'default_company', //empresa seleccionada por el usuario
  LOCAL_COMPANIES: 'user_companies', //empresas a las que tiene acceso el usuario
  LOCAL_ENDPOINTS: 'endpoints', //nombre de la cookie donde se almacenan los endpoints
  LOCAL_MODULES: 'modules',
  LOCAL_MODULE_OPTIONS: 'module_options',
  LOCAL_CURRENT_MODULE: 'current_module',
  LOCAL_ROLES: 'roles',
  LOCAL_RECENT_MODULES: 'recent_modules',
  LOCAL_LAST_URL: 'last_url',
  MESSAGES_DURATION: 5000, //Duracion de los mensajes de snackbar
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
