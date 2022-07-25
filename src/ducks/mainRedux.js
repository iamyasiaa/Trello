import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

//SLICE//

const mainRedux = createSlice({
  name: "mainRedux",
  initialState: {
    listBoard: [],
  },
  reducers: {
    addNewItemBoard(state, data) {
      state.listBoard = [
        ...state.listBoard,
        { name: data.payload, list: [], id: uuidv4() },
      ];
    },
    dragBoard(state, data) {
      state.listBoard = data.payload;
    },
    dragList(state, data) {
      state.listBoard = state.listBoard.map((item) => {
        if (item.id === data.payload.id) {
          return {
            ...data.payload,
          };
        }

        return item;
      });
    },
    remoteItemBoard(state, data) {
      state.listBoard = [...state.listBoard]
        .map((item) => item.id !== data.payload && item)
        .filter((item) => item);
    },
    deleteListBoard(state, data) {
      let newArray = state.listBoard;
      const { idBoard, idList } = data.payload;

      newArray = newArray.map((item) => {
        if (item.id === idBoard) {
          item = {
            ...item,
            list: item.list
              .map((el) => {
                if (el.id !== idList) {
                  return el;
                }
              })
              .filter((el) => el),
          };
        }

        return item;
      });

      state.listBoard = newArray;
    },
    addTaskList(state, data) {
      let newArray = state.listBoard;
      const { idBoard, idList, name } = data.payload;

      newArray = newArray?.map((item) => {
        if (item.id === idBoard) {
          item = {
            ...item,
            list: item?.list?.map((el) => {
              if (el.id === idList) {
                return {
                  ...el,
                  tasks: [...el?.tasks, { name, id: uuidv4(), isActive: true }],
                };
              }

              return el;
            }),
          };
        }

        return item;
      });

      state.listBoard = newArray;
    },
    addNewBoardList(state, data) {
      let newArray = state.listBoard;
      const { name, id } = data.payload;

      newArray = newArray.map((item) => {
        if (item.id === id) {
          item = {
            ...item,
            list: [...item.list, { name, id: uuidv4(), tasks: [] }],
          };
        }

        return item;
      });

      state.listBoard = newArray;
    },
    checkTask(state, data) {
      let newArray = state.listBoard;
      const { idBoard, idList, idTask } = data.payload;

      newArray = newArray.map((item) => {
        if (item.id === idBoard) {
          return {
            ...item,
            list: item.list.map((el) => {
              if (el.id === idList) {
                return {
                  ...el,
                  tasks: el.tasks.map((el2) => {
                    if (el2.id === idTask) {
                      return {
                        ...el2,
                        isActive: !el2.isActive,
                      };
                    }

                    return el2;
                  }),
                };
              }
              return el;
            }),
          };
        }

        return item;
      });

      state.listBoard = newArray;
    },
    deleteTask(state, data) {
      let newArray = state.listBoard;
      const { idBoard, idList, idTask } = data.payload;

      newArray = newArray.map((item) => {
        if (item.id === idBoard) {
          return {
            ...item,
            list: item.list.map((el) => {
              if (el.id === idList) {
                return {
                  ...el,
                  tasks: el.tasks
                    .map((el2) => {
                      if (el2.id !== idTask) {
                        return el2;
                      }
                    })
                    .filter((el2) => el2),
                };
              }
              return el;
            }),
          };
        }

        return item;
      });

      state.listBoard = newArray;
    },
  },
});

//SELECTOR//

export const baseUserDataState = (state) => state.mainRedux;

export const getListBoard = createSelector(
  [baseUserDataState],
  (state) => state.listBoard
);

//EXPORT//

export default mainRedux.reducer;
export const {
  addNewItemBoard,
  remoteItemBoard,
  addNewBoardList,
  deleteListBoard,
  addTaskList,
  deleteTask,
  checkTask,
  dragBoard,
  dragList,
} = mainRedux.actions;
