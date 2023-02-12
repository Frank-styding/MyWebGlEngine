import { Template } from "./Template";

export interface ITemplateData {
  tag?: string;
  classList?: string[];
  className?: string;
  childs?: (ITemplateData | HTMLElement | string | Template)[];
  id?: string;
  events?: {
    [Key in keyof HTMLElementEventMap]?: (
      this: HTMLElement,
      ev: HTMLElementEventMap[Key]
    ) => void;
  };
  ref?: (element: Template) => void;
  attributes?: Record<string, any>;
  styles?: Record<string, any>;
  innerHTML?: string;
}
