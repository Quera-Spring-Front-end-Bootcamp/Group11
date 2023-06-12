import axios from 'axios';
import userSlice from '../redux/slices/userSlice';
import store from '../redux/store';
import jwt from 'jwt-decode';
import { BASE_URL } from '../constants';

function dispatchUserInfo(
  id: string,
  username: string,
  email: string,
  workspaceMember: Array<string>,
  workspaces: Array<string>,
  firstname: string,
  lastname: string,
  settings: Array<any>
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
      settings,
    })
  );
}

const userUpdateByToken = async (token: string) => {
  const { id } = jwt<any>(token);

  const {
    data: { data: userData },
  } = await axios.get(`${BASE_URL}/users/${id}`);

  console.log(userData);

  const {
    email,
    profile_url,
    username,
    workspaceMember,
    workspaces,
    firstname,
    lastname,
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
    settings
  );
};

export default userUpdateByToken;
