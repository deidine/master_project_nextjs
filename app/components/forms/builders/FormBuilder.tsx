import React, { useEffect, useState } from "react";
import { Button, Modal, Select } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import FormBuilderElement from "./FormBuilderElement";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

export default function FormBuilder({
  allElements,
  addNewElement,
  setSubmitBtn,
  submitBtn,
}: {
  allElements: FormElement[];
  addNewElement: (elem: FormElement[]) => void;
  setSubmitBtn: (value: string) => void;
  submitBtn: string;
}) {
  const [elements, setElements] = useState<FormElement[]>(allElements);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("text");

  useEffect(() => {
    setElements(allElements);
  }, [allElements]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    addElement(selectedType);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addElement = (type: string) => {
    const newUUID: string = uuidv4();
    const newElement = {
      elementType: {
        type,
        label: "Label",
        name: newUUID,
        placeholder: "Enter your data",
        value: "",
        required: true,
        pattern: "",
        style: `h-10 text-sm focus-visible:outline-none focus-visible:ring-2
           focus-visible:bg-white border-zinc-200 duration-100 placeholder:text-zinc-400 ring-2 
           ring-transparent focus:bg-white focus-visible:ring-indigo-400 shadow-sm py-2 px-3 w-full
            rounded-lg border`,
      },
    };
    setElements((prev) => [...prev, newElement]);
    addNewElement([...elements, newElement]);
  };

  const handleDeleteInput = (index: number) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
    addNewElement(updatedElements);
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setElements(items);
    addNewElement(items);
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
                    key={element.elementType.name}
                    draggableId={"" + index}
                    isDragDisabled={false}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center justify-center group"
                      >
                        <FormBuilderElement
                          key={element.elementType.name}
                          index={index}
                          preview={false}
                          setLabel={(value: string) => {
                            const updatedElements = [...elements];
                            updatedElements[index].elementType.label = value;
                            addNewElement(updatedElements);
                          }}
                          setType={(value: string) => {
                            const updatedElements = [...elements];
                            updatedElements[index].elementType.type = value;
                            addNewElement(updatedElements);
                          }}
                          setPattern={(values: string[]) => {
                            const updatedElements = [...elements];
                            values.forEach((vlu) => {
                              updatedElements[index].elementType.pattern = vlu;
                            });
                            addNewElement(updatedElements);
                          }}
                          type={element.elementType.type}
                          name={element.elementType.name}
                          placeholder={element.elementType.placeholder}
                          label={element.elementType.label}
                          deleteIndex={handleDeleteInput}
                        />
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
          <Button
            className="h-auto font-bold py-2 px-4 w-full"
            onClick={showModal}
          >
            + Insert Element
          </Button>
        </div>
      </div>

      {/* Modal for selecting input type */}
      <Modal
        title="Select Input Type"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          defaultValue="text"
          onChange={setSelectedType}
          className="w-full"
        >
          <Option value="text">Text</Option>
          <Option value="number">Number</Option>
          <Option value="email">Email</Option>
          <Option value="password">Password</Option>
          <Option value="textarea">Textarea</Option>
          {/* Add more options as needed */}
        </Select>
      </Modal>
    </>
  );
}
