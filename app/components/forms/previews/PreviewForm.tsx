import React from "react";
import { Button, Form, Input, Select } from "antd";
import useDesigner from "../../hooks/useDesigner";

export default function PreviewForm() {
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
  };

  const { elements, submitBtn } = useDesigner();

  return (
    <Form
      onFinish={onFinish}
      layout="vertical" // Set the layout to vertical
      className="max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4"
    >
      {elements.map((element) => (
        <div key={element.elementType.name}>
          {["text", "number", "email", "password", "textarea"].includes(element.elementType.type) && (
            <Form.Item
              label={element.elementType.label}
              name={element.elementType.name}
              style={{ marginBottom: "10px" }}
              rules={[
                {
                  required: element.elementType.required,
                  message: `${element.elementType.label} is required`,
                },
              ]}
            >
              {element.elementType.type === "textarea" ? (
                <Input.TextArea
                  style={{ padding: "8px" }}
                  placeholder={element.elementType.placeholder}
                />
              ) : (
                <Input
                  style={{ padding: "8px" }}
                  type={element.elementType.type}
                  placeholder={element.elementType.placeholder}
                />
              )}
            </Form.Item>
          )}

          {element.elementType.type === "select" && (
            <Form.Item
              label={element.elementType.label}
              name={element.elementType.name}
              style={{ marginBottom: "10px" }}
              rules={[
                {
                  required: element.elementType.required,
                  message: `${element.elementType.label} is required`,
                },
              ]}
            >
              <Select placeholder={element.elementType.placeholder} style={{ width: "100%" }}>
                {element.elementType.options.map((option, index) => (
                  <Select.Option key={index} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </div>
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
