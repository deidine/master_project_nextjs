type ReactHookFormProperties<T> =
  | {
      value: T;
      message: string;
    }
  | T;

type InputElement = {
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  label: string;
  style?: string;
  required?: boolean;
  pattern?: string[] ;
};

type InputOptions = {
  isPasswordConfirm?: boolean;
  minLength?: ReactHookFormProperties<number>;
  maxLength?: ReactHookFormProperties<number>;
  pattern?: string;
  // pattern?: ReactHookFormProperties<string>;
  min?: ReactHookFormProperties<number>;
  max?: ReactHookFormProperties<number>;
  disabled?: boolean;
};

type InputProps = {
  index: number;
  preview: boolean;
  register?: any;
  
} & InputElement & InputOptions;
