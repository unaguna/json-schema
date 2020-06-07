import { Schema, isObjectSchema, ObjectSchema } from "../schema.ts";
import validate, { ValidationResult } from "../validate.ts";

export default function validateObject(
  element: object,
  schema: Schema,
  path: Array<string | number>,
): ValidationResult {
  // check type
  if (isObjectSchema(schema)) {
    return validateMain(element, schema, path);
  } else {
    // Fails when schema.type contains "object".
    return {
      isValid: false,
      invalidProperty: path,
      invalidType: "TYPE_MISMATCH",
    };
  }
}

function validateMain(
  element: object,
  schema: ObjectSchema,
  path: Array<string | number>,
): ValidationResult {
  // validate each child elements
  const validateChildrenResult = validateEachChild(element, schema, path);
  if (validateChildrenResult) return validateChildrenResult;

  // element is valid when passes checklist.
  return {
    isValid: true,
  };
}

/**
 * オブジェクトの各プロパティを validate する。
 * 
 * オブジェクト `element` が持つ各プロパティについてのみ validate をし、
 * `element` が持たないプロパティについては `shcema` に何らかの記載があっても
 * validate を行わない。
 * 
 * @param element validate 対象のプロパティを持つ親オブジェクト
 * @param schema 親オブジェクトについてのスキーマ
 * @param path 親オブジェクトのパス
 * 
 * @return プロパティの validate で不正があった場合はその結果。不正がない場合は `undefined`。
 */
function validateEachChild(
  element: object,
  schema: ObjectSchema,
  path: Array<string | number>,
): ValidationResult | undefined {
  // validate each child elements
  let key: string = "";
  let childResult: ValidationResult | undefined;
  for (key of Object.keys(element)) {
    const value = (element as any)[key];
    const childSchema = schema.properties?.[key];

    // パラメータ `key` のスキーマがスキーマ `shcema` に定義されている場合は validate
    if (childSchema !== undefined) {
      childResult = validate(value, childSchema, [...path, key]);

      if (childResult.isValid === false) {
        break;
      }
    }
  }

  // when some child element is invalid, return
  if (childResult !== undefined) {
    return childResult;
  }

  return undefined;
}
