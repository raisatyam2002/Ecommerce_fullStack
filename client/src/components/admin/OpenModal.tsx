import React, { useState } from "react";
import { Button, Modal } from "antd";
interface AppProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  updatedName: string;
  setUpdatedName: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: (id: string) => void;
}

export const App: React.FC<AppProps> = ({
  isModalOpen,
  setIsModalOpen,
  id,
  updatedName,
  setUpdatedName,
  handleUpdate,
}) => {
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="m-6 ">
          <input
            type="text"
            placeholder="write category name"
            className="border-2"
            value={updatedName}
            onChange={(e) => {
              setUpdatedName(e.target.value);
            }}
          ></input>
          <button
            className="m-4 bg-blue-400 w-16 rounded-md"
            onClick={() => {
              handleUpdate(id);
              setUpdatedName("");
            }}
          >
            submit
          </button>
        </div>
      </Modal>
    </>
  );
};
