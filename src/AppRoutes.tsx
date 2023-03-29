import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import InitialStackNavigation from './navigation/InitialStackNavigation';
import MainStackNavigation from './navigation/MainStackNavigation';
import LoadingScreen from './screens/initialize/LoadingScreen';

import themes from './config/theme';
import storageKeys from './config/storageKeys';
import {setSession} from './features/appSlice';
import {RootState} from './store';
import storage from './utils/storage';

function AppRoutes(): JSX.Element {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = React.useState(false);
  const {session, theme} = useSelector((state: RootState) => state.app);
  const _theme = themes[theme];

  useEffect(() => {
    (async () => {
      try {
        const sessionStorage = await storage.getItem(storageKeys.SESSION_KEY);
        if (sessionStorage) {
          dispatch(setSession(sessionStorage));
        }
      } finally {
        setIsReady(true);
      }
    })();
  }, [dispatch]);

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <PaperProvider theme={_theme}>
      <NavigationContainer theme={_theme}>
        {session.basicsDone ? (
          <MainStackNavigation />
        ) : (
          <InitialStackNavigation />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default AppRoutes;
