import { ValidationOptions } from '../ValidationOptions';
import { buildMessage, ValidateBy } from '../common/ValidateBy';

export const IS_ENUM = 'isEnum';

/**
 * Checks if a given value is an enum
 */
export function isEnum(value: unknown, entity: any): boolean {
  const enumValues = Object.keys(entity).map(k => entity[k]);
  return enumValues.indexOf(value) >= 0;
}

/**
 * Returns an array of all the possible values for a given enum
 */
export function validEnumValues(entity: any): any[] {
  return Object.entries(entity)
    .filter(entry => !parseInt(entry[0]))
    .map(entry => entry[1]);
}

/**
 * Checks if a given value is an enum
 */
export function IsEnum(entity: object, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_ENUM,
      constraints: [entity],
      validator: {
        validate: (value, args): boolean => isEnum(value, args.constraints[0]),
        defaultMessage: buildMessage(
          eachPrefix =>
            eachPrefix + '$property must be a valid enum value. Valid values: ' + validEnumValues(entity).join(', '),
          validationOptions
        ),
      },
    },
    validationOptions
  );
}
