import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { NumberSchema } from "../schema.ts";
import validateNumber from "./validate_number.ts";

Deno.test("When validate by `minimum`, then valid.", () => {
  const schema: NumberSchema = {
    type: "number",
    minimum: 100,
  };

  const validateResult = validateNumber(100, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `minimum`, then valid. (2)", () => {
  const schema: NumberSchema = {
    type: "number",
    minimum: 100,
  };

  const validateResult = validateNumber(100.1, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `minimum`, then invalid.", () => {
  const schema: NumberSchema = {
    type: "number",
    minimum: 100,
  };

  const validateResult = validateNumber(99.9, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `minimum` and `exclusiveMinimum: false`, then valid.", () => {
  const schema: NumberSchema = {
    type: "number",
    minimum: 100,
    exclusiveMinimum: false,
  };

  const validateResult = validateNumber(100, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `minimum` and `exclusiveMinimum: false`, then valid. (2)", () => {
  const schema: NumberSchema = {
    type: "number",
    minimum: 100,
    exclusiveMinimum: false,
  };

  const validateResult = validateNumber(100.1, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `minimum` and `exclusiveMinimum: false`, then invalid.", () => {
  const schema: NumberSchema = {
    type: "number",
    minimum: 100,
    exclusiveMinimum: false,
  };

  const validateResult = validateNumber(99.9, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `minimum` and `exclusiveMinimum: true`, then invalid.", () => {
  const schema: NumberSchema = {
    type: "number",
    minimum: 100,
    exclusiveMinimum: true,
  };

  const validateResult = validateNumber(100, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `minimum` and `exclusiveMinimum: true`, then valid.", () => {
  const schema: NumberSchema = {
    type: "number",
    minimum: 100,
    exclusiveMinimum: true,
  };

  const validateResult = validateNumber(100.1, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `minimum` and `exclusiveMinimum: true`, then invalid. (2)", () => {
  const schema: NumberSchema = {
    type: "number",
    minimum: 100,
    exclusiveMinimum: true,
  };

  const validateResult = validateNumber(99.9, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `exclusiveMinimum: number`, then invalid.", () => {
  const schema: NumberSchema = {
    type: "number",
    exclusiveMinimum: 100,
  };

  const validateResult = validateNumber(100, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `exclusiveMinimum: number`, then valid.", () => {
  const schema: NumberSchema = {
    type: "number",
    exclusiveMinimum: 100,
  };

  const validateResult = validateNumber(100.1, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `exclusiveMinimum: number`, then invalid. (2)", () => {
  const schema: NumberSchema = {
    type: "number",
    exclusiveMinimum: 100,
  };

  const validateResult = validateNumber(99.9, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `maximum`, then valid.", () => {
  const schema: NumberSchema = {
    type: "number",
    maximum: 100,
  };

  const validateResult = validateNumber(100, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `maximum`, then valid. (2)", () => {
  const schema: NumberSchema = {
    type: "number",
    maximum: 100,
  };

  const validateResult = validateNumber(99.9, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `maximum`, then invalid.", () => {
  const schema: NumberSchema = {
    type: "number",
    maximum: 100,
  };

  const validateResult = validateNumber(100.1, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `maximum` and `exclusiveMaximum: false`, then valid.", () => {
  const schema: NumberSchema = {
    type: "number",
    maximum: 100,
    exclusiveMaximum: false,
  };

  const validateResult = validateNumber(100, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `maximum` and `exclusiveMaximum: false`, then valid. (2)", () => {
  const schema: NumberSchema = {
    type: "number",
    maximum: 100,
    exclusiveMaximum: false,
  };

  const validateResult = validateNumber(99.9, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `maximum` and `exclusiveMaximum: false`, then invalid.", () => {
  const schema: NumberSchema = {
    type: "number",
    maximum: 100,
    exclusiveMaximum: false,
  };

  const validateResult = validateNumber(100.1, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `maximum` and `exclusiveMaximum: true`, then invalid.", () => {
  const schema: NumberSchema = {
    type: "number",
    maximum: 100,
    exclusiveMaximum: true,
  };

  const validateResult = validateNumber(100, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `maximum` and `exclusiveMaximum: true`, then valid.", () => {
  const schema: NumberSchema = {
    type: "number",
    maximum: 100,
    exclusiveMaximum: true,
  };

  const validateResult = validateNumber(99.9, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `maximum` and `exclusiveMaximum: true`, then invalid. (2)", () => {
  const schema: NumberSchema = {
    type: "number",
    maximum: 100,
    exclusiveMaximum: true,
  };

  const validateResult = validateNumber(100.1, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `exclusiveMaximum: number`, then invalid.", () => {
  const schema: NumberSchema = {
    type: "number",
    exclusiveMaximum: 100,
  };

  const validateResult = validateNumber(100, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});

Deno.test("When validate by `exclusiveMaximum: number`, then valid.", () => {
  const schema: NumberSchema = {
    type: "number",
    exclusiveMaximum: 100,
  };

  const validateResult = validateNumber(99.9, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, true);
  assertEquals(validateResult.invalidProperty, undefined);
  assertEquals(validateResult.invalidType, undefined);
});

Deno.test("When validate by `exclusiveMaximum: number`, then invalid. (2)", () => {
  const schema: NumberSchema = {
    type: "number",
    exclusiveMaximum: 100,
  };

  const validateResult = validateNumber(100.1, schema, ["p0", "p1"]);

  assertEquals(validateResult.isValid, false);
  assertEquals(validateResult.invalidProperty, ["p0", "p1"]);
  assertEquals(validateResult.invalidType, "NUMBER_OUT_OF_RANGE");
});
