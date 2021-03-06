import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // @ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { IInitialState } from '../../../../index';
import { INotification } from '../../../../models/notes.model';
import { CLEAR_NOTIFICATION } from '../../../../store/actions/actions';

const Notification = () => {
  const notification = useSelector<IInitialState>((state) => state.notification);
  const [message, setMessage] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();

  if (notification && !show) {
    setMessage(notification);
    setShow(true);
  }

  const getNotification = (msg: INotification) => {
    const args = [msg.body, msg.title, 5000];
    switch (msg.type) {
      case 'info':
        NotificationManager.info(...args);
        break;
      case 'success':
        NotificationManager.success(...args);
        break;
      case 'warning':
        NotificationManager.warning(...args);
        break;
      case 'error':
        NotificationManager.error(...args);
        break;
      default:
        NotificationManager.error(...args);
    }
  };

  useEffect(() => {
    if (message && show) {
      const toastr = (message as INotification);
      setShow(false);
      getNotification(toastr);
      dispatch({ type: CLEAR_NOTIFICATION });
    }
  }, [show]);

  return (
    <NotificationContainer />
  );
};

export default Notification;
