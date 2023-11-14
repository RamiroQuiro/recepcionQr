import { serialize, parse } from 'cookie';
import { bold } from 'kleur/colors';
import 'string-width';
import 'html-escaper';
import 'clsx';
import { A as AstroError, y as ResponseSentError, D as MiddlewareNoDataOrNextCalled, F as MiddlewareNotAResponse, H as ASTRO_VERSION, C as ClientAddressNotAvailable, S as StaticClientAddressNotAvailable, u as LocalsNotAnObject, J as renderEndpoint } from './chunks/astro_70332156.mjs';
import mime from 'mime';
import { compile } from 'path-to-regexp';

const DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
const DELETED_VALUE = "deleted";
const responseSentSymbol = Symbol.for("astro.responseSent");
class AstroCookie {
  constructor(value) {
    this.value = value;
  }
  json() {
    if (this.value === void 0) {
      throw new Error(`Cannot convert undefined to an object.`);
    }
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    if (this.value === "false")
      return false;
    if (this.value === "0")
      return false;
    return Boolean(this.value);
  }
}
class AstroCookies {
  #request;
  #requestValues;
  #outgoing;
  constructor(request) {
    this.#request = request;
    this.#requestValues = null;
    this.#outgoing = null;
  }
  /**
   * Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
   * in a Set-Cookie header added to the response.
   * @param key The cookie to delete
   * @param options Options related to this deletion, such as the path of the cookie.
   */
  delete(key, options) {
    const serializeOptions = {
      expires: DELETED_EXPIRATION
    };
    if (options?.domain) {
      serializeOptions.domain = options.domain;
    }
    if (options?.path) {
      serializeOptions.path = options.path;
    }
    this.#ensureOutgoingMap().set(key, [
      DELETED_VALUE,
      serialize(key, DELETED_VALUE, serializeOptions),
      false
    ]);
  }
  /**
   * Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
   * request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
   * from that set call, overriding any values already part of the request.
   * @param key The cookie to get.
   * @returns An object containing the cookie value as well as convenience methods for converting its value.
   */
  get(key) {
    if (this.#outgoing?.has(key)) {
      let [serializedValue, , isSetValue] = this.#outgoing.get(key);
      if (isSetValue) {
        return new AstroCookie(serializedValue);
      } else {
        return void 0;
      }
    }
    const values = this.#ensureParsed();
    if (key in values) {
      const value = values[key];
      return new AstroCookie(value);
    }
  }
  /**
   * Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
   * part of the initial request or set via Astro.cookies.set(key)
   * @param key The cookie to check for.
   * @returns
   */
  has(key) {
    if (this.#outgoing?.has(key)) {
      let [, , isSetValue] = this.#outgoing.get(key);
      return isSetValue;
    }
    const values = this.#ensureParsed();
    return !!values[key];
  }
  /**
   * Astro.cookies.set(key, value) is used to set a cookie's value. If provided
   * an object it will be stringified via JSON.stringify(value). Additionally you
   * can provide options customizing how this cookie will be set, such as setting httpOnly
   * in order to prevent the cookie from being read in client-side JavaScript.
   * @param key The name of the cookie to set.
   * @param value A value, either a string or other primitive or an object.
   * @param options Options for the cookie, such as the path and security settings.
   */
  set(key, value, options) {
    let serializedValue;
    if (typeof value === "string") {
      serializedValue = value;
    } else {
      let toStringValue = value.toString();
      if (toStringValue === Object.prototype.toString.call(value)) {
        serializedValue = JSON.stringify(value);
      } else {
        serializedValue = toStringValue;
      }
    }
    const serializeOptions = {};
    if (options) {
      Object.assign(serializeOptions, options);
    }
    this.#ensureOutgoingMap().set(key, [
      serializedValue,
      serialize(key, serializedValue, serializeOptions),
      true
    ]);
    if (this.#request[responseSentSymbol]) {
      throw new AstroError({
        ...ResponseSentError
      });
    }
  }
  /**
   * Astro.cookies.header() returns an iterator for the cookies that have previously
   * been set by either Astro.cookies.set() or Astro.cookies.delete().
   * This method is primarily used by adapters to set the header on outgoing responses.
   * @returns
   */
  *headers() {
    if (this.#outgoing == null)
      return;
    for (const [, value] of this.#outgoing) {
      yield value[1];
    }
  }
  #ensureParsed() {
    if (!this.#requestValues) {
      this.#parse();
    }
    if (!this.#requestValues) {
      this.#requestValues = {};
    }
    return this.#requestValues;
  }
  #ensureOutgoingMap() {
    if (!this.#outgoing) {
      this.#outgoing = /* @__PURE__ */ new Map();
    }
    return this.#outgoing;
  }
  #parse() {
    const raw = this.#request.headers.get("cookie");
    if (!raw) {
      return;
    }
    this.#requestValues = parse(raw);
  }
}

const astroCookiesSymbol = Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
function responseHasCookies(response) {
  return Reflect.has(response, astroCookiesSymbol);
}
function getFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) {
    return cookies;
  } else {
    return void 0;
  }
}
function* getSetCookiesFromResponse(response) {
  const cookies = getFromResponse(response);
  if (!cookies) {
    return [];
  }
  for (const headerValue of cookies.headers()) {
    yield headerValue;
  }
  return [];
}

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message
  };
  if (levels[logLevel] > levels[level]) {
    return;
  }
  dest.write(event);
}
function info(opts, label, message) {
  return log(opts, "info", label, message);
}
function warn(opts, label, message) {
  return log(opts, "warn", label, message);
}
function error(opts, label, message) {
  return log(opts, "error", label, message);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message) {
    info(this.options, label, message);
  }
  warn(label, message) {
    warn(this.options, label, message);
  }
  error(label, message) {
    error(this.options, label, message);
  }
  debug(label, message, ...args) {
    debug(this.options, label, message, args);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.options, this.label, message);
  }
}

async function callMiddleware(logger, onRequest, apiContext, responseFunction) {
  let nextCalled = false;
  let responseFunctionPromise = void 0;
  const next = async () => {
    nextCalled = true;
    responseFunctionPromise = responseFunction();
    return responseFunctionPromise;
  };
  let middlewarePromise = onRequest(apiContext, next);
  return await Promise.resolve(middlewarePromise).then(async (value) => {
    if (isEndpointOutput(value)) {
      logger.warn(
        "middleware",
        `Using simple endpoints can cause unexpected issues in the chain of middleware functions.
It's strongly suggested to use full ${bold("Response")} objects.`
      );
    }
    if (nextCalled) {
      if (typeof value !== "undefined") {
        if (value instanceof Response === false) {
          throw new AstroError(MiddlewareNotAResponse);
        }
        return ensureCookiesAttached(apiContext, value);
      } else {
        if (responseFunctionPromise) {
          return responseFunctionPromise;
        } else {
          throw new AstroError(MiddlewareNotAResponse);
        }
      }
    } else if (typeof value === "undefined") {
      throw new AstroError(MiddlewareNoDataOrNextCalled);
    } else if (value instanceof Response === false) {
      throw new AstroError(MiddlewareNotAResponse);
    } else {
      return ensureCookiesAttached(apiContext, value);
    }
  });
}
function ensureCookiesAttached(apiContext, response) {
  if (apiContext.cookies !== void 0 && !responseHasCookies(response)) {
    attachCookiesToResponse(response, apiContext.cookies);
  }
  return response;
}
function isEndpointOutput(endpointResult) {
  return !(endpointResult instanceof Response) && typeof endpointResult === "object" && typeof endpointResult.body === "string";
}

const encoder = new TextEncoder();
const clientAddressSymbol = Symbol.for("astro.clientAddress");
const clientLocalsSymbol = Symbol.for("astro.locals");
function createAPIContext({
  request,
  params,
  site,
  props,
  adapterName
}) {
  const context = {
    cookies: new AstroCookies(request),
    request,
    params,
    site: site ? new URL(site) : void 0,
    generator: `Astro v${ASTRO_VERSION}`,
    props,
    redirect(path, status) {
      return new Response(null, {
        status: status || 302,
        headers: {
          Location: path
        }
      });
    },
    ResponseWithEncoding,
    url: new URL(request.url),
    get clientAddress() {
      if (clientAddressSymbol in request) {
        return Reflect.get(request, clientAddressSymbol);
      }
      if (adapterName) {
        throw new AstroError({
          ...ClientAddressNotAvailable,
          message: ClientAddressNotAvailable.message(adapterName)
        });
      } else {
        throw new AstroError(StaticClientAddressNotAvailable);
      }
    },
    get locals() {
      let locals = Reflect.get(request, clientLocalsSymbol);
      if (locals === void 0) {
        locals = {};
        Reflect.set(request, clientLocalsSymbol, locals);
      }
      if (typeof locals !== "object") {
        throw new AstroError(LocalsNotAnObject);
      }
      return locals;
    },
    // We define a custom property, so we can check the value passed to locals
    set locals(val) {
      if (typeof val !== "object") {
        throw new AstroError(LocalsNotAnObject);
      } else {
        Reflect.set(request, clientLocalsSymbol, val);
      }
    }
  };
  return context;
}
class ResponseWithEncoding extends Response {
  constructor(body, init, encoding) {
    if (typeof body === "string") {
      if (typeof Buffer !== "undefined" && Buffer.from) {
        body = Buffer.from(body, encoding);
      } else if (encoding == null || encoding === "utf8" || encoding === "utf-8") {
        body = encoder.encode(body);
      }
    }
    super(body, init);
    if (encoding) {
      this.headers.set("X-Astro-Encoding", encoding);
    }
  }
}
async function callEndpoint(mod, env, ctx, onRequest) {
  const context = createAPIContext({
    request: ctx.request,
    params: ctx.params,
    props: ctx.props,
    site: env.site,
    adapterName: env.adapterName
  });
  let response;
  if (onRequest) {
    response = await callMiddleware(
      env.logger,
      onRequest,
      context,
      async () => {
        return await renderEndpoint(mod, context, env.ssr, env.logger);
      }
    );
  } else {
    response = await renderEndpoint(mod, context, env.ssr, env.logger);
  }
  const isEndpointSSR = env.ssr && !ctx.route?.prerender;
  if (response instanceof Response) {
    if (isEndpointSSR && response.headers.get("X-Astro-Encoding")) {
      env.logger.warn(
        "ssr",
        "`ResponseWithEncoding` is ignored in SSR. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."
      );
    }
    attachCookiesToResponse(response, context.cookies);
    return response;
  }
  env.logger.warn(
    "astro",
    `${ctx.route.component} returns a simple object which is deprecated. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information.`
  );
  if (isEndpointSSR) {
    if (response.hasOwnProperty("headers")) {
      env.logger.warn(
        "ssr",
        "Setting headers is not supported when returning an object. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."
      );
    }
    if (response.encoding) {
      env.logger.warn(
        "ssr",
        "`encoding` is ignored in SSR. To return a charset other than UTF-8, please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."
      );
    }
  }
  let body;
  const headers = new Headers();
  const pathname = ctx.route ? (
    // Try the static route `pathname`
    ctx.route.pathname ?? // Dynamic routes don't include `pathname`, so synthesize a path for these (e.g. 'src/pages/[slug].svg')
    ctx.route.segments.map((s) => s.map((p) => p.content).join("")).join("/")
  ) : (
    // Fallback to pathname of the request
    ctx.pathname
  );
  const mimeType = mime.getType(pathname) || "text/plain";
  headers.set("Content-Type", `${mimeType};charset=utf-8`);
  if (response.encoding) {
    headers.set("X-Astro-Encoding", response.encoding);
  }
  if (response.body instanceof Uint8Array) {
    body = response.body;
    headers.set("Content-Length", body.byteLength.toString());
  } else if (typeof Buffer !== "undefined" && Buffer.from) {
    body = Buffer.from(response.body, response.encoding);
    headers.set("Content-Length", body.byteLength.toString());
  } else if (response.encoding == null || response.encoding === "utf8" || response.encoding === "utf-8") {
    body = encoder.encode(response.body);
    headers.set("Content-Length", body.byteLength.toString());
  } else {
    body = response.body;
  }
  response = new Response(body, {
    status: 200,
    headers
  });
  attachCookiesToResponse(response, context.cookies);
  return response;
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"},{"type":"inline","content":"@font-face{font-family:NunitoSans;src:url(/fonts/NunitoSans.ttf) format(\"tff\");font-weight:400;font-style:normal;font-display:swap}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% );font-family:NunitoSans,sans-serif}#toast-container{position:fixed;top:20px;right:20px;z-index:9999}.toast{background-color:#3d3d3d;color:#fff;padding:10px;margin-bottom:10px;border-radius:4px;animation:slideInDown .5s ease-in-out,slideOutUp 1s ease-in-out 2s}@keyframes slideInDown{0%{transform:translateY(-100%)}50%{transform:translateY(10%)}to{transform:translateY(0)}}@keyframes slideOutUp{0%{transform:translateY(0)}50%{transform:translateY(-10%)}to{transform:translateY(-100%)}}\n"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"},{"type":"inline","content":"@font-face{font-family:NunitoSans;src:url(/fonts/NunitoSans.ttf) format(\"tff\");font-weight:400;font-style:normal;font-display:swap}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% );font-family:NunitoSans,sans-serif}#toast-container{position:fixed;top:20px;right:20px;z-index:9999}.toast{background-color:#3d3d3d;color:#fff;padding:10px;margin-bottom:10px;border-radius:4px;animation:slideInDown .5s ease-in-out,slideOutUp 1s ease-in-out 2s}@keyframes slideInDown{0%{transform:translateY(-100%)}50%{transform:translateY(10%)}to{transform:translateY(0)}}@keyframes slideOutUp{0%{transform:translateY(0)}50%{transform:translateY(-10%)}to{transform:translateY(-100%)}}\n.lds-ellipsis[data-astro-cid-aa6yq6bl]{display:inline-block;position:relative;width:80px;height:80px}.lds-ellipsis[data-astro-cid-aa6yq6bl] div[data-astro-cid-aa6yq6bl]{position:absolute;top:33px;width:13px;height:13px;border-radius:50%;background:#c35dd8;animation-timing-function:cubic-bezier(0,1,1,0)}.lds-ellipsis[data-astro-cid-aa6yq6bl] div[data-astro-cid-aa6yq6bl]:nth-child(1){left:8px;animation:lds-ellipsis1 .6s infinite}.lds-ellipsis[data-astro-cid-aa6yq6bl] div[data-astro-cid-aa6yq6bl]:nth-child(2){left:8px;animation:lds-ellipsis2 .6s infinite}.lds-ellipsis[data-astro-cid-aa6yq6bl] div[data-astro-cid-aa6yq6bl]:nth-child(3){left:32px;animation:lds-ellipsis2 .6s infinite}.lds-ellipsis[data-astro-cid-aa6yq6bl] div[data-astro-cid-aa6yq6bl]:nth-child(4){left:56px;animation:lds-ellipsis3 .6s infinite}@keyframes lds-ellipsis1{0%{transform:scale(0)}to{transform:scale(1)}}@keyframes lds-ellipsis3{0%{transform:scale(1)}to{transform:scale(0)}}@keyframes lds-ellipsis2{0%{transform:translate(0)}to{transform:translate(24px)}}\n"}],"routeData":{"route":"/cargaformulario","type":"page","pattern":"^\\/cargaformulario\\/?$","segments":[[{"content":"cargaformulario","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cargaformulario/index.astro","pathname":"/cargaformulario","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"}],"routeData":{"route":"/videoscargados/eventoscargados","type":"page","pattern":"^\\/videosCargados\\/EventosCargados\\/?$","segments":[[{"content":"videosCargados","dynamic":false,"spread":false}],[{"content":"EventosCargados","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/videosCargados/EventosCargados.astro","pathname":"/videosCargados/EventosCargados","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"}],"routeData":{"route":"/videoscargados/components/cardeventos","type":"page","pattern":"^\\/videosCargados\\/components\\/CardEventos\\/?$","segments":[[{"content":"videosCargados","dynamic":false,"spread":false}],[{"content":"components","dynamic":false,"spread":false}],[{"content":"CardEventos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/videosCargados/components/CardEventos.astro","pathname":"/videosCargados/components/CardEventos","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"},{"type":"inline","content":"@font-face{font-family:NunitoSans;src:url(/fonts/NunitoSans.ttf) format(\"tff\");font-weight:400;font-style:normal;font-display:swap}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% );font-family:NunitoSans,sans-serif}#toast-container{position:fixed;top:20px;right:20px;z-index:9999}.toast{background-color:#3d3d3d;color:#fff;padding:10px;margin-bottom:10px;border-radius:4px;animation:slideInDown .5s ease-in-out,slideOutUp 1s ease-in-out 2s}@keyframes slideInDown{0%{transform:translateY(-100%)}50%{transform:translateY(10%)}to{transform:translateY(0)}}@keyframes slideOutUp{0%{transform:translateY(0)}50%{transform:translateY(-10%)}to{transform:translateY(-100%)}}\n"}],"routeData":{"route":"/cargaeventos","type":"page","pattern":"^\\/cargaeventos\\/?$","segments":[[{"content":"cargaeventos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cargaeventos/index.astro","pathname":"/cargaeventos","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b2889056.js"}],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"},{"type":"inline","content":":root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}.camaraInactiva[data-astro-cid-lbuhnwat]{background-image:url(/lectorQR.jpeg);background-size:contain}.aparecer[data-astro-cid-lbuhnwat]{display:hidden}.videoActivo[data-astro-cid-lbuhnwat]{width:100vw;height:100vh;-o-object-fit:cover;object-fit:cover}\n.menudesplegable[data-astro-cid-2oominy3]{display:flex;opacity:1;height:100%}.agrandarBoton[data-astro-cid-2oominy3]{width:230px;height:100px;gap:10px}.botonOpen[data-astro-cid-2oominy3]{transform:rotate(45deg) scale(1.2);background-color:#d1d5dbcc}\n"}],"routeData":{"route":"/recepcion","type":"page","pattern":"^\\/recepcion\\/?$","segments":[[{"content":"recepcion","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recepcion/index.astro","pathname":"/recepcion","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/recepcion/funcionamientolector","type":"endpoint","pattern":"^\\/recepcion\\/funcionamientoLector$","segments":[[{"content":"recepcion","dynamic":false,"spread":false}],[{"content":"funcionamientoLector","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recepcion/funcionamientoLector.js","pathname":"/recepcion/funcionamientoLector","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/recepcion/selectoreventos","type":"endpoint","pattern":"^\\/recepcion\\/selectorEventos$","segments":[[{"content":"recepcion","dynamic":false,"spread":false}],[{"content":"selectorEventos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recepcion/selectorEventos.js","pathname":"/recepcion/selectorEventos","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"}],"routeData":{"route":"/recepcion/components/selectorcamara","type":"page","pattern":"^\\/recepcion\\/components\\/SelectorCamara\\/?$","segments":[[{"content":"recepcion","dynamic":false,"spread":false}],[{"content":"components","dynamic":false,"spread":false}],[{"content":"SelectorCamara","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recepcion/components/SelectorCamara.astro","pathname":"/recepcion/components/SelectorCamara","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.de450375.js"}],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"},{"type":"inline","content":".menudesplegable[data-astro-cid-2oominy3]{display:flex;opacity:1;height:100%}.agrandarBoton[data-astro-cid-2oominy3]{width:230px;height:100px;gap:10px}.botonOpen[data-astro-cid-2oominy3]{transform:rotate(45deg) scale(1.2);background-color:#d1d5dbcc}\n"}],"routeData":{"route":"/recepcion/components/botonreceptor","type":"page","pattern":"^\\/recepcion\\/components\\/BotonReceptor\\/?$","segments":[[{"content":"recepcion","dynamic":false,"spread":false}],[{"content":"components","dynamic":false,"spread":false}],[{"content":"BotonReceptor","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recepcion/components/BotonReceptor.astro","pathname":"/recepcion/components/BotonReceptor","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"},{"type":"inline","content":".videoActivo[data-astro-cid-lncvygkg]{width:100vw;height:100vh;-o-object-fit:cover;object-fit:cover}\n"}],"routeData":{"route":"/recepcion/components/portada","type":"page","pattern":"^\\/recepcion\\/components\\/Portada\\/?$","segments":[[{"content":"recepcion","dynamic":false,"spread":false}],[{"content":"components","dynamic":false,"spread":false}],[{"content":"Portada","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recepcion/components/Portada.astro","pathname":"/recepcion/components/Portada","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"}],"routeData":{"route":"/eventos/components/videoscargados","type":"page","pattern":"^\\/eventos\\/components\\/VideosCargados\\/?$","segments":[[{"content":"eventos","dynamic":false,"spread":false}],[{"content":"components","dynamic":false,"spread":false}],[{"content":"VideosCargados","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/eventos/components/VideosCargados.astro","pathname":"/eventos/components/VideosCargados","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"}],"routeData":{"route":"/eventos/components/cardvideos","type":"page","pattern":"^\\/eventos\\/components\\/CardVideos\\/?$","segments":[[{"content":"eventos","dynamic":false,"spread":false}],[{"content":"components","dynamic":false,"spread":false}],[{"content":"CardVideos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/eventos/components/CardVideos.astro","pathname":"/eventos/components/CardVideos","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.76f7616d.css"},{"type":"inline","content":"@font-face{font-family:NunitoSans;src:url(/fonts/NunitoSans.ttf) format(\"tff\");font-weight:400;font-style:normal;font-display:swap}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% );font-family:NunitoSans,sans-serif}#toast-container{position:fixed;top:20px;right:20px;z-index:9999}.toast{background-color:#3d3d3d;color:#fff;padding:10px;margin-bottom:10px;border-radius:4px;animation:slideInDown .5s ease-in-out,slideOutUp 1s ease-in-out 2s}@keyframes slideInDown{0%{transform:translateY(-100%)}50%{transform:translateY(10%)}to{transform:translateY(0)}}@keyframes slideOutUp{0%{transform:translateY(0)}50%{transform:translateY(-10%)}to{transform:translateY(-100%)}}\n"}],"routeData":{"route":"/eventos/[uid]","type":"page","pattern":"^\\/eventos\\/([^/]+?)\\/?$","segments":[[{"content":"eventos","dynamic":false,"spread":false}],[{"content":"uid","dynamic":true,"spread":false}]],"params":["uid"],"component":"src/pages/eventos/[uid].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/toast","type":"endpoint","pattern":"^\\/toast$","segments":[[{"content":"toast","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/toast.js","pathname":"/toast","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/eliminarvideo","type":"endpoint","pattern":"^\\/api\\/eliminarvideo$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"eliminarvideo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/eliminarvideo.js","pathname":"/api/eliminarvideo","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/listarvideos","type":"endpoint","pattern":"^\\/api\\/listarvideos$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"listarvideos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/listarvideos.js","pathname":"/api/listarvideos","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/feedback","type":"endpoint","pattern":"^\\/api\\/feedback$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"feedback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/feedback.js","pathname":"/api/feedback","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/eventos","type":"endpoint","pattern":"^\\/api\\/eventos$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"eventos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/eventos.js","pathname":"/api/eventos","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/upload","type":"endpoint","pattern":"^\\/api\\/upload$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/upload.js","pathname":"/api/upload","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/data","type":"endpoint","pattern":"^\\/api\\/data$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"data","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/data.js","pathname":"/api/data","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/[uid]","type":"endpoint","pattern":"^\\/api\\/([^/]+?)$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"uid","dynamic":true,"spread":false}]],"params":["uid"],"component":"src/pages/api/[uid].js","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaeventos/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaformulario/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/eventos/[uid].astro",{"propagation":"none","containsHead":true}],["C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/recepcion/components/BotonReceptor.astro":"chunks/pages/BotonReceptor_f09a1f07.mjs","/src/pages/eventos/components/CardVideos.astro":"chunks/pages/CardVideos_0b9cba26.mjs","/src/pages/videosCargados/EventosCargados.astro":"chunks/pages/EventosCargados_16619165.mjs","/src/pages/recepcion/components/Portada.astro":"chunks/pages/Portada_c53af1b3.mjs","/src/pages/recepcion/components/SelectorCamara.astro":"chunks/pages/SelectorCamara_22cdab7e.mjs","/src/pages/eventos/components/VideosCargados.astro":"chunks/pages/VideosCargados_22959067.mjs","/src/pages/api/[uid].js":"chunks/pages/_uid__83ea272b.mjs","/src/pages/api/data.js":"chunks/pages/data_4ed993c7.mjs","/src/pages/api/eliminarvideo.js":"chunks/pages/eliminarvideo_92795a4d.mjs","/src/pages/api/eventos.js":"chunks/pages/eventos_8f82365d.mjs","/src/pages/api/feedback.js":"chunks/pages/feedback_3b6059c7.mjs","/src/pages/recepcion/funcionamientoLector.js":"chunks/pages/funcionamientoLector_ce023228.mjs","/src/pages/api/listarvideos.js":"chunks/pages/listarvideos_065607a7.mjs","/node_modules/astro/dist/assets/endpoint/node.js":"chunks/pages/node_b3e5463d.mjs","/src/pages/recepcion/selectorEventos.js":"chunks/pages/selectorEventos_501b18b8.mjs","/src/pages/toast.js":"chunks/pages/toast_8445a929.mjs","/src/pages/api/upload.js":"chunks/pages/upload_fab074e6.mjs","\u0000@astrojs-manifest":"manifest_f74ce64e.mjs","C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_3769332a.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"chunks/node_76041075.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_6f88a19a.mjs","\u0000@astro-page:src/pages/cargaformulario/index@_@astro":"chunks/index_16c6b6f6.mjs","\u0000@astro-page:src/pages/videosCargados/EventosCargados@_@astro":"chunks/EventosCargados_67685ce4.mjs","\u0000@astro-page:src/pages/videosCargados/components/CardEventos@_@astro":"chunks/CardEventos_15262895.mjs","\u0000@astro-page:src/pages/cargaeventos/index@_@astro":"chunks/index_7a4787f8.mjs","\u0000@astro-page:src/pages/recepcion/index@_@astro":"chunks/index_46404f66.mjs","\u0000@astro-page:src/pages/recepcion/funcionamientoLector@_@js":"chunks/funcionamientoLector_30c7de09.mjs","\u0000@astro-page:src/pages/recepcion/selectorEventos@_@js":"chunks/selectorEventos_b6bae539.mjs","\u0000@astro-page:src/pages/recepcion/components/SelectorCamara@_@astro":"chunks/SelectorCamara_6c8aa3c8.mjs","\u0000@astro-page:src/pages/recepcion/components/BotonReceptor@_@astro":"chunks/BotonReceptor_6f8e95a4.mjs","\u0000@astro-page:src/pages/recepcion/components/Portada@_@astro":"chunks/Portada_9661cb80.mjs","\u0000@astro-page:src/pages/eventos/components/VideosCargados@_@astro":"chunks/VideosCargados_d47b6e4a.mjs","\u0000@astro-page:src/pages/eventos/components/CardVideos@_@astro":"chunks/CardVideos_b90b4394.mjs","\u0000@astro-page:src/pages/eventos/[uid]@_@astro":"chunks/_uid__1723caed.mjs","\u0000@astro-page:src/pages/toast@_@js":"chunks/toast_ce8affcc.mjs","\u0000@astro-page:src/pages/api/eliminarvideo@_@js":"chunks/eliminarvideo_28581748.mjs","\u0000@astro-page:src/pages/api/listarvideos@_@js":"chunks/listarvideos_abba47cf.mjs","\u0000@astro-page:src/pages/api/feedback@_@js":"chunks/feedback_6607bb4b.mjs","\u0000@astro-page:src/pages/api/eventos@_@js":"chunks/eventos_a60554b5.mjs","\u0000@astro-page:src/pages/api/upload@_@js":"chunks/upload_84af6739.mjs","\u0000@astro-page:src/pages/api/data@_@js":"chunks/data_960c13a0.mjs","\u0000@astro-page:src/pages/api/[uid]@_@js":"chunks/_uid__043f0341.mjs","C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaformulario/components/Formulario":"_astro/Formulario.89219c6a.js","C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/videosCargados/components/BotonEntrar.jsx":"_astro/BotonEntrar.f0db30a5.js","C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/videosCargados/components/BotonEliminar.jsx":"_astro/BotonEliminar.df4b2141.js","C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/recepcion/components/Portada.jsx":"_astro/Portada.2e9bf53a.js","C:/Users/ramiro.quiroga/Desktop/RamiroCode/recepcionqr/src/pages/cargaeventos/componets/FormularioEventos":"_astro/FormularioEventos.26db8e18.js","/astro/hoisted.js?q=1":"_astro/hoisted.de450375.js","/astro/hoisted.js?q=0":"_astro/hoisted.b2889056.js","@astrojs/react/client.js":"_astro/client.bb1cf6b8.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/index.76f7616d.css","/favicon.svg","/lectorQR.jpeg","/recepcionQR.jpeg","/recepcionQR.png","/base/base.json","/fonts/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf","/fonts/NunitoSans.ttf","/_astro/BotonEliminar.df4b2141.js","/_astro/BotonEntrar.f0db30a5.js","/_astro/client.bb1cf6b8.js","/_astro/Formulario.89219c6a.js","/_astro/FormularioEventos.26db8e18.js","/_astro/hoisted.b2889056.js","/_astro/hoisted.de450375.js","/_astro/index.ed373d49.js","/_astro/jsx-runtime.391947bd.js","/_astro/Portada.2e9bf53a.js","/_astro/toast.421cbc24.js","/upload/0319/6153.mp4","/upload/0319/portada.jpg"]});

export { AstroCookies as A, Logger as L, attachCookiesToResponse as a, callEndpoint as b, createAPIContext as c, dateTimeFormat as d, callMiddleware as e, AstroIntegrationLogger as f, getSetCookiesFromResponse as g, levels as l, manifest };
