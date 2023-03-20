type Person = {
  name: string;
  age: number;
  birthdate: Date;
};

export function remapPerson<Key extends keyof Person>(
  key: Key,
  value: Person[Key]
): Person[Key] {
  if (key === "birthdate") {
    // TS has trouble narrowing down the return type of a generic function
    return new Date() as Person[Key];
  }

  return value;
}
