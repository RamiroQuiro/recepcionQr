/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../astro_70332156.mjs';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$SelectorCamara = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SelectorCamara;
  const { name, id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<select${addAttribute(name, "name")}${addAttribute(id, "id")} class="text-xs text-gray-700 rounded px-2 border-transparent focus:ring-o bg-gray-200 w-40"><option value="selectCamara" selected disabled class="text-xs text-gray-700">Selecciona una opcion</option></select>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/components/SelectorCamara.astro", void 0);

const $$file = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/components/SelectorCamara.astro";
const $$url = "/recepcion/components/SelectorCamara";

export { $$SelectorCamara as default, $$file as file, $$url as url };
