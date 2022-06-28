import React from 'react';
import { withAppContext } from '../Context';

import UserMessage from './UserMessage';
import FileMessage from './FileMessage';
import AdminMessage from './AdminMessage';

const Message = props => {
  const { message } = props;
  let component = null;
  if (message.isUserMessage()) {
    component = <UserMessage {...props} />;
  } else if (message.isFileMessage()) {
    component = <FileMessage {...props} />;
  } else if (message.isAdminMessage()) {
    component = <AdminMessage {...props} />;
  }
  return component;
};

export default withAppContext(Message);
