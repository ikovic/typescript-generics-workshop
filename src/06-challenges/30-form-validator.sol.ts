import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type Validators<TValidatorKeys extends string> = Record<
  TValidatorKeys,
  (value: string) => string | void
>;
type Config<TObjKeys extends string, TValidatorKeys> = Record<
  TObjKeys,
  Array<TValidatorKeys>
>;

const makeFormValidatorFactory =
  <TValidators extends string>(validators: Validators<TValidators>) =>
  <TKeys extends string>(config: Config<TKeys, TValidators>) => {
    return (values: Record<TKeys, string>) => {
      const errors = {} as Record<TKeys, string | undefined>;

      for (const key in config) {
        for (const validator of config[key]) {
          const error = validators[validator](values[key]);
          if (error) {
            errors[key] = error;
            break;
          }
        }
      }

      return errors;
    };
  };

const createFormValidator = makeFormValidatorFactory({
  required: (value) => {
    if (value === "") {
      return "Required";
    }
  },
  minLength: (value) => {
    if (value.length < 5) {
      return "Minimum length is 5";
    }
  },
  email: (value) => {
    if (!value.includes("@")) {
      return "Invalid email";
    }
  },
});

const validateUser = createFormValidator({
  id: ["required"],
  username: ["required", "minLength"],
  email: ["required", "email"],
});

it("Should properly validate a user", () => {
  const errors = validateUser({
    id: "1",
    username: "john",
    email: "Blah",
  });

  expect(errors).toEqual({
    username: "Minimum length is 5",
    email: "Invalid email",
  });

  type test = Expect<
    Equal<
      typeof errors,
      {
        id: string | undefined;
        username: string | undefined;
        email: string | undefined;
      }
    >
  >;
});

it("Should not allow you to specify a validator that does not exist", () => {
  createFormValidator({
    // @ts-expect-error
    id: ["i-do-not-exist"],
  });
});

it("Should not allow you to validate an object property that does not exist", () => {
  const validator = createFormValidator({
    id: ["required"],
  });

  validator({
    // @ts-expect-error
    name: "123",
  });
});
