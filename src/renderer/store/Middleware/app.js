import Notification from '../../utility/Notification';

export default store => next => action => {
    switch(action.type) {
      case 'APP_IS_ONLINE':
      case 'APP_IS_OFFLINE': {
        Notification.show({
            title: 'Connection status:',
            body: action.isOnline ? 'Online' : 'Offline'
          });
      }
    }
  
    next(action);
  }