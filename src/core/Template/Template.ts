import { ITemplateData } from "./ITemplate";

export class Template {
  tag: string;
  classList: string[];
  className: string;
  childs: Template[];
  id: string;
  events: Record<string, EventListenerOrEventListenerObject>;
  attributes: Record<string, any>;
  element: HTMLElement;
  styles: Record<string, any>;

  constructor(
    element: HTMLElement,
    templateData?: ITemplateData & { childs: Template[] }
  ) {
    this.tag = templateData?.tag ?? element.tagName;
    this.classList = templateData?.classList ?? Array.from(element.classList);
    this.className = templateData?.className ?? element.className;
    this.id = templateData?.id ?? element.id;
    this.events = templateData?.events ?? {};
    this.attributes = templateData?.attributes ?? {};
    this.styles = templateData?.styles ?? {};
    this.element = element;
    this.childs = templateData?.childs ?? [];
  }

  removeStyle(styleName: string) {
    delete this.styles[styleName];
    this.element.style.removeProperty(styleName);
  }

  addStyle(styles: Record<string, any>, styleValue: string) {
    Object.keys(styles).forEach((styleName) => {
      this.element.setAttribute(styleName, styles[styleName]);
      this.styles[styleName] = styles[styleName];
    });
  }

  addAttribute(attribute: string, value: string) {
    this.attributes[attribute] = value;
    this.element.setAttribute(attribute, value);
  }

  removeAttribute(atributeName: string) {
    delete this.attributes[atributeName];
    this.element.removeAttribute(atributeName);
  }
}
