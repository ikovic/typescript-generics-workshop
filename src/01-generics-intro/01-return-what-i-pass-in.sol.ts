import { Equal, Expect } from "../helpers/type-utils";

const returnWhatIPassIn = <T>(t: T): T => {
  return t;
};

// function form
function returnWhatIPassInFn<T>(t: T): T {
  return t;
}

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");
const fnTest = returnWhatIPassInFn(123);

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];
