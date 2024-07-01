type ReactHookFormProperties<T> =
  | {
      value: T;
      message: string;
    }
  | T;

type SelectElement = {
  type: "select";
  name: string;
  label: string;
  options: string[];
  value?: string;
  placeholder?: string;
  style?: string;
  required?: boolean;
  pattern?: string[];
};

type SelectOptions = {
  multiple?: boolean;
  disabled?: boolean;
};

type SelectProps = {
  index: number;
  preview: boolean;
  register?: any;
} & SelectElement & SelectOptions;
