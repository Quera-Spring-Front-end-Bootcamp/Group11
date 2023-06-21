import userSlice from '../redux/slices/UserSlice/UserSlice';
import store from '../redux/store';
import jwt from 'jwt-decode';
import { getUserApi } from '../services/userApi';
import { workspaceObj } from './types';

function dispatchUserInfo(
  id: string,
  username: string,
  email: string,
  workspaceMember: Array<{ workspace: workspaceObj }>,
  workspaces: Array<workspaceObj>,
  firstname: string,
  lastname: string,
  phone: string,
  settings: Array<string>,
  profile_url: string
) {
  store.dispatch(
    userSlice.actions.setUserInfoByRequest({
      email,
      id,
      username,
      workspaceMember,
      workspaces,
      firstname,
      lastname,
      phone,
      settings,
      profile_url,
    })
  );
}

const userUpdateByToken = async (token: string) => {
  const { id } = jwt(token) as { id: string };

  const {
    data: { data: userData },
  } = await getUserApi(id);

  const {
    email,
    profile_url,
    username,
    workspaceMember,
    workspaces,
    firstname,
    lastname,
    phone,
    settings,
  } = userData;

  dispatchUserInfo(
    id,
    username,
    email,
    workspaceMember,
    workspaces,
    firstname,
    lastname,
    phone,
    settings,
    profile_url
  );
};

export default userUpdateByToken;
