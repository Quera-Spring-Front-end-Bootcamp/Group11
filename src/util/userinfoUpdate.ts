import userSlice from '../redux/slices/UserSlice/UserSlice';
import store from '../redux/store';
import jwt from 'jwt-decode';
import { getUserApi } from '../services/userApi';
import { workspaceObj } from './types';
import { getAllWorkspacesApi } from '../services/workspaceApi';

function dispatchUserInfo(
  id: string,
  username: string,
  email: string,
  firstname: string,
  lastname: string,
  allWorkspaces: Array<workspaceObj>,
  phone: string,
  settings: Array<string>,
  profile_url: string
) {
  store.dispatch(
    userSlice.actions.setUserInfoByRequest({
      email,
      id,
      username,
      firstname,
      lastname,
      phone,
      settings,
      profile_url,
    })
  );
  store.dispatch(
    userSlice.actions.setWorkspaces({
      allWorkspaces,
    })
  );
}

const userUpdateByToken = async (token: string) => {
  const { id } = jwt(token) as { id: string };

  const {
    data: { data: userData },
  } = await getUserApi(id);

  const {
    data: { data: wsData },
  } = await getAllWorkspacesApi();

  const {
    email,
    profile_url,
    username,
    workspaceMember,
    firstname,
    lastname,
    phone,
    settings,
  } = userData;

  const allWorkspaces = [
    ...wsData,
    ...workspaceMember.map((ws: { workspace: workspaceObj }) => ws.workspace),
  ].filter((ws: workspaceObj) => ws !== null && ws !== undefined);

  dispatchUserInfo(
    id,
    username,
    email,
    firstname,
    lastname,
    allWorkspaces,
    phone,
    settings,
    profile_url
  );
};

export default userUpdateByToken;
