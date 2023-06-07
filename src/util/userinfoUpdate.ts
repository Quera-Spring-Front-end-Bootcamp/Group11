import userSlice from '../redux/slices/userSlice';
import store from '../redux/store';
import jwt from 'jwt-decode';

function dispatchUserInfo(id: string, username: string, email: string) {
  store.dispatch(userSlice.actions.setUserInfo({ email, id, username }));
}

const userUpdateByToken = (token: string) => {
  const { id, username, email } = jwt<any>(token);
  dispatchUserInfo(id, username, email);
};

export default userUpdateByToken;
