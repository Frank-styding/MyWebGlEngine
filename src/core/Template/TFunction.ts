import { ITemplateData } from "./ITemplate";
import { ITFunction } from "./ITFunction";
import { Template } from "./Template";

function selectByClassName(className: string) {
  const elements = document.getElementsByClassName(className);
  const result = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLElement;
    result.push(new Template(element));
  }
  return result;
}

function selectById(id: string, templateData?: ITemplateData) {
  const element = document.getElementById(id);
  if (templateData) {
    return t(templateData, undefined, element);
  }
  return new Template(element);
}

function addClassName(a: ITemplateData, element: HTMLElement) {
  if (a.className) {
    element.className = a.className;
  }
}

function addID(a: ITemplateData, element: HTMLElement) {
  if (a.id) {
    element.id = a.id;
  }
}

function addEvents(a: ITemplateData, element: HTMLElement) {
  if (a.events != undefined) {
    Object.keys(a.events).forEach((key) => {
      const event = a.events[key as keyof HTMLElementEventMap];
      element.addEventListener(key, event);
    });
  }
}

function addAttributes(a: ITemplateData, element: HTMLElement) {
  if (a.attributes) {
    Object.keys(a.attributes).forEach((key) => {
      element.setAttribute(key, a.attributes[key]);
    });
  }
}

function addStyles(a: ITemplateData, element: HTMLElement) {
  if (a.styles) {
    Object.keys(a.styles).forEach((key) => {
      element.style.setProperty(key.replace("$$", "-"), a.styles[key]);
    });
  }
}

function addChilds(a: ITemplateData, element: HTMLElement) {
  if (a.childs) {
    const childs: Template[] = [];
    a.childs.forEach((child) => {
      if (child instanceof HTMLElement) {
        element.appendChild(child);
        childs.push(new Template(child));
        return;
      }

      if (typeof child === "string") {
        element.innerHTML += child;
        return;
      }

      if (child instanceof Template) {
        element.appendChild(child.element);
        return;
      }

      if (typeof child === "object") {
        const template = t(child) as Template;
        childs.push(template);
        element.appendChild(template.element);
        return;
      }
    });

    return childs;
  }
}

function addInnerHTML(a: ITemplateData, element: HTMLElement) {
  if (a.innerHTML) {
    element.innerHTML = a.innerHTML;
  }
}
export function t<T extends ITemplateData | string | HTMLElement>(
  a: T,
  b?: ITemplateData,
  _element?: HTMLElement
): ITFunction<T> {
  if (typeof a === "string") {
    if (a.startsWith("class:")) {
      return selectByClassName(a.replace("class:", "")) as ITFunction<T>;
    }
    return selectById(a.replace("id:", ""), b) as ITFunction<T>;
  }

  if (a instanceof HTMLElement) {
    return t(b, undefined, a) as ITFunction<T>;
  }

  const element = _element ?? document.createElement(a.tag || "div");

  addClassName(a, element);
  addID(a, element);
  addEvents(a, element);
  addAttributes(a, element);
  addStyles(a, element);
  addInnerHTML(a, element);

  const childs = addChilds(a, element);
  const template = new Template(element, { ...a, childs }) as ITFunction<T>;

  if (a.ref) {
    a.ref(template as Template);
  }

  return template;
}
