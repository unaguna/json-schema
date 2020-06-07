import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { NumberSchema, ObjectSchema } from "../schema.ts";
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
