/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderHead, g as renderComponent, j as renderSlot } from '../astro_70332156.mjs';
import 'html-escaper';
import 'clsx';
/* empty css                           */import $$CardVideos from './CardVideos_0b9cba26.mjs';

const $$Astro$2 = createAstro();
const $$NavBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NavBar;
  return renderTemplate`${maybeRenderHead()}<header class="w-11/12 rounded h-12 flex items-center justify-between min-h-20 text-neutral-500 bg-white/50 mt-5"><div class="w-1/4 h-16 items-center flex justify-center"><img src="/recepcionQR.png" alt="logo" width="75" class="bg-paleta1-gray object-fill rounded-full"></div><ul class="w-3/4 flex items-center justify-between gap-5 overflow-hidden font-medium text-sm h-full"><li class="hover:bg-paleta1-primary h-full w-full text-center font-bold flex duration-300 m-auto"><a href="/" class="text-center w-full m-auto">Inicio</a></li><li class="hover:bg-paleta1-primary h-full w-full text-center font-bold flex duration-300 m-auto "><a href="/cargaeventos" class="text-center w-full m-auto">Eventos</a></li><li class="hover:bg-paleta1-primary h-full w-full text-center font-bold flex duration-300 m-auto "><a href="/cargaformulario" class="text-center w-full m-auto">Videos</a></li><li class="hover:bg-paleta1-primary h-full w-full text-center  font-bold flex duration-300 m-auto rounded-r"><a href="/recepcion" class="text-center w-full m-auto">Lector</a></li></ul></header>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/components/NavBar.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head><body class="w-full flex flex-col items-center justify-center bg-gradient-to-tr text-white from-paleta1-primary backdrop-blur-sm to-paleta1-secondary min-h-screen">${renderComponent($$result, "NavBar", $$NavBar, {})}${renderSlot($$result, $$slots["default"])}<div id="toast-container"></div></body></html>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$uid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$uid;
  const { uid } = Astro2.params;
  const objectEvento = await fetch(`http://localhost:4321/api/${uid}`);
  const data = await objectEvento.json();
  const evento = data.files;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "eventos" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class="min-h-screen w-10/12 container flex flex-col pt-10 items-start justify-normal"><div class="flex items-center justify-around w-1/4"><a href="/" class="text-2xl rounded-full bg-paleta1-primary/80  w-10 h-10 flex items-center justify-center border border-gray-700/50 hover:-translate-x-1 duration-300 hover:scale-105 active:scale-90 shadow-lg text-gray-700">←</a><h1 class="text-3xl font-bold capitalize text-gray-700 my-10">${evento?.nombre}</h1></div>${evento?.videos?.length > 0 ? renderTemplate`<div class="flex items-center flex-wrap justify-evenly w-full gap-5 "><div class="w-72 h-72 bg-white p-2 rounded-lg overflow-hidden flex items-center flex-col"><img${addAttribute(evento.path, "src")} alt="portada" class="object-cover "><p class="text-sm px-2 capitalize text-gray-700 -translate-y-8 bg-white rounded ">
portada
</p></div>${evento.videos?.map((video) => renderTemplate`${renderComponent($$result2, "CardVideos", $$CardVideos, { "video": video, "uidEvento": evento?.uid })}`)}</div>` : renderTemplate`<div class="text-left"><div class="w-72 h-72 bg-white p-2 rounded-lg overflow-hidden flex items-center flex-col"><img${addAttribute(evento.path, "src")} alt="portada" class="object-cover w-full h-full"><p class="text-sm px-2 capitalize text-gray-700 -translate-y-8 bg-white rounded ">
portada
</p></div><h2 class="mt-5 text-3xl font-bold text-gray-700">Sube un Video!</h2><p class="mt-2 text-sm text-gray-900 font-medium">
No hay videos que mostrar, para realizar una carga, dirigete a
            cargar Videos
</p></div>`}</main>` })}`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/eventos/[uid].astro", void 0);

const $$file = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/eventos/[uid].astro";
const $$url = "/eventos/[uid]";

const _uid_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$uid,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _uid_ as _ };
