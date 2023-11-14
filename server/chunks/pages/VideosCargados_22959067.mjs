/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent } from '../astro_70332156.mjs';
import 'html-escaper';
import 'clsx';
import $$CardVideos from './CardVideos_0b9cba26.mjs';
import './CardEventos_e9a221f1.mjs';
import 'react/jsx-runtime';
import 'react';
import './toast_8445a929.mjs';

const $$Astro = createAstro();
const $$VideosCargados = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VideosCargados;
  const respuesta = await fetch("http://localhost:4321/api/listarvideos");
  const data = await respuesta.json();
  return renderTemplate`${maybeRenderHead()}<div class="  backdrop-blur-sm flex flex-col p-5 rounded-lg items-left justify-normal  w-10/12 mx-auto py-10 min-h-screen ">${data?.files?.length > 0 ? renderTemplate`<div class="flex items-center flex-wrap justify-evenly w-full gap-5 ">${data.files?.map((evento) => renderTemplate`${renderComponent($$result, "CardVideos", $$CardVideos, { "video": evento })}`)}</div>` : renderTemplate`<div class="text-left"><h2 class="mt-5 text-3xl font-bold text-gray-700">Sube un Video!</h2><p class="mt-2 text-sm text-gray-900 font-medium">
No hay videos que mostrar, para realizar una carga, dirigete a cargar Videos
</p></div>`}</div>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/eventos/components/VideosCargados.astro", void 0);

const $$file = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/eventos/components/VideosCargados.astro";
const $$url = "/eventos/components/VideosCargados";

export { $$VideosCargados as default, $$file as file, $$url as url };
