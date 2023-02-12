import { ITemplateData } from "./ITemplate";
import { Template } from "./Template";

export type ITFunction<T> = T extends ITemplateData
  ? Template
  : T extends HTMLElement
  ? Template
  : Template | Template[];
