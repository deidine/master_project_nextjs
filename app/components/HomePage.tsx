"use client";
import React, { useState } from "react";
import FormBuilder from "./forms/builders/FormBuilder";
import PreviewForm from "./forms/previews/PreviewForm";

export default function HomePage() {
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [elements, setElements] = useState<FormElement[]>([]);
  const [preview, setPreview] = useState(false);

  return (
    <>
      {" "}
      <div className="  flex flex-col justify-center items-center">
        <div
          className=" inline-flex gap-x-3  p-1 text-zinc-500 dark:bg-zinc-800
         dark:text-zinc-400 
        rounded-lg text-sm bg-zinc-50
         justify-center items-center   outline border w-1/2 h-20  "
        >
          <button
            onClick={() => {
              setPreview(true);
            }}
            className={`btn2 border border-zinc-200   hover:bg-zinc-900/90   hover:text-white   h-9 px-3 rounded-lg text-zinc-800  ${
              !preview
                ? "bg-zinc-100 text-zinc-800"
                : "bg-white text-black font-semibold"
            }`}
          >
            Preview
          </button>
          <button
            className={`btn2 hover:bg-zinc-900/90 h-9 px-3 rounded-lg border    hover:text-white ${
              preview
                ? "bg-zinc-100 text-zinc-800"
                : "bg-white text-black font-semibold"
            }`}
            onClick={() => {
              setPreview(false);
            }}
          >
            Edit
          </button>
        </div>
        {preview ? (
          <PreviewForm elements={elements} submitBtn={submitBtn} />
        ) : (
          <FormBuilder
            allElements={elements}
            addNewElement={(elem: FormElement[]) => setElements(elem)}
            setSubmitBtn={(value: string) => setSubmitBtn(value)}
            submitBtn={submitBtn}
          />
        )}
      </div>
    </>
  );
}
