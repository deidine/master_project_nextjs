import React, { useState, useRef } from "react";
import { Button, Tooltip, Select, Input } from "antd";

import { TagOutlined, LeftCircleFilled } from "@ant-design/icons";
import useDesigner from "../../hooks/useDesigner";
import OptionPopUp from "../OptionPopUp"; 
const { Option } = Select;

const InputElement = ({
  element,
  setElement,
  index,
}: {
  index: number;
  element: InputElement;

  setElement: (value: InputElement) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(
    element.pattern || []
  );

  const [isRequired, setIsRequired] = useState(element.required);
  const [inputType, setInputType] = useState(element.type);
  const [inputLabel, setInputLabel] = useState(element.label);
  const [showPatternSelect, setShowPatternSelect] = useState(false);
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const { removeElement } = useDesigner();

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

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLabel(e.target.value);
    setElement({ ...element, label: e.target.value });
  };

  const handlePatternChange = (value: string[]) => {
    setSelectedPatterns(value);
    setElement({ ...element, pattern: value });
    if (value.length === 0) {
      setShowPatternSelect(false);
    }
  };

  const handleTypeChange = (value: string) => {
    setInputType(value);
    setElement({ ...element, type: value });
    setShowTypeSelect(false);
  };

  const patternOptions = [
    // { value: "maxLength", label: `Max Length: ${element.maxLength}` },
    // { value: "minLength", label: `Min Length: ${element.minLength}` },

    { value: "required", label: element.required },
    { value: "norequired", label: element.required },
    // { value: "disabled", label: element.disabled ? "Disabled" : "Enabled" },
    // { value: "min", label: `Min: ${element.min}` },
    // { value: "max", label: `Max: ${element.max}` },
  ];

  const inputTypeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
    { value: "hidden", label: "Hidden" },
  ];

  return (
    <div
      key={index}
      ref={editButtonRef}
      className={`${
        isEditing ? "" : "hover:bg-slate-200"
      } flex flex-col relative justify-between w-full p-4 mb-2 border rounded shadow-sm group`}
    >
      <div className="flex flex-col">
        {isEditing ? (
          <input
            className="font-semibold mb-2 outline-none"
            value={inputLabel}
            onChange={handleLabelChange}
          />
        ) : (
          <>
            <span className="font-semibold mb-2">{inputLabel}</span>
            <div className="flex space-x-2 flex-row">
              <Button size="small">{element.type}</Button>
              <Button size="small">{selectedPatterns.join(", ")}</Button>
            </div>
          </>
        )}
        <OptionPopUp
          name={element.name}
          required={element.required}
          toggleRequired={function (): void {
            setElement({ ...element, required: !isRequired });
            setIsRequired(!isRequired);
          }}
          removeElement={function (name: string): void {
            removeElement(name);
          }}
          isEditingSate={isEditing}
          setIsEditingState={function (value: boolean): void {
            setIsEditing(value);
          }}
        />
        {isEditing && (
          <>
            <div className="w-full mb-1">
              {showTypeSelect ? (
                <Select
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
              ) : (
                <Button
                  icon={<LeftCircleFilled />}
                  size="small"
                  onClick={() => setShowTypeSelect(true)}
                >
                  Input Type
                </Button>
              )}
            </div>

            <div className="w-full mb-1">
              {showPatternSelect ? (
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
              ) : (
                <Button
                  icon={<TagOutlined />}
                  size="small"
                  onClick={() => setShowPatternSelect(true)}
                >
                  Pattern
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InputElement;
