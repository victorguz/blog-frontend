export const environment = {
  production: false,
  API: 'https://app-back-co1061-dev.azurewebsites.net/api/bombapp/v1',
  API_DROPBOX:
    'https://app-back-co1061-dropbox-dev.azurewebsites.net/api/bombapp/dropbox/v1',
  LOGIN: 'acceso',
  REQUEST_TIMEOUT: 15000,
  MAX_UPLOAD_BYTES: 100000000,
  CONST: {
    USER_INFO: 'user_info',
    JWT_TOKEN: 'jwt_token',
    PERMISOS: 'permisos',
  },
  encryption: {
    secret_key: 'VG0ZdVQMJd3ooIzLqjVbfAn3Er0YHQ',
    encryptStorage: false,
  },
};
