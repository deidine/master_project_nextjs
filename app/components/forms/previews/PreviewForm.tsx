import React from "react";
import { Button, Form, Input } from "antd";

export default function PreviewForm({
  elements,
  submitBtn,
}: {
  elements: FormElement[];
  submitBtn: string;
}) {
  const onFinish = (values: FormData) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form
      onFinish={onFinish}
      className="max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4"
    >
      {elements.map((element) => (
        <>
          {element.elementType.type === "text" && (
            <div>
              <Form.Item
                key={element.elementType.name}
                label={element.elementType.label}
                name={element.elementType.name}
                rules={[
                  {
                    required: element.elementType.required,
                    message: "This field is required",
                  },
                ]}
              >
                <Input
                  type={element.elementType.type}
                  placeholder={element.elementType.placeholder}
                />
              </Form.Item>
            </div>
          )}
        </>
      ))}
      <div className="flex justify-center pt-6">
        <Button
          type="primary"
          htmlType="submit"
          className="h-10 font-bold py-2 px-4 w-1/2"
        >
          {submitBtn}
        </Button>
      </div>
    </Form>
  );
}
