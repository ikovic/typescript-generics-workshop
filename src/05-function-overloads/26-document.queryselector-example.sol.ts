import { Equal, Expect } from "../helpers/type-utils";

const divElement = document.querySelector("div");
const spanElement = document.querySelector("span");

/**
 * Your challenge: figure out why divElement2 is NOT
 * of type HTMLDivElement.
 */
// document.querySelector type definition first has a map between the tag names and element types
// this only works for selectors that only include the tag name
// in case this does not match it falls back to the generic
const divElement2 = document.querySelector<HTMLDivElement>("div.foo");

type tests = [
  Expect<Equal<typeof divElement, HTMLDivElement | null>>,
  Expect<Equal<typeof spanElement, HTMLSpanElement | null>>,
  Expect<Equal<typeof divElement2, HTMLDivElement | null>>
];
