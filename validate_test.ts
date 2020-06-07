import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { NumberSchema, ObjectSchema } from "./schema.ts";
import validate from "./validate.ts";

Deno.test("Validate number by simple number schema.", () => {
  const schema: NumberSchema = {
    type: "number",
  };

  const validateResult = validate(10, schema);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("Validate object by simple number schema.", () => {
  const schema: NumberSchema = {
    type: "number",
  };

  const validateResult = validate({}, schema);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, []);
  assertEquals(validateResult.invalidType, "TYPE_MISMATCH");
});

Deno.test("Validate valid object by schema with properties.", () => {
  const schema: ObjectSchema = {
    type: "object",
    properties: {
      p1: {
        type: "number",
      },
      p2: {
        type: "number",
      },
    },
  };

  const value = {
    "p1": 100,
    "p2": 200,
    "px": 1,
  };

  const validateResult = validate(value, schema);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("Validate invalid object by schema with properties.", () => {
  const schema: ObjectSchema = {
    type: "object",
    properties: {
      p1: {
        type: "number",
      },
      p2: {
        type: "number",
      },
    },
  };

  const value = {
    "p1": 100,
    "p2": {},
    "px": 1,
  };

  const validateResult = validate(value, schema);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p2"]);
  assertEquals(validateResult.invalidType, "TYPE_MISMATCH");
});

Deno.test("Validate valid 2-depth object by schema with properties.", () => {
  const schema: ObjectSchema = {
    type: "object",
    properties: {
      p1: {
        type: "number",
      },
      p2: {
        type: "object",
        properties: {
          p2p1: { type: "number" },
        },
      },
    },
  };

  const value = {
    "p1": 100,
    "p2": { "p2p1": 200 },
    "px": 1,
  };

  const validateResult = validate(value, schema);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("Validate invalid 2-depth object by schema with properties.", () => {
  const schema: ObjectSchema = {
    type: "object",
    properties: {
      p1: {
        type: "number",
      },
      p2: {
        type: "object",
        properties: {
          p2p1: { type: "number" },
        },
      },
    },
  };

  const value = {
    "p1": 100,
    "p2": { "p2p1": {} },
    "px": 1,
  };

  const validateResult = validate(value, schema);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p2", "p2p1"]);
  assertEquals(validateResult.invalidType, "TYPE_MISMATCH");
});
