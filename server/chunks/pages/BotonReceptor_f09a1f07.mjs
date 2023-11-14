/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent } from '../astro_70332156.mjs';
import 'html-escaper';
import 'clsx';
import $$SelectorCamara from './SelectorCamara_22cdab7e.mjs';
/* empty css                                   */
const $$Astro = createAstro();
const $$BotonReceptor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BotonReceptor;
  return renderTemplate`${maybeRenderHead()}<div id="menuRecepcion" class="p-2 cursor-pointer duration-300 w-14 h-14 overflow-hidden flex items-center justify-normal rounded-full text-sm bg-white/50 border text-gray-700 font-medium absolute bottom-5 left-3 z-20 shadow-lg" data-astro-cid-2oominy3><div id="botonX" class="flex items-center justify-center hover:bg-gray-300/80 duration-150 rounded-full text-center" data-astro-cid-2oominy3><p class="font-bold rotate-45 text-3xl text-gray-700 h-10 text-center w-10" data-astro-cid-2oominy3>
+
</p></div><div id="menuOculto" class="flex-col items-center justify-center text-center font-thin text-sm w-40 duration-700 gap-2 opacity-0" data-astro-cid-2oominy3><a href="/" class="hover:bg-gray-300/80 duration-150 px-2 py-0.5 w-full text-xs" data-astro-cid-2oominy3> 🔙 volver</a>${renderComponent($$result, "SelectorCamara", $$SelectorCamara, { "name": "camara", "id": "selectorCamara", "data-astro-cid-2oominy3": true })}</div></div>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/components/BotonReceptor.astro", void 0);

const $$file = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/components/BotonReceptor.astro";
const $$url = "/recepcion/components/BotonReceptor";

export { $$BotonReceptor as default, $$file as file, $$url as url };
