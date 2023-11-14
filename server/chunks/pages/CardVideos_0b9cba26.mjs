/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent, h as addAttribute } from '../astro_70332156.mjs';
import 'html-escaper';
import { B as BotonEliminar } from './CardEventos_e9a221f1.mjs';
import 'clsx';
import 'react/jsx-runtime';
import 'react';
import './toast_8445a929.mjs';

const $$Astro = createAstro();
const $$CardVideos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardVideos;
  const { video, uidEvento } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="w-[300px] flex-shrink h-[300px] duration-300 rounded-lg text-gray-700 group overflow-hidden hover:p-2 bg-white backdrop-blur-sm flex flex-col items-center justify-normal relative"><div class="flex items-center opacity-0 group-hover:opacity-100 duration-300 absolute top-0 left-0 z-20 justify-between w-full px-5 bg-paleta1-primary/80 backdrop-blur"><h2 class="top-5 text-sm  py-2 px-3 rounded-lg z-20 ">${video.name}</h2>${renderComponent($$result, "BotonEliminar", BotonEliminar, { "idVideo": video.id, "uidEvento": uidEvento, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/videosCargados/components/BotonEliminar.jsx", "client:component-export": "default" })}</div><a target="_blank" class="w-full h-full "${addAttribute(video.path, "href")}><video${addAttribute(video.name, "data-videoname")}${addAttribute(video.name, "id")}${addAttribute(video.path, "src")} class="w-full h-full duration-500 object-cover rounded-lg"></video></a><div class="flex group items-center duration-300 justify-around h-1/3 flex-col my-5 absolute bottom-2 left-1/5"><a${addAttribute(video.name, "download")}${addAttribute(video.code, "href")} class="z-20"><img${addAttribute(video.code, "src")} width="100" height="100" alt="#" class="rounded-lg z-20"></a></div><span class="text-xs w-full absolute bottom-0 text-center font-medium bg-paleta1-primary px-3 py-1 rounded opacity-0 group-hover:opacity-100 z-0  duration-300 group-hover:translate-y-0 translate-y-20">Click en la imagen para el codigo</span></div>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/eventos/components/CardVideos.astro", void 0);

const $$file = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/eventos/components/CardVideos.astro";
const $$url = "/eventos/components/CardVideos";

export { $$CardVideos as default, $$file as file, $$url as url };
