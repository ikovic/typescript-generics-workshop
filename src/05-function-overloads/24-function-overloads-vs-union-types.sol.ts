import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type StringGenerator = () => string;
type ObjectGenerator = { run: () => string };

// even if we removed the overloads the return type would be the same
// it only makes sense to use them if the return type is different based on what we pass in
function runGenerator(generator: StringGenerator): string;
function runGenerator(generator: ObjectGenerator): string;
function runGenerator(generator: StringGenerator | ObjectGenerator) {
  if (typeof generator === "function") {
    return generator();
  }
  return generator.run();
}

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator({
    run: () => "hello",
  });

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator(() => "hello");

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});
