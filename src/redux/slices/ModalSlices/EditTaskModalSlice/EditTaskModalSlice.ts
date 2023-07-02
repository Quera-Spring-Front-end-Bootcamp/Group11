import { createSlice } from '@reduxjs/toolkit';

export interface EditTaskModalSliceTypes {
  open: boolean;
  taskTitle: string;
  taskDescription: string;
  taskId: string;
  taskDeadLine: string;
  board: string;
  comment: object[];
  projectId: string;
  projectMemberData: object[];
  label: string;
  taskTags: object[];
  taskAssigns: object[];
}

export const EditTaskModalSlice = createSlice({
  name: 'EditTaskModalSlice',
  initialState: {
    open: false,
    taskTitle: '',
    taskDescription: '',
    taskId: '',
    taskDeadLine: '',
    board: '',
    label: '',
    taskTags: [],
    taskAssigns: [],
    comment: [],
    projectId: '',
    projectMemberData: [],
  },
  reducers: {
    onOpen: (state: EditTaskModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: EditTaskModalSliceTypes) => {
      state.open = false;
    },
    setTaskDetail: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          taskObject: any;
        };
      }
    ) => {
      const {
        payload: { taskObject },
      } = action;
      state.taskId = taskObject._id;
      state.taskTitle = taskObject.name;
      state.taskDescription = taskObject.description;
      state.board = taskObject.board;
      state.comment = taskObject.comments;
      state.label = taskObject.label;
      state.taskAssigns = taskObject.taskAssigns;
    },
    setTaskDeadLine: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          datePersian: string;
        };
      }
    ) => {
      const {
        payload: { datePersian },
      } = action;
      state.taskDeadLine = datePersian;
    },
    setProjectId: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          projectId: string;
        };
      }
    ) => {
      const {
        payload: { projectId },
      } = action;
      state.projectId = projectId;
    },
    setProjectMemberData: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          projectMemberData: object[];
        };
      }
    ) => {
      const {
        payload: { projectMemberData },
      } = action;
      state.projectMemberData = projectMemberData;
    },
    setTaskTags: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          taskTags: object[];
        };
      }
    ) => {
      const {
        payload: { taskTags },
      } = action;
      state.taskTags = taskTags;
    },
    addComment: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          newComment: object;
          prevComments: object[];
        };
      }
    ) => {
      const {
        payload: { newComment, prevComments },
      } = action;
      state.comment = [...prevComments, newComment];
    },
    deleteComment: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          commentId: string;
          prevComments: object[];
        };
      }
    ) => {
      const {
        payload: { commentId, prevComments },
      } = action;
      state.comment = prevComments.filter(
        (item: any) => item._id !== commentId
      );
    },
    addTag: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          newTag: object;
          prevTags: object[];
        };
      }
    ) => {
      const {
        payload: { newTag, prevTags },
      } = action;
      state.taskTags = [...prevTags, newTag];
    },
    deleteTag: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          tagName: string;
          prevTags: object[];
        };
      }
    ) => {
      const {
        payload: { tagName, prevTags },
      } = action;
      state.taskTags = prevTags.filter((item: any) => item.tagName !== tagName);
    },
    setTaskAssigns: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          taskAssigns: object[];
        };
      }
    ) => {
      const {
        payload: { taskAssigns },
      } = action;
      state.taskAssigns = taskAssigns;
    },
  },
});

export const {
  onOpen,
  onClose,
  setTaskDetail,
  setTaskDeadLine,
  setProjectMemberData,
  setProjectId,
  setTaskTags,
  addComment,
  addTag,
  deleteTag,
} = EditTaskModalSlice.actions;

export default EditTaskModalSlice;
