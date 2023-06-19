import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import userUpdate from '../util/userinfoUpdate';

const IndexPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    //extract query params from url if exists (only for reset password)
    const queryParams = Object.fromEntries([...searchParams]);

    if (queryParams.token) {
      //navigate to reset password page and push token to url as query param
      navigate({
        pathname: '/auth/resetPassword',
        search: `?token=${queryParams.token}`,
      });
    } else {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/auth');
      } else {
        userUpdate(accessToken);
        navigate('/board');
      }
      // console.log()
    }
  }, []);

  return <>Loading</>;
};

export default IndexPage;
