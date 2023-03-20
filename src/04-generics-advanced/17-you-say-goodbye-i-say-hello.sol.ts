import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type TGR<TG> = TG extends "goodbye" ? "hello" : "goodbye";

function youSayGoodbyeISayHello<TG extends "goodbye" | string>(
  greeting: TG
): TGR<TG> {
  return (greeting === "goodbye" ? "hello" : "goodbye") as TGR<TG>;
}

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello");

  type test = [Expect<Equal<typeof result, "goodbye">>];

  expect(result).toEqual("goodbye");
});

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye");

  type test = [Expect<Equal<typeof result, "hello">>];

  expect(result).toEqual("hello");
});
