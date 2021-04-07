import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { getQueryValue } from '../../utils/url.utils';
import ROUTES from '../../constants/routes.constants';
import { authenticateTwitch } from '../../api/twitchApi';
import { QUERIES } from '../../constants/common.constants';
import LoadingPage from '../LoadingPage/LoadingPage';

const TwitchRedirect: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingMessage] = useState<string>('Авторизация...');

  useEffect(() => {
    const code = getQueryValue(location.search, QUERIES.CODE);
    if (code) {
      authenticateTwitch(code).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, location]);

  return isLoading ? <LoadingPage helpText={loadingMessage} /> : <Redirect to={ROUTES.VIDEO_SKIP} />;
};

export default TwitchRedirect;
