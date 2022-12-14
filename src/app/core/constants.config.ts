// Use export const to declare global variables here
// try to don't use environment variables or secret keys here
export const APP_TITLE = 'Bombapp';
export const MENSAJES = {
  USUARIO_INEXISTENTE:
    'No hay ninguna cuenta asociada a este correo electrónico.',
  EXITO_GENERAL: {
    message: 'Acción realizada exitosamente',
    title: 'Todo salió bien',
  },
  ERROR_GENERAL: {
    message:
      'Lo sentimos, algo salió mal con esta acción, vuelve a intentarlo mas tarde',
    title: 'Algo salió mal',
  },
  RESTAURAR_CONTRASENA: {
    title: '¡Enviamos un correo!',
    message: 'Enviamos las instrucciones al correo.',
  },
};

export enum LOGICAL_STATUS {
  DISABLED = 'D',
  ENABLED = 'E',
}

export const LOGICAL_STATUS_LIST = [
  LOGICAL_STATUS.DISABLED,
  LOGICAL_STATUS.ENABLED,
];
export enum ContentType {
  TEXT = 'text/plain',
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
  MULTIPART = 'multipart/form-data',
}
export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum CodigosRespuesa {
  Ok = 200,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500,
}

export const REGEX = {
  numeros: /\D/g,
  alfanumerico: /[a-zA-ZÀ-ÿ\u00f1\u00d10-9 \-\_]/g,
  letras: /[a-zA-ZÀ-ÿ\u00f1\u00d1 ]/g,
  nit: /[0-9\-]/g,
  tipo: /[a-zA-ZÀ-ÿ\u00f1\u00d10-9\-\_]/g,
  nombreParametro: /[a-zA-ZÀ-ÿ\u00f1\u00d10-9 ]/g,
  correo:
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  password:
    /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{6,}$/,
};

export const LOGIN_ROUTE = '/public/login';
export const FORBIDDEN_ROUTE = '/public/not-found';
export const ROUTE_ON_LOGIN = '/private/proyectos';
export const LOCAL_VISIBILIDAD_PROYECTO = 'LOCAL_VISIBILIDAD_PROYECTO';
export const LOCAL_VISIBILIDAD_SIDEBAR = 'LOCAL_VISIBILIDAD_SIDEBAR';
export const LOCAL_PARAMETROS = 'LOCAL_PARAMETROS';
export const FORMATO_FECHA_BACKEND = `yyyy-MM-dd`;
export const FORMATO_FECHA_FRONTEND = 'yyyy-MM-ddTHH:mm:ss.sssZ';

export enum ESTADOS_ASIGNACIONES {
  SIN_INICIAR = 'SIN INICIAR',
  EN_PROCESO = 'EN PROCESO',
  EN_REVISIÓN = 'EN REVISIÓN',
  CON_AJUSTES = 'CON AJUSTES',
  VENCIDO = 'VENCIDO',
  FINALIZADO = 'FINALIZADO',
}

export enum ESTADOS_PROYECTOS {
  VENCIDO = 'VENCIDO',
  EN_PROCESO = 'EN PROCESO',
  FINALIZADO = 'FINALIZADO',
  SIN_INICIAR = 'SIN INICIAR',
  SIN_ASIGNACIONES = 'SIN ASIGNACIONES',
}

export enum ESTADOS_ELEMENTOS {
  REVISADO = 'REVISADO',
  SIN_REVISIONES = 'SIN REVISIONES',
}

export enum ETAPA {
  PREPRODUCCION = 'PREPRODUCCIÓN',
  PRODUCCION = 'PRODUCCIÓN',
  POSTPRODUCCION = 'POSTPRODUCCIÓN',
}

export enum ASIGNACIONES_REPORTE {
  RESPONSABLE = 'RESPONSABLE',
  TAREA = 'TAREA',
  FECHA_INICIO = 'FECHA_INICIO',
  FECHA_FIN = 'FECHA_FIN',
  ESTADO = 'ESTADO',
}

export enum ASIGNACIONES_REPORTE_ORDEN {
  ASCENDENTE = 'ASC',
  DESCENDENTE = 'DESC',
}
export enum REPORTE_VENTANAS {
  DESEMPENO_GENERAL = 'DESEMPEÑO GENERAL',
  CARGA_DE_TRABAJO = 'CARGA DE TRABAJO',
}

export enum TIPOS_ELEMENTOS {
  IMAGEN = 'IMAGEN',
  VIDEO = 'VIDEO',
  OTRO = 'OTRO',
}
export const MAT_DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

export enum TYPE_OF_FILES {
  MEDIA = '.mp4, .mov, .jpg, .jpeg, .png',
  ALL = '.mp4, .mov, .jpg, .jpeg, .png, .docx, .xlsx, .pptx, .txt, .pdf, .csv',
}

export const CONSTANTS = {
  MAX_RECORDS_TO_TAKE: 10000,
};
