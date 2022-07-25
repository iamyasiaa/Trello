import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getListBoard,
  remoteItemBoard,
  dragBoard,
} from "../../../../ducks/mainRedux";

import "./style.scss";

export default function ListBord() {
  const dispatch = useDispatch();
  const listBoard = useSelector(getListBoard);
  const navigate = useNavigate();
  const [currentBoard, setCurrentBoard] = useState();

  const onClickRemoteBoard = (ev, id) => {
    ev.stopPropagation();
    dispatch(remoteItemBoard(id));
  };

  const onClickBoard = (id) => {
    navigate(`/${id}`);
  };

  function dragOverHandler(ev) {
    ev.preventDefault();
  }

  function dragLeaveHandler(ev) {}

  function dragEndHandler(ev) {}

  function dragOverStart(ev, item) {
    setCurrentBoard(item);
  }

  function dragHandler(ev, item) {
    ev.preventDefault();

    const newArrayBoard = listBoard.map((i) => {
      if (i.id === item.id) {
        return {
          ...currentBoard,
        };
      }

      if (i.id === currentBoard.id) {
        return {
          ...item,
        };
      }

      return i;
    });

    dispatch(dragBoard(newArrayBoard));
  }

  return (
    <div>
      <div className="listBoardName">
        {listBoard?.length ? "List Board" : "No List Board"}
      </div>
      <div className="boxForListBoard">
        {listBoard?.map((item) => (
          <div
            className="board"
            onClick={() => onClickBoard(item.id)}
            key={item.id}
            onDragStart={(event) => dragOverStart(event, item)}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDragEnd={dragEndHandler}
            onDrop={(event) => dragHandler(event, item)}
            draggable={true}
          >
            <div className="boardName">{item?.name}</div>
            <div
              className="boardIcon"
              onClick={(ev) => onClickRemoteBoard(ev, item.id)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
