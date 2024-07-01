"use client";
import React, { useState, useRef } from "react";
import { Button, Select, Input } from "antd";
import { TagOutlined, LeftCircleFilled } from "@ant-design/icons";
import useDesigner from "../hooks/useDesigner";

const { Option } = Select;

const ElementCard = ({
  elementType,
  elementLabel,
  elementPatterns,
  isEditingState,
  index, 
  setIsEditingState
}: {
  index: number;
  elementType: string;
  isEditingState: boolean;
  elementLabel: string;
  setIsEditingState: (value: boolean) => void;
  elementPatterns: string[]; 
}) => {
  const [inputType, setInputType] = useState(elementType);
  const [inputLabel, setInputLabel] = useState(elementLabel);
  const [showPatternSelect, setShowPatternSelect] = useState(false);
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(elementPatterns || []);
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const [isEditing, setIsEditing] = useState(isEditingState);

  const editButtonRef = useRef<HTMLDivElement>(null);
  const patternSelectWrapperRef = useRef(null);
  const typeSelectWrapperRef = useRef(null);

  const handlePatternChange = (value: string[]) => {
    setSelectedPatterns(value);
  };

  const handleTypeChange = (value: string) => {
    setInputType(value);
    setShowTypeSelect(false);
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLabel(e.target.value);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addNewOption = () => {
    if (newOption.trim() !== "") {
      const updatedOptions = [...options, newOption];
      setOptions(updatedOptions);
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const patternOptions = [
    { value: "required", label: "Required" },
    { value: "notRequired", label: "Not Required" },
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
              <Button size="small">{inputType}</Button>
              <Button size="small">{selectedPatterns.join(", ")}</Button>
            </div>
          </>
        )}
 
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

            <div className="w-full mb-1">
              {options.map((option, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    style={{ marginRight: "8px" }}
                  />
                  <Button onClick={() => removeOption(idx)}>Remove</Button>
                </div>
              ))}
              <Input
                placeholder="New option"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onPressEnter={addNewOption}
                style={{ marginBottom: "8px" }}
              />
              <Button onClick={addNewOption}>Add Option</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ElementCard;
