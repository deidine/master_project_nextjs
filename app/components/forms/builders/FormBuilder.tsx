import React, { useEffect, useState } from "react";
import { Button, Modal, Select } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import InputElement from "../formElements/InputElement";
import SelectElement from "../formElements/SelectElement";
import useDesigner from "../../hooks/useDesigner";
import { idGenerator } from "@/utils/idGenerator";
import { nameGenerator } from "@/utils/nameGenerator";

const { Option } = Select;

export default function FormBuilder() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("text");
  const { elements, addElement, setElements, submitBtn, setSubmitBtn } = useDesigner();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newElement: FormElement = {
      elementType: {
        type: selectedType,
        label: "Label",
        name: nameGenerator(),
        placeholder: "Enter your data",
        value: "",
        required: true,
        pattern: [],
        style: `h-10 text-sm focus-visible:outline-none focus-visible:ring-2
           focus-visible:bg-white border-zinc-200 duration-100 placeholder:text-zinc-400 ring-2 
           ring-transparent focus:bg-white focus-visible:ring-indigo-400 shadow-sm py-2 px-3 w-full
            rounded-lg border`,
        ...(selectedType === "select" && { options: ["Option 1", "Option 2"] }),
      },
      id: idGenerator(),
    };
    addElement(elements.length, newElement);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setElements(items);
  };

  return (
    <>
      <div className="max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="data" type="COLUMN" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {elements.map((element, index) => (
                  <Draggable
                    key={index}
                    draggableId={"" + index}
                    isDragDisabled={false}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        key={element.elementType.name}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center justify-center group"
                      >
                        {element.elementType.type === "select" ? (
                          <SelectElement
                            index={index}
                            element={element.elementType as SelectElement}
                            setElement={(value: SelectElement) => {
                              const updatedElements = [...elements];
                              updatedElements[index].elementType = value;
                            }}
                          />
                        ) : (
                          <InputElement
                            index={index}
                            element={element.elementType as InputElement}
                            setElement={(value: InputElement) => {
                              const updatedElements = [...elements];
                              updatedElements[index].elementType = value;
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="flex justify-center pt-6">
            <Button className="h-10 font-bold py-2 px-4 w-1/2">
              <input
                type="text"
                className="outline-none bg-transparent w-full text-center"
                value={submitBtn}
                onChange={(e) => setSubmitBtn(e.target.value)}
              />
            </Button>
          </div>
        </DragDropContext>
      </div>
      <div className="pt-[4.5rem]"></div>
      <div className="shadow-sm w-1/2 h-auto border-2 ml-4 mt-2 rounded-lg">
        <div className="flex justify-center">
          <Button className="h-auto font-bold py-2 px-4 w-full" onClick={showModal}>
            + Insert Element
          </Button>
        </div>
      </div>

      {/* Modal for selecting input type */}
      <Modal title="Select Input Type" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Select defaultValue="text" onChange={setSelectedType} className="w-full">
          <Option value="text">Text</Option>
          <Option value="number">Number</Option>
          <Option value="email">Email</Option>
          <Option value="password">Password</Option>
          <Option value="textarea">Textarea</Option>
          <Option value="select">Select</Option>
          {/* Add more options as needed */}
        </Select>
      </Modal>
    </>
  );
}
