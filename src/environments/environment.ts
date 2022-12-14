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
  wompy: {
    session_id_local: 'wompi_session_id',
    public_key: 'pub_test_Tw5G1yMq0kA70eJoOU77Am5x0EURHiOV',
    link_sandbox: 'https://sandbox.wompi.co/v1',
    link_production: 'https://production.wompi.co/v1',
  },
  mercadopago: {
    access_token:
      'TEST-8400742747038301-110923-daf56e32dd66420181a58899f6b248f5-1119768582',
    public_key: 'TEST-2d55c3a2-62b2-487f-9c78-c683dc5e7371',
    link_sandbox: 'https://sandbox.wompi.co/v1',
    link_production: 'https://production.wompi.co/v1',
  },
};
