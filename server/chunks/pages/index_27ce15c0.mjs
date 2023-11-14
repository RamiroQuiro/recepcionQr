/* empty css                           */import { e as createAstro, f as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, h as addAttribute, i as renderHead, j as renderSlot } from '../astro_70332156.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$Layout } from './_uid__8f2e2f74.mjs';
import $$EventosCargados from './EventosCargados_16619165.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { showToast } from './toast_8445a929.mjs';
/* empty css                           *//* empty css                           */import $$BotonReceptor from './BotonReceptor_f09a1f07.mjs';

const $$Astro$4 = createAstro();
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$3;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Recepcion QR" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class=" min-h-screen w-10/12  container flex flex-col  pt-10 items-start justify-normal"><h1 class="text-3xl font-bold text-gray-700">Estos son tus eventos</h1>${renderComponent($$result2, "EventosCargados", $$EventosCargados, {})}</main>` })}`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/index.astro", void 0);

const $$file$3 = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/index.astro";
const $$url$3 = "";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$3,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [videook, setVideook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [eventos, setEventos] = useState([]);
  async function submit(e) {
    e.preventDefault();
    const formData2 = new FormData(e.target);
    const eventoUID = formData2.get("eventoUID");
    const videoName = formData2.get("name");
    if (!eventoUID || !videoName) {
      setResponseMessage("completa todos los campos");
      return;
    } else {
      formData2.append("video", videook);
      try {
        setIsLoading(true);
        const response = await fetch("/api/feedback", {
          method: "POST",
          body: formData2
        });
        const data2 = await response.json();
        setData(data2);
        if (data2.message && data2.name) {
          setIsLoading(false);
          setQrImage(data2.qr);
          showToast(`🎞️ Video Cargado`, 3e3);
          setResponseMessage(false);
          setVideook(false);
          e.target.reset();
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setResponseMessage(error);
      }
    }
  }
  const handleVideo = (e) => {
    setVideook(e.target.files[0]);
  };
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("api/eventos");
        const data2 = await response.json();
        setEventos(data2.eventos);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchEventos();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isLoading && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-white/60 backdrop-blur-sm flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { class: "lds-ellipsis", children: [
        /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx("div", {})
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto animate-pulse text-xs font-medium text-green-500", children: "espera, estamos cargando tu video ⌛" })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: submit,
        className: "flex flex-col items-center text-gray-700",
        children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              name: "eventoUID",
              id: "eventos",
              required: true,
              className: "p-2 text-xs rounded-lg my-3 ring-0 border-none",
              onChange: (e) => {
                const selectedEvent = e.target.value;
                formData.append("evento", selectedEvent);
              },
              children: [
                /* @__PURE__ */ jsx(
                  "option",
                  {
                    value: "noSelect",
                    disabled: true,
                    selected: true,
                    className: "text-sx p-2 rounded-lg font-medium text-gray-400",
                    children: "Selecciona un Evento"
                  }
                ),
                eventos?.map((event) => /* @__PURE__ */ jsx("option", { value: event.uid, children: event.name }))
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: "name",
              className: "my-5 border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm",
              children: [
                /* @__PURE__ */ jsx("p", { children: "Mesa N°" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "name",
                    name: "name",
                    required: true,
                    className: "rounded-lg ring-0 border p-2"
                  }
                )
              ]
            }
          ),
          !videook ? /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: "video",
              className: "my-5 cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm",
              children: [
                /* @__PURE__ */ jsx("p", { className: "mx-auto animate-pulse text-xs font-medium", children: "Click aqui para cargar tu video 📂" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    id: "video",
                    name: "video",
                    required: true,
                    accept: ".mp4",
                    className: "hidden",
                    onChange: handleVideo
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsx("div", { className: "my-5 cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm", children: /* @__PURE__ */ jsxs("p", { className: "mx-auto text-green-400 font-medium", children: [
            "Video Cargado 👌🏼",
            " "
          ] }) }),
          isLoading && /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-orange-500 animate-pulse", children: "cargando video..." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              disabled: isLoading,
              className: "disabled:bg-gray-200 cursor-pointer  border flex items-center justify-center hover:bg-blue-400 duration-200 hover:ring-2 bg-blue-500 text-white font-medium rounded-lg p-2 text-center w-2/3 gap-2 text-sm",
              children: "Cargar"
            }
          ),
          qrImage && /* @__PURE__ */ jsxs("div", { className: "p-2 my-5 space-y-4 flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium", children: "Toca la imagen para descargar y usarla como quieras" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: " mx-auto cursor-pointer",
                href: qrImage,
                download: data.name,
                children: [
                  " ",
                  /* @__PURE__ */ jsx("img", { alt: "qrCode", src: qrImage, width: 100, height: 100 })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-thin text-red-500", children: responseMessage })
        ]
      }
    )
  ] });
}

const $$Astro$3 = createAstro();
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Carga de Videos", "data-astro-cid-aa6yq6bl": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class="relative min-h-screen w-full flex flex-col gap-10 items-center justify-start mt-20" data-astro-cid-aa6yq6bl><div class="md:w-1/2 md:h-1/2  bg-white/80  backdrop-blur-sm flex flex-col p-5 rounded-lg items-center justify-normal" data-astro-cid-aa6yq6bl><div class="text-center" data-astro-cid-aa6yq6bl><h2 class="mt-5 text-lg font-bold text-gray-700" data-astro-cid-aa6yq6bl>
Sube un video
</h2><p class="mt-2 text-sm text-gray-400" data-astro-cid-aa6yq6bl>Sube el video e indica el la mesa a relacionar</p></div>${renderComponent($$result2, "Formulario", Form, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaformulario/components/Formulario", "client:component-export": "default", "data-astro-cid-aa6yq6bl": true })}</div></main>` })}`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaformulario/index.astro", void 0);

const $$file$2 = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaformulario/index.astro";
const $$url$2 = "/cargaformulario";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$2,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

function FormularioEventos() {
  const [form, setForm] = useState({ nombre: "", foto: "" });
  const [preview, setPreview] = useState(null);
  const [fileExtension, setFileExtension] = useState(null);
  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleImageChange = (event) => {
    setForm({ ...form, foto: event.target.files[0] });
    setPreview(URL.createObjectURL(event.target.files[0]));
    setFileExtension(event.target.files[0].name.split(".").pop());
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("foto", form.foto);
    formData.append("extencion", fileExtension);
    const response = await fetch("/api/eventos", {
      method: "POST",
      body: formData
    });
    showToast("👌 Evento Cargado", 3e3);
    await response.json();
    setPreview(null);
    setForm({ nombre: "", foto: "" });
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col items-center text-gray-700", children: [
    /* @__PURE__ */ jsxs("label", { htmlFor: "nombre", className: "my-5 border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm", children: [
      /* @__PURE__ */ jsx("p", { children: "Nombre del Evento" }),
      /* @__PURE__ */ jsx("input", { type: "text", id: "nombre", name: "nombre", value: form.nombre, required: true, className: "rounded-lg ring-0 border p-2", onChange: handleInputChange })
    ] }),
    preview ? /* @__PURE__ */ jsx("div", { className: "my-5 cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full h-[350px] gap-2 text-sm", children: /* @__PURE__ */ jsx("img", { src: preview, alt: "Preview", className: "mx-auto object-cover h-full w-auto" }) }) : /* @__PURE__ */ jsxs("label", { htmlFor: "foto", className: "my-5 h-[350px] cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm", children: [
      /* @__PURE__ */ jsx("p", { className: "mx-auto animate-pulse text-xs font-medium", children: "Click aqui para cargar tu foto 📂" }),
      /* @__PURE__ */ jsx("input", { type: "file", id: "foto", name: "foto", required: true, className: "hidden", onChange: handleImageChange, accept: "image/*,video/*" })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "disabled:bg-gray-200 cursor-pointer border flex items-center justify-center hover:bg-blue-400 duration-200 hover:ring-2 bg-blue-500 text-white font-medium rounded-lg p-2 text-center w-2/3 gap-2 text-sm", children: "Guardar" })
  ] });
}

const $$Astro$2 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Carga de Videos" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class=" min-h-screen w-full flex flex-col gap-10 items-center justify-start mt-20"><div class="md:w-1/2 md:h-1/2  bg-white/80  backdrop-blur-sm flex flex-col p-5 rounded-lg items-center justify-normal"><div class="text-center"><h2 class="mt-5 text-lg font-bold text-gray-700">
Carga tu Evento
</h2></div>${renderComponent($$result2, "FormularioEventos", FormularioEventos, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaeventos/componets/FormularioEventos", "client:component-export": "default" })}</div></main>` })}`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaeventos/index.astro", void 0);

const $$file$1 = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaeventos/index.astro";
const $$url$1 = "/cargaeventos";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

function Portada() {
  const [opctions, setOpctions] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [select, setSelect] = useState(null);
  useEffect(() => {
    const getEventos = async () => {
      try {
        const response = await fetch("/api/eventos");
        const data = await response.json();
        const eventos = await data.eventos;
        setOpctions(eventos);
        console.log(eventos);
      } catch (error) {
        console.error(error);
      }
    };
    getEventos();
  }, []);
  const handleClick = () => {
    setToggle(!toggle);
  };
  const handleSelect = (e) => {
    const selectedOption = opctions.find(
      (option) => option.uid === e.target.value
    );
    setSelect(selectedOption);
    console.log(selectedOption);
    setToggle(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    toggle && /* @__PURE__ */ jsx("div", { className: "bg-white/30 backdrop-blur-sm  top-0 left-0 w-full h-screen flex items-center justify-center z-40 duration-500", children: /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg border-2 gap-4 relative flex-col  h-36 text-gray-700 border-gray-200 bg-white flex items-center justify-normal w-1/3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: " bg-gray-400/70 w-7 h-7  rounded-full absolute top-4 right-3 text-white ",
          onClick: handleClick,
          children: "X"
        }
      ),
      /* @__PURE__ */ jsx("h3", { className: "text-sm capitalize", children: "elige el evento" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          onChange: handleSelect,
          name: "evento",
          id: "selecEvento",
          className: "text-xs text-gray-700 rounded px-2 border-transparent focus:ring-o bg-gray-200 py-2",
          children: [
            /* @__PURE__ */ jsx(
              "option",
              {
                value: "selectCamara",
                selected: true,
                disabled: true,
                className: "text-xs text-gray-700 p-2",
                children: "Selecciona una opcion"
              }
            ),
            opctions.map((evento) => /* @__PURE__ */ jsx(
              "option",
              {
                value: evento.uid,
                className: "text-xs text-gray-700 py-2 px-2",
                children: evento.name
              }
            ))
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        id: "contenedorVideo",
        className: "w-[650px]  h-[70vh] duration-700 rounded-3xl bg-transparent flex flex-col items-center justify-normal p-2",
        children: [
          /* @__PURE__ */ jsx(
            "h1",
            {
              onClick: handleClick,
              className: "cursor-pointer z-20 text-4xl absolute top-5 italic font-bold text-gray-100 drop-shadow-[1px_1px_3px_#555]",
              children: select ? select.name : "Selecciona el evento"
            }
          ),
          /* @__PURE__ */ jsx(
            "video",
            {
              src: "#",
              className: "object-scale-down opacity-0  absolute top-0 left-0 w-screen h-screen duration-700 ",
              id: "videoRecepcion",
              autoplay: true
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              id: "portadaRecepcion",
              src: !select ? "/recepcionQR.png" : select.portada,
              alt: "Receptor",
              width: "540",
              height: "540",
              className: "object-scale-down object-center w-full rounded-3xl h-full"
            }
          )
        ]
      }
    )
  ] });
}

const $$Astro$1 = createAstro();
const $$LayoutLector = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LayoutLector;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head><body class="w-screen  min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr text-white from-paleta1-primary backdrop-blur-sm to-paleta1-secondary">${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/layouts/LayoutLector.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "LayoutLector", $$LayoutLector, { "title": "LectorQR", "data-astro-cid-lbuhnwat": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class="flex items-center justify-around gap-5 flex-col w-full min-h-screen relative" data-astro-cid-lbuhnwat>${renderComponent($$result2, "BotonReceptor", $$BotonReceptor, { "data-astro-cid-lbuhnwat": true })}${renderComponent($$result2, "Portada", Portada, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/components/Portada.jsx", "client:component-export": "default", "data-astro-cid-lbuhnwat": true })}<div class="w-[200px] h-[200px] rounded-lg bg-white flex flex-col items-center justify-normal p-2 relative" data-astro-cid-lbuhnwat><h1 class="absolute top-3 bg-white px-3 rounded-lg text-sm font-bold text-gray-700" data-astro-cid-lbuhnwat>
Scanea tu codigo
</h1><!-- /** * lector abajo */ --><div class="h-full w-full flex flex-col items-center justify-center" data-astro-cid-lbuhnwat><video muted autoplay id="lectorQr" class="w-auto camaraInactiva h-full object-cover" data-astro-cid-lbuhnwat></video></div><div class="absolute bottom-2 animate-bounce text-2xl" data-astro-cid-lbuhnwat>⬇️</div></div></main>` })}`;
}, "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/index.astro", void 0);

const $$file = "C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/index.astro";
const $$url = "/recepcion";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index$2 as a, index$1 as b, index as c, index$3 as i };
