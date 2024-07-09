import React from "react";
interface CategoryFormProps {
  value: string;
  setName: (value: string) => void;
  handleSubmit: () => void;
}
export const CategoryForm: React.FC<CategoryFormProps> = ({
  value,
  setName,
  handleSubmit,
}) => {
  return (
    <div className="m-6 ">
      <input
        type="text"
        placeholder="write category name"
        className="border-2"
        value={value}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <button
        className="m-4 bg-blue-400 w-16 rounded-md"
        onClick={() => {
          handleSubmit();
          setName("");
        }}
      >
        submit
      </button>
    </div>
  );
};
