export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'react';
import 'react-dom/server';

const page = () => import('./pages/CardEventos_e9a221f1.mjs').then(n => n.C);

export { page };
