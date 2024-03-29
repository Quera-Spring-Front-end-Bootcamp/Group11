import { createSlice } from '@reduxjs/toolkit';
import { Comment, Member, Tag, Task, User } from '../../../../util/types';

export interface EditTaskModalSliceTypes {
  open: boolean;
  taskTitle: string;
  taskDescription: string;
  taskId: string;
  taskDeadLine: string;
  boardId: string;
  comment: Comment[];
  projectId: string;
  projectMemberData: Member[];
  label: string;
  taskTags: Tag[];
  taskAssigns: User[];
  fetchTagTrigger: number;
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
    fetchTagTrigger: 0,
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
          projectMemberData: Member[];
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
          taskTags: Tag[];
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
      state.comment = prevComments.filter((item) => item._id !== commentId);
    },
    addTag: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          newTag: Tag;
          prevTags: Tag[];
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
          prevTags: Tag[];
        };
      }
    ) => {
      const {
        payload: { tagName, prevTags },
      } = action;
      state.taskTags = prevTags.filter((item) => item.tagName !== tagName);
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
    deleteTaskAssigns: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          deleteAssigneeId: string;
          prevData: User[];
        };
      }
    ) => {
      const { deleteAssigneeId, prevData } = action.payload;
      state.taskAssigns = prevData.filter(
        (item) => item._id !== deleteAssigneeId
      );
    },
    setFetchTagTrigger: (
      state: EditTaskModalSliceTypes,
      action: {
        payload: {
          fetchTagTrigger: number;
        };
      }
    ) => {
      const { fetchTagTrigger } = action.payload;
      state.fetchTagTrigger = fetchTagTrigger;
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
  deleteTaskAssigns,
  addTaskAssigns,
  addTag,
  deleteTag,
} = EditTaskModalSlice.actions;

export default EditTaskModalSlice;
