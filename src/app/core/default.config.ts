/**
 * Global constant for default configurations
 */
export const config: any = {
  app: {
    name: 'Aurora',
    version: '0.0.1',
    developer: 'IVVI',
    developer_link: 'https://github.com/victorguz?tab=repositories',
    owner: 'Aurora',
    owner_link: 'https://www.google.com',
    wellcome: 'Bienvenido a Aurora,',
    description: `gestiona la información de tus clientes, membresías, inventarios e ingresos en un solo lugar.`,
    keywords: ['clientes', 'membresías', 'inventarios', 'ingresos', 'finanzas'],
    locale: 'es-CO',
  },
  routes: {
    route_on_login: '/admin/dashboard',
    route_on_cant_register: '/403',
    route_on_forbidden: '/403',
  },
};
