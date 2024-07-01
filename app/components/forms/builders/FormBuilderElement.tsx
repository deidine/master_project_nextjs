import React, { useState, useEffect, useRef } from "react";
import { Button, Tooltip, Select, Input } from "antd";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

import {
  MoreOutlined,
  TagOutlined,
  LeftCircleFilled,
  EditOutlined,
} from "@ant-design/icons";
import type { InputRef } from "antd";
const { Option } = Select;

const FormBuilderElement = ({
  name,
  label,
  placeholder,
  type,
  deleteIndex,
  index,
  preview,
  minLength,
  maxLength,
  disabled,
  min,
  max,
  register,
  style,
  required,
  isPassWordRequired,
  setLabel,
  pattern,
  openSideBar,
}: InputProps & {
  isPassWordRequired?: (value: boolean) => void;
  setLabel?: (value: string) => void;
  deleteIndex: (index: number) => void;
  openSideBar?: (isOpen: boolean) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [elementValue, setElementValue] = useState(label);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [inputType, setInputType] = useState(type);
  const [showPatternSelect, setShowPatternSelect] = useState(false);
  const [showTypeSelect, setShowTypeSelect] = useState(false);

  const editButtonRef = useRef<HTMLDivElement>(null);
  const patternSelectWrapperRef = useRef(null);
  const typeSelectWrapperRef = useRef(null);

  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (
  //       editButtonRef.current &&
  //       !editButtonRef.current.contains(event.target as Node) ||
  //       !patternSelectWrapperRef.current ||
  //       !typeSelectWrapperRef.current
  //     ) {
  //       setIsEditing(false);
  //     }
  //   };

  //   window.addEventListener("mousedown", handleOutsideClick);

  //   return () => {
  //     window.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          onClick={() => {
            deleteIndex(index);
          }}
        >
          {" "}
          delete item
        </button>
      ),
    },
    {
      key: "2",
      label: <button onClick={() => alert("deidine")}> 1st menu item</button>,
    },
    {
      key: "3",
      label: <button onClick={() => alert("deidine")}> 1st menu item</button>,
    },
  ];

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElementValue(e.target.value);
    setLabel && setLabel(e.target.value);
  };

  const handlePatternChange = (value: string[]) => {
    setSelectedPatterns(value);
    if (value.length === 0) {
      setShowPatternSelect(false);
    }
  };

  const handleTypeChange = (value: string) => {
    setInputType(value);
    if (!value) {
      setShowTypeSelect(false);
    }
  };
  const patternOptions: patternType[] = [
    { value: "required", label: required },
    { value: "maxLength", label: maxLength },
    { value: "minLength", label: minLength },
    { value: "disabled", label: disabled },
    { value: "min", label: min },
    { value: "max", label: max },
  ];

  const inputTypeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
  ];

  return (
    <div
      key={index}
      ref={editButtonRef}
      className={` ${
        isEditing ? "" : "hover:bg-slate-200"
      } flex flex-col relative justify-between w-full 
      p-4 mb-2  border rounded shadow-sm group`}
    >
      <div className="flex flex-col">
        {isEditing ? (
          <input
            className="font-semibold mb-2 outline-none"
            value={elementValue}
            onChange={handleLabelChange}
          />
        ) : (
          <>
            <span className="font-semibold mb-2">{label}</span>
            <div className="flex space-x-2 flex-row">
              {" "}
              <Button size="small">{type}</Button>
              <Button size="small">{pattern}</Button>
            </div>
          </>
        )}
        <div className="absolute right-4 flex space-x-2 opacity-0 group-hover:opacity-100">
          <Tooltip title="Edit Label">
            <Button
              icon={<EditOutlined />}
              onClick={() => setIsEditing(!isEditing)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="More option">
            <Dropdown
              menu={{ items }}
              placement="bottom"
              trigger={["click"]}
              className="opacity-0 group-hover:opacity-100"
            >
              <Button icon={<MoreOutlined />} size="small" />
            </Dropdown>
          </Tooltip>
        </div>
        {isEditing && (
          <>
            <div className="w-full mb-1">
              <span className="block text-sm p-1 cursor-pointer hover:bg-slate-200 hover:rounded">
                {showTypeSelect ? (
                  <div className="w-auto h-auto">
                    <Select
                      ref={typeSelectWrapperRef}
                      style={{ width: "100%" }}
                      value={inputType}
                      onChange={handleTypeChange}
                      placeholder="Select input type"
                    >
                      {inputTypeOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <Button
                    icon={<LeftCircleFilled />}
                    size="small"
                    onClick={() => setShowTypeSelect(true)}
                  >
                    Input Type
                  </Button>
                )}
              </span>
            </div>

            <div className="w-full mb-1">
              <span className="block text-sm p-1 cursor-pointer hover:bg-slate-200 hover:rounded">
                {showPatternSelect ? (
                  <div>
                    <Select
                      ref={patternSelectWrapperRef}
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Select patterns"
                      value={selectedPatterns}
                      onChange={handlePatternChange}
                    >
                      {patternOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <Button
                    icon={<TagOutlined />}
                    size="small"
                    onClick={() => setShowPatternSelect(true)}
                  >
                    Pattern
                  </Button>
                )}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormBuilderElement;
