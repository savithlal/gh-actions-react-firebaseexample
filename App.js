import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './src/app/Navigation/RootNavigation';
import configureStore from './src/app/Redux/Store/Store';
const {store, persistor} = configureStore();
import 'react-native-gesture-handler';
import {Theme} from './src/app/Styles/Theme';
import CustomStatusBar from './src/app/Components/CustomStatusBar/CustomStatusBar';
import RNBootSplash from 'react-native-bootsplash';
const App = () => {
  // StatusBar.setBackgroundColor(Theme.PRIMARY_COLOR)
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomStatusBar />
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
