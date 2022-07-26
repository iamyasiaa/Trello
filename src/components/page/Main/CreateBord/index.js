import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Modal, Input } from "../../../ui";
import { addNewItemBoard } from "../../../../ducks/mainRedux";

import "./style.scss";

export default function CreateBord() {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const createBoard = () => {
    if (!name) {
      alert("Enter the title!");
    } else {
      dispatch(addNewItemBoard(name));
      setName("");
      setModal(false);
    }
  };

  const handleChange = (ev) => {
    const { value } = ev.target;

    setName(value);
  };

  const onOpen = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
    setName("");
  };

  return (
    <div className="create-board">
      <Button onClick={onOpen}>CREATE</Button>
      {modal && (
        <Modal active={modal} onClose={onClose}>
          <div className="modal-board">
            <div className="modal-board__title">Creating a board</div>
            <div className="modal-board__input">
              <Input
                handleChange={handleChange}
                placeholder="Enter the title"
                text="Board name"
                value={name}
              />
            </div>
            <div className="modal-board__buttons">
              <Button onClick={createBoard}>CREATE</Button>
              <Button onClick={onClose}>BACK</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
