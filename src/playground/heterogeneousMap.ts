// Approach 1: Union Type Map (Simple)
type HeterogeneousValue = string | number | boolean | object;
const unionMap: Map<string, HeterogeneousValue> = new Map([
  ["name", "John"],
  ["age", 30],
  ["active", true],
  ["metadata", { role: "admin" }],
]);

// Operating on each node
unionMap.forEach((value, key) => {
  console.log(`${key}:`, value);
  // Type narrowing for specific operations
  if (typeof value === "string") {
    console.log(`  String length: ${value.length}`);
  }
});

// Approach 2: Discriminated Union (Type-safe with preserved type info)
type TypedValue =
  | { type: "string"; value: string }
  | { type: "number"; value: number }
  | { type: "boolean"; value: boolean }
  | { type: "object"; value: Record<string, unknown> };

const discriminatedMap: Map<string, TypedValue> = new Map([
  ["name", { type: "string", value: "John" }],
  ["age", { type: "number", value: 30 }],
  ["active", { type: "boolean", value: true }],
  ["metadata", { type: "object", value: { role: "admin" } }],
]);

// Operating similarly on each node
discriminatedMap.forEach((entry, key) => {
  console.log(`${key}:`, entry.value);
  switch (entry.type) {
    case "string":
      // entry.value is string - fully type-safe
      console.log(`  String length: ${entry.value.length}`);
      break;
    case "number":
      // entry.value is number - fully type-safe
      console.log(`  Number doubled: ${entry.value * 2}`);
      break;
    case "boolean":
      // entry.value is boolean - fully type-safe
      console.log(`  Boolean negated: ${!entry.value}`);
      break;
    case "object":
      // entry.value is Record<string, unknown> - fully type-safe
      console.log(`  Object keys: ${Object.keys(entry.value).join(", ")}`);
      break;
  }
});

// Approach 3: Generic Wrapper with Common Interface (Most Flexible)
interface Processable<T = unknown> {
  value: T;
  process: (val: T) => string; // Common operation interface
}

const wrapperMap: Map<string, Processable> = new Map([
  [
    "name",
    {
      value: "John",
      process: (val: string) => `Name: ${val.toUpperCase()}`,
    },
  ],
  [
    "age",
    {
      value: 30,
      process: (val: number) => `Age: ${val} years old`,
    },
  ],
  [
    "active",
    {
      value: true,
      process: (val: boolean) => `Status: ${val ? "Active" : "Inactive"}`,
    },
  ],
]);

// Operating similarly on each node - same interface
wrapperMap.forEach((wrapper, key) => {
  const result = wrapper.process(wrapper.value);
  console.log(`${key} -> ${result}`);
});

// Approach 4: Record with Type Guards (Good for plain objects)
type HeterogeneousMap = Record<string, unknown>;

const recordMap: HeterogeneousMap = {
  name: "John",
  age: 30,
  active: true,
  metadata: { role: "admin" },
};

// Operating on each node
Object.entries(recordMap).forEach(([key, value]) => {
  console.log(`${key}:`, value);
  // Type guards for specific operations
  if (typeof value === "string") {
    console.log(`  String: ${value.toUpperCase()}`);
  } else if (typeof value === "number") {
    console.log(`  Number: ${value * 2}`);
  }
});

// Recommended: Discriminated Union for maximum type safety
export type { TypedValue, HeterogeneousMap };
export { discriminatedMap, recordMap };
