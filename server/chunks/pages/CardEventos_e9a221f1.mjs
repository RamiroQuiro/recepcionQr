/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent, h as addAttribute } from '../astro_70332156.mjs';
import 'html-escaper';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { showToast } from './toast_8445a929.mjs';

function BotonEliminar({ idVideo, uidEvento }) {
  const handleClick = async () => {
    await fetch("/api/eliminarvideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: !idVideo ? JSON.stringify({ uidEvento }) : JSON.stringify({
        uidEvento,
        idVideo
      })
    });
    showToast("Elemento Eliminado", 25e3);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleClick,
      className: "font-black text-xl hover:scale-125 duration-150 z-30 rotate-45   bg-white rounded-full w-8 h-8 ",
      children: "+"
    }
  );
}

function BotonEntrar({ uid }) {
  return /* @__PURE__ */ jsx("a", { href: `/eventos/${uid}`, className: "font-black text-xl  hover:scale-125 duration-150 z-30  flex items-center text-center pl-1   bg-white rounded-full w-8 h-8  before:", children: "→" });
}

const $$Astro = createAstro();
const $$CardEventos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardEventos;
  const { evento, videos } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="w-1/3 flex-shrink h-[175px] cursor-pointer border-2 border-transparent bg-paleta1-white/80 backdrop-blur-sm hover:border-paleta1-primary hover:shadow-lg hover:-translate-y-0.5 hover:skew-x-1 duration-700 rounded text-gray-700 overflow-hidden p-2 flex flex-col items-start justify-center relative"><div class=" flex items-start justify-  gap-0 hover:gap-10 bg-paleta1-primary py-3 px-4 group  hover:justify-evenly hover:bg-paleta1-primary/80 backdrop-blur-sm duration-500  rounded-bl-full absolute right-0 top-0 before:content-[' '] before:absolute before:right-0 before:top-0 before:w-5 before:h-5 before:bg-paleta1-primary/80 before:backdrop-blur-sm before:rounded-full before:scale-0 before:hover:scale-[15] before:duration-500 ">${renderComponent($$result, "BotonEliminar", BotonEliminar, { "uidEvento": evento.uid, "idVideo": null, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/videosCargados/components/BotonEliminar.jsx", "client:component-export": "default" })}${renderComponent($$result, "BotonEntrar", BotonEntrar, { "uid": evento.uid, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/videosCargados/components/BotonEntrar.jsx", "client:component-export": "default" })}</div><h2 class="text-lg font-semibold capitalize rounded-lg z-">${evento.name}</h2><div class="flex items-start text-left justify-around gap-5">${evento.nVideos == 0 ? renderTemplate`<p class="text-xs capitalize my-5 drop-shadow-[1px_1px_0px_#dd000050] bg-white/80 rounded px-1 py-0.5">no tienes videos en este evento</p>` : renderTemplate`<p class="text-xs capitalize my-5  drop-shadow-[1px_1px_0px_#dd000050] bg-white/80 rounded px-1 py-0.5">
Tienes ${evento.nVideos} video 🎞️ en este evento
</p>`}<img${addAttribute(evento.portada, "src")} alt="portada" height="50"${addAttribute("50", "width")} class="absolute right-0 top-0 -z-10 w-1/2 h-full backdrop-saturate-0  rounded-bl-full opacity-30 backdrop-blur-sm"></div></div>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/videosCargados/components/CardEventos.astro", void 0);

const $$file = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/videosCargados/components/CardEventos.astro";
const $$url = "/videosCargados/components/CardEventos";

const CardEventos = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CardEventos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$CardEventos as $, BotonEliminar as B, CardEventos as C };
