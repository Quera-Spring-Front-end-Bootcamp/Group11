import { createSlice } from '@reduxjs/toolkit';
import { Comment, Task, User } from '../../../../util/types';

export interface EditTaskModalSliceTypes {
  open: boolean;
  taskTitle: string;
  taskDescription: string;
  taskId: string;
  taskDeadLine: string;
  boardId: string;
  comment: Comment[];
  projectId: string;
  projectMemberData: User[];
  label: string;
  taskTags: any[];
  taskAssigns: User[];
}

export const EditTaskModalSlice = createSlice({
  name: 'EditTaskModalSlice',
  initialState: {
    open: false,
    taskTitle: '',
    taskDescription: '',
    taskId: '',
    taskDeadLine: '',
    boardId: '',
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
          taskDetail: Task;
        };
      }
    ) => {
      const { taskDetail } = action.payload;
      state.taskId = taskDetail._id;
      state.taskTitle = taskDetail.name;
      state.taskDescription = taskDetail.description;
      state.boardId = taskDetail.board;
      state.comment = taskDetail.comments;
      state.label = taskDetail.label;
      state.taskAssigns = taskDetail.taskAssigns;
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
          projectMemberData: User[];
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
          newComment: Comment;
          prevComments: Comment[];
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
          prevComments: Comment[];
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
    addTaskAssigns: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          newAssignee: User;
          prevData: User[];
        };
      }
    ) => {
      const { newAssignee, prevData } = action.payload;
      state.taskAssigns = [...prevData, newAssignee];
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
