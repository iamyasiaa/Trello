import React, { useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Button, Input, Modal } from "../../../ui";
import {
  addNewBoardList,
  getListBoard,
  deleteListBoard,
  addTaskList,
  deleteTask,
  checkTask,
  dragList,
} from "../../../../ducks/mainRedux";

import "./style.scss";

export default function ListBord() {
  let location = useLocation();
  const id = location.pathname.slice(1);
  const [modalTask, setModalTask] = useState(false);
  const [modalList, setModalList] = useState(false);
  const [nameList, setNameList] = useState("");
  const [nameTask, setNameTask] = useState("");
  const [currentList, setCurrentList] = useState();
  const [currentTask, setCurrentTask] = useState({
    task: null,
    list: null,
  });
  const listBoard = useSelector(getListBoard);
  const currentBoard = listBoard
    .map((item) => item.id === id && item)
    .filter((item) => item)[0];
  const dispatch = useDispatch();

  const createList = () => {
    if (!nameList) {
      alert("Enter the list!");
    } else {
      dispatch(addNewBoardList({ name: nameList, id }));
      setNameList("");
      setModalList(false);
    }
  };

  const createTask = () => {
    if (!nameTask) {
      alert("Enter the task!");
    } else {
      dispatch(addTaskList({ name: nameTask, idBoard: id, idList: modalTask }));
      setNameTask("");
      setModalTask(false);
    }
  };

  const handleChangeList = (ev) => {
    const { value } = ev.target;

    setNameList(value);
  };

  const handleChangeTask = (ev) => {
    const { value } = ev.target;

    setNameTask(value);
  };

  const onOpenList = () => {
    setModalList(true);
  };

  const onCloseList = () => {
    setModalList(false);
    setNameList("");
  };

  const onOpenTask = (id) => {
    setModalTask(id);
  };

  const onCloseTask = () => {
    setModalTask(false);
    setNameTask("");
  };

  const onClickDeleteList = (idList) => {
    dispatch(deleteListBoard({ idBoard: id, idList }));
  };

  const onClickDeleteTask = (idList, idTask) => {
    dispatch(deleteTask({ idBoard: id, idList, idTask }));
  };

  const onClickCheckTask = (idList, idTask) => {
    dispatch(checkTask({ idBoard: id, idList, idTask }));
  };

  function dragOverHandler(ev) {
    ev.preventDefault();
  }

  function dragLeaveHandler(ev) {}

  function dragEndHandler(ev) {}

  function dragOverListStart(ev, item) {
    setCurrentList(item);
  }

  function dragListHandler(ev, item) {
    ev.preventDefault();

    const newArrayList = currentBoard.list.map((i) => {
      if (i.id === item.id) {
        return {
          ...currentList,
        };
      }

      if (i.id === currentList.id) {
        return {
          ...item,
        };
      }

      return i;
    });

    dispatch(
      dragList({
        ...currentBoard,
        list: newArrayList,
      })
    );
  }

  function dragOverTaskStart(ev, task, item) {
    setCurrentTask(
      Object.assign({}, currentTask, {
        task: task,
        list: item,
      })
    );
  }

  function dragTaskHandler(ev, task, item) {
    ev.preventDefault();
    ev.stopPropagation();
    let newArrayList;

    if (item.id === currentTask.list.id) {
      newArrayList = currentBoard.list.map((i) => {
        if (i.id === item.id) {
          return {
            ...i,
            tasks: i.tasks.map((e) => {
              if (e.id === task.id) {
                return {
                  ...currentTask.task,
                };
              }
              if (e.id === currentTask.task.id) {
                return {
                  ...task,
                };
              }

              return e;
            }),
          };
        }

        return i;
      });
    } else {
      newArrayList = currentBoard.list.map((i) => {
        if (i.id === item.id) {
          return {
            ...i,
            tasks: [currentTask.task, ...i.tasks],
          };
        }
        if (i.id === currentTask.list.id) {
          return {
            ...i,
            tasks: i.tasks
              .map((e) => {
                if (e.id !== currentTask.task.id) {
                  return e;
                }
              })
              .filter((e) => e),
          };
        }

        return i;
      });
    }

    dispatch(
      dragList({
        ...currentBoard,
        list: newArrayList,
      })
    );
  }

  return (
    <div>
      <div className="boardName">{currentBoard.name}</div>
      <div className="boxForList">
        {currentBoard.list.map((item) => (
          <div
            className="listBoard"
            key={item.id}
            onDragStart={(event) => dragOverListStart(event, item)}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDragEnd={dragEndHandler}
            onDrop={(event) => dragListHandler(event, item)}
            draggable={true}
          >
            <div className="listName">{item.name}</div>
            <div className="tasksArray">
              {item?.tasks?.map((el) => (
                <div
                  className={classNames(
                    "tasks",
                    el.isActive === false && "noActive"
                  )}
                  key={el.id}
                  onDragStart={(event) => dragOverTaskStart(event, el, item)}
                  onDragOver={dragOverHandler}
                  onDragLeave={dragLeaveHandler}
                  onDragEnd={dragEndHandler}
                  onDrop={(event) => dragTaskHandler(event, el, item)}
                  draggable={true}
                >
                  <div
                    className="deleteTask"
                    onClick={() => onClickDeleteTask(item.id, el.id)}
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
                        fill="mediumslateblue"
                      />
                    </svg>
                  </div>
                  <div
                    className="checkTask"
                    onClick={() => onClickCheckTask(item.id, el.id)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.7 7.1999C18.3 6.7999 17.7 6.7999 17.3 7.1999L9.8 14.6999L6.7 11.5999C6.3 11.1999 5.7 11.1999 5.3 11.5999C4.9 11.9999 4.9 12.5999 5.3 12.9999L9.1 16.7999C9.3 16.9999 9.5 17.0999 9.8 17.0999C10.1 17.0999 10.3 16.9999 10.5 16.7999L18.7 8.5999C19.1 8.1999 19.1 7.5999 18.7 7.1999Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {el?.name}
                </div>
              ))}
            </div>
            <div className="createTaskButton">
              <Button onClick={() => onOpenTask(item.id)}>CREATE</Button>
            </div>
            <div
              className="listIcon"
              onClick={() => onClickDeleteList(item.id)}
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
        <div className="createListButton">
          <Button onClick={onOpenList}>CREATE</Button>
        </div>
      </div>
      {modalList && (
        <Modal active={modalList} onClose={onCloseList}>
          <div className="createListModal">
            <div className="modalListTitle">Creating a list</div>
            <div className="modalListInput">
              <Input
                handleChange={handleChangeList}
                placeholder="Enter the title"
                text="List name"
                value={nameList}
              />
            </div>
            <div className="createListButton">
              <Button onClick={createList}>CREATE</Button>
              <Button onClick={onCloseList}>BACK</Button>
            </div>
          </div>
        </Modal>
      )}
      {modalTask && (
        <Modal active={modalTask} onClose={onCloseTask}>
          <div className="createListModal">
            <div className="modalListTitle">Creating a task</div>
            <div className="modalListInput">
              <Input
                handleChange={handleChangeTask}
                placeholder="Enter the task"
                text="Task name"
                value={nameTask}
              />
            </div>
            <div className="createListButton">
              <Button onClick={createTask}>CREATE</Button>
              <Button onClick={onCloseTask}>BACK</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
