type FormElement = {
 id:string;
    elementType: InputElement | SelectElement;
  };
 
  type patternType = { value: string; label: any };
  
// export type FormData = (FormInput | FormSelect | FormTextArea)[];

// export type FormProps = {
//   children?: ReactNode;
//   data: FormData;
//   title?: string;
//   className?: string;
// };