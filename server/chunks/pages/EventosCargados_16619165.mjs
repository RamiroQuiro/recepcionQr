/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent } from '../astro_70332156.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$CardEventos } from './CardEventos_e9a221f1.mjs';
import 'react/jsx-runtime';
import 'react';
import './toast_8445a929.mjs';

const $$Astro = createAstro();
const $$EventosCargados = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$EventosCargados;
  const arrayEventos = await fetch("http://localhost:4321/api/eventos");
  const dataEventos = await arrayEventos.json();
  return renderTemplate`${maybeRenderHead()}<div class="  backdrop-blur-sm flex flex-col p-5 rounded-lg items-left justify-normal  w-10/12 mx-auto py-10 min-h-screen ">${dataEventos?.eventos?.length > 0 ? renderTemplate`<div class="flex items-center flex-wrap justify-evenly w-full gap-2 ">${dataEventos.eventos?.map((evento) => renderTemplate`${renderComponent($$result, "CardEventos", $$CardEventos, { "evento": evento })}`)}</div>` : renderTemplate`<div class="text-left"><h2 class="mt-5 text-3xl font-bold text-gray-700 capitalize">crea un evento!</h2><p class="mt-2 text-sm text-gray-900 font-medium">
No hay eventos que mostrar, carga tu evento!
</p></div>`}<!-- <ListadoVideos client:load/> --></div>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/videosCargados/EventosCargados.astro", void 0);

const $$file = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/videosCargados/EventosCargados.astro";
const $$url = "/videosCargados/EventosCargados";

export { $$EventosCargados as default, $$file as file, $$url as url };
