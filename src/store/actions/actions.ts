const ADD_NEIGHBOR = 'ADD_NEIGHBOR';
const CHANGE_FOCUS_ELEMENT = 'CHANGE_FOCUS_ELEMENT';
const UPDATE_NOTE_BODY = 'UPPDATE_NOTE_BODY';

const ADD_NOTE = 'ADD_NOTE';

const userLoggedIn = () => ({
  type: 'USER_LOGGED_IN',
});

export {
  ADD_NEIGHBOR, CHANGE_FOCUS_ELEMENT,
  userLoggedIn, ADD_NOTE, UPDATE_NOTE_BODY,
};
