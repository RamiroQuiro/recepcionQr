/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_70332156.mjs';
import 'html-escaper';
import 'clsx';
/* empty css                             */
const $$Astro = createAstro();
const $$Portada = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Portada;
  return renderTemplate`${maybeRenderHead()}<div id="contenedorVideo" class="w-[550px] relative h-[60vh] duration-700 rounded-3xl bg-transparent flex flex-col items-center justify-normal p-2" data-astro-cid-lncvygkg><h1 class="text-4xl absolute top-5 italic font-bold text-gray-100 drop-shadow-[1px_1px_3px_#555]" data-astro-cid-lncvygkg>
Rayuela 360
</h1><video src="#" class="object-contain opacity-0 z-20 rounded-3xl absolute top-0 left-0 w-full h-full" id="videoRecepcion" autoplay data-astro-cid-lncvygkg></video><img id="portadaRecepcion" src="/recepcionQR.png" alt="Receptor" width="540" height="540" class="object-cover object-center w-full rounded-3xl h-full" data-astro-cid-lncvygkg></div>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/components/Portada.astro", void 0);

const $$file = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/components/Portada.astro";
const $$url = "/recepcion/components/Portada";

export { $$Portada as default, $$file as file, $$url as url };
