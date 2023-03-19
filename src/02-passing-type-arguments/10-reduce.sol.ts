import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type Item = {
  name: string;
};

const array: Item[] = [
  {
    name: "John",
  },
  {
    name: "Steve",
  },
];

type Reduced = Record<string, Item>;

const obj = array.reduce<Reduced>((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {});

it("Should resolve to an object where name is the key", () => {
  expect(obj).toEqual({
    John: {
      name: "John",
    },
    Steve: {
      name: "Steve",
    },
  });

  type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>];
});
