import React, { useLayoutEffect, useEffect, useReducer, useState } from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  AppState,
} from 'react-native';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { withAppContext } from '../Context';
import { inviteReducer } from '../Reducer/Invite';
import User from '../Component/User';
import { Theme } from '../../../Styles/Theme';
import { useDispatch } from 'react-redux';
import { changeStatusBarColor, changeStatusBarStyle } from '../../../Redux/Actions/SharedReducerActions';

const Invite = props => {
  const { route, navigation, sendbird } = props;
  const { currentUser, channel } = route.params;

  const [query, setQuery] = useState(null);
  const [state, dispatch] = useReducer(inviteReducer, {
    channel,
    users: [],
    userMap: {},
    selectedUsers: [],
    loading: false,
    error: '',
  });

  const sharedDispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      sharedDispatch(changeStatusBarColor(Theme.PRIMARY_GREEN));
      sharedDispatch(changeStatusBarStyle('light-content'));
    }, []),
  );

  useLayoutEffect(() => {
    const right = (
      <View style={style.headerRightContainer}>
        <TouchableOpacity activeOpacity={0.85} style={style.inviteButton} onPress={invite}>
          <Icon name="done" color="#fff" size={28} />
        </TouchableOpacity>
      </View>
    );
    navigation.setOptions({
      headerRight: () => right,
    });
  });

  // on state change
  useEffect(() => {
    sendbird.addConnectionHandler('invite', connectionHandler);
    const unsubscribe = AppState.addEventListener('change', handleStateChange);

    if (!sendbird.currentUser) {
      sendbird.connect(currentUser.userId, (err, _) => {
        if (!err) {
          refresh();
        } else {
          dispatch({
            type: 'error',
            payload: {
              error: 'Connection failed. Please check the network status.',
            },
          });
        }
      });
    } else {
      refresh();
    }

    return () => {
      dispatch({ type: 'end-loading' });
      sendbird.removeConnectionHandler('invite');
      unsubscribe.remove();
    };
  }, []);

  useEffect(() => {
    if (query) {
      next();
    }
  }, [query]);

  /// on connection event
  const connectionHandler = new sendbird.ConnectionHandler();
  connectionHandler.onReconnectStarted = () => {
    dispatch({
      type: 'error',
      payload: {
        error: 'Connecting..',
      },
    });
  };
  connectionHandler.onReconnectSucceeded = () => {
    dispatch({
      type: 'error',
      payload: {
        error: '',
      },
    });
    refresh();
  };
  connectionHandler.onReconnectFailed = () => {
    dispatch({
      type: 'error',
      payload: {
        error: 'Connection failed. Please check the network status.',
      },
    });
  };

  const handleStateChange = newState => {
    if (newState === 'active') {
      sendbird.setForegroundState();
    } else {
      sendbird.setBackgroundState();
    }
  };
  const invite = async () => {
    if (state.selectedUsers.length > 0) {
      dispatch({ type: 'start-loading' });
      try {
        if (!channel) {
          const params = new sendbird.GroupChannelParams();
          params.addUsers(state.selectedUsers);
          const createdChannel = await sendbird.GroupChannel.createChannel(params);

          dispatch({ type: 'end-loading' });
          navigation.dispatch(
            StackActions.replace('Chat', {
              currentUser,
              channel: createdChannel,
            }),
          );
        } else {
          await channel.invite(state.selectedUsers);
          dispatch({ type: 'end-loading' });
          navigation.goBack();
        }
      } catch (err) {
        dispatch({
          type: 'error',
          payload: { error: err.message },
        });
      }
    } else {
      dispatch({
        type: 'error',
        payload: { error: 'Select at least 1 user to invite.' },
      });
    }
  };
  const refresh = () => {
    setQuery(sendbird.createApplicationUserListQuery());
    dispatch({ type: 'refresh' });
  };
  const next = () => {
    if (query.hasNext) {
      dispatch({ type: 'start-loading' });
      query.limit = 50;
      query.next((err, fetchedUsers) => {
        dispatch({ type: 'end-loading' });
        if (!err) {
          dispatch({
            type: 'fetch-users',
            payload: { users: fetchedUsers },
          });
        } else {
          dispatch({
            type: 'error',
            payload: {
              error: 'Failed to get the users.',
            },
          });
        }
      });
    }
  };
  const onSelect = user => {
    if (!state.selectedUsers.includes(user)) {
      dispatch({ type: 'select-user', payload: { user } });
    } else {
      dispatch({ type: 'unselect-user', payload: { user } });
    }
  };

  return (
    <>
      <SafeAreaView style={style.container}>
        <FlatList
          data={state.users}
          renderItem={({ item }) => (
            <User
              key={item.userId}
              user={item}
              selected={state.selectedUsers.includes(item)}
              selectable={true}
              onSelect={onSelect}
            />
          )}
          keyExtractor={item => item.userId}
          refreshControl={
            <RefreshControl refreshing={state.loading} colors={[Theme.PRIMARY_GREEN]} tintColor={Theme.PRIMARY_GREEN} onRefresh={refresh} />
          }
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={
            state.error && (
              <View style={style.errorContainer}>
                <Text style={style.error}>{state.error}</Text>
              </View>
            )
          }
          onEndReached={() => next()}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    </>
  );
};

const style = {
  container: {
    flex: 1,
  },
  inviteButton: {
    marginRight: 12,
  },
  errorContainer: {
    backgroundColor: '#333',
    opacity: 0.8,
    padding: 10,
  },
  error: {
    color: '#fff',
  },
};

export default withAppContext(Invite);
