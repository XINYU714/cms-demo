export type ValidationResult = string | boolean;
export type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>);

export interface FormProps {
  label?: string,
  isRequired?: boolean,
  isDisabled?: boolean,
  isReadOnly?: boolean,
  type?: string,
  ruleList?: ValidationRule[],
}