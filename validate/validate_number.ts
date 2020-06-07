import { Schema, isNumberSchema, NumberSchema } from "../schema.ts";
import { ValidationResult } from "../validate.ts";

export default function validateNumber(
  element: number,
  schema: Schema,
  path: Array<string | number>,
): ValidationResult {
  // check type
  if (isNumberSchema(schema)) {
    return validateMain(element, schema);
  } else {
    // Fails when schema.type contains neither "number" nor "integer".
    return {
      isValid: false,
      invalidProperty: path,
      invalidType: "TYPE_MISMATCH",
    };
  }
}

function validateMain(element: number, schema: NumberSchema): ValidationResult {
  // element is valid when passes checklist.
  return {
    isValid: true,
  };
}
