/* eslint-disable no-underscore-dangle */
import { getEmptyNote, updateNoteParents } from '../utils';
import RSCloneService from '../../services/RSClone.service';
import { INote, IPage } from '../../models/notes.model';
import {
  ADD_NOTE,
  CHANGE_FOCUS_ELEMENT,
  UPDATE_CONTENT_REQUESTED,
  UPDATE_CONTENT_RECEIVED,
  UPDATE_CONTENT_FAILED,
  UPDATE_NOTE_BODY,
  USER_LOGGED_IN,
  UPDATE_CONTENT,
  USER_LOGGED_OUT, GET_USER_DATA, ADD_SHORTCUT,
} from '../actions/actions';
// import { onUserLoggedInType } from '../../components/home/LoginFrom';

export type PagePath = number | string;

const TEXT_INPUT_HEIGHT = 24;

const updateNestedPagesPath = (
  newRootPath: PagePath[],
  nestedPages: IPage[],
): void => {
  for (let i = 0; i < nestedPages.length; i += 1) {
    const childOldPath: (string | number)[] = nestedPages[i].pagePath;
    const childNewPath: (string | number)[] = [
      ...newRootPath,
      ...childOldPath.slice(-2),
    ];
    // eslint-disable-next-line no-param-reassign
    nestedPages[i].pagePath = childNewPath;
    if (nestedPages[i].nestedPages.length > 0) {
      // eslint-disable-next-line no-unused-vars
      updateNestedPagesPath(childNewPath, nestedPages[i].nestedPages);
    }
  }
};

const getFocusPathOnRemove = (pagePath: PagePath[]) => {
  const pageId: number = pagePath.slice(-1)[0] as number;
  if (pageId === 0) {
    return pagePath.slice(0, -2);
  }

  return [...pagePath.slice(0, -1), pageId - 1];
};

const updateIds = (nestedPages: IPage[]): void => {
  for (let i = 0; i < nestedPages.length - 1; i += 1) {
    // eslint-disable-next-line no-param-reassign
    nestedPages[i].pageId = i;
    // eslint-disable-next-line no-param-reassign
    nestedPages[i].pagePath = [...nestedPages[i].pagePath.slice(-1), i];
  }
};

function addNeighbor(
  body: any,
  params: { currentPage: IPage; list: IPage[]; noteTitle: string },
) {
  // eslint-disable-next-line no-debugger
  // debugger;
  const { list, currentPage, noteTitle } = params;
  const { pagePath } = currentPage;
  const newPageId: number = list.length;
  const newNeighborPath: PagePath[] = [...pagePath.slice(0, -1), newPageId];
  const newNeighbor: IPage = {
    pageId: newPageId,
    pageLink: '',
    pagePath: newNeighborPath,
    content: '',
    nestedPages: [],
    textInputHeight: TEXT_INPUT_HEIGHT,
  };

  let pageParentList: any = body;
  for (let i = 0; i < pagePath.length - 1; i += 1) {
    pageParentList = pageParentList[pagePath[i]];
  }

  // pageParentList.splice(currentPage.pageId + 1, 0, newNeighbor);
  pageParentList.push(newNeighbor);
  // for (let i = 0; i < pageParentList.length; i += 1) {
  //   pageParentList[i] = {
  //     ...pageParentList[i],
  //     pageId: i,
  //     content: `${i} Inner page content`,
  //     pagePath: [...pageParentList[i].pagePath.slice(0, -1), i],
  //   };
  // }
  return {
    type: UPDATE_NOTE_BODY,
    body: [...body],
    title: noteTitle,
    focusComponentPath: { [noteTitle]: newNeighborPath },
  };
}

function becomeChild(
  body: any,
  params: { currentPage: IPage; noteTitle: string },
) {
  const { currentPage, noteTitle } = params;
  const { pagePath } = currentPage;
  let pageParentList: any = body;
  for (let i = 0; i < pagePath.length - 1; i += 1) {
    pageParentList = pageParentList[pagePath[i]];
  }

  const newParentPageIndex: number = (pagePath.slice(-1)[0] as number) - 1;
  const newParentPage: IPage = pageParentList[newParentPageIndex];

  const newChildPageIndex: number = newParentPage.nestedPages.length;
  const newChildPagePath: (string | number)[] = [
    ...newParentPage.pagePath,
    'nestedPages',
    newChildPageIndex,
  ];
  const newChildPage: IPage = {
    ...currentPage,
    pageId: newChildPageIndex,
    pagePath: newChildPagePath,
  };

  updateNestedPagesPath(newChildPage.pagePath, newChildPage.nestedPages);

  newParentPage.nestedPages.push(newChildPage);
  pageParentList.splice(currentPage.pageId, 1);

  for (let i = 0; i < pageParentList.length; i += 1) {
    pageParentList[i] = {
      ...pageParentList[i],
      pageId: i,
      pagePath: [...pageParentList[i].pagePath.slice(0, -1), i],
    };
  }

  return {
    type: UPDATE_NOTE_BODY,
    body: [...body],
    title: noteTitle,
    focusComponentPath: { [noteTitle]: newChildPagePath },
  };
}

function removePage(
  body: any,
  params: { currentPage: IPage; noteTitle: string },
) {
  const { currentPage, noteTitle } = params;
  const { pagePath } = currentPage;
  let pageParentList: any = body;
  for (let i = 0; i < pagePath.length - 1; i += 1) {
    pageParentList = pageParentList[pagePath[i]];
  }
  pageParentList.splice(currentPage.pageId, 1);

  for (let i = 0; i < pageParentList.length; i += 1) {
    pageParentList[i] = {
      ...pageParentList[i],
      pageId: i,
      pagePath: [...pageParentList[i].pagePath.slice(0, -1), i],
    };
  }

  const newFocusComponentPath: (string | number)[] = getFocusPathOnRemove(
    pagePath,
  );
  return {
    type: UPDATE_NOTE_BODY,
    body: [...body],
    title: noteTitle,
    focusComponentPath: { [noteTitle]: newFocusComponentPath },
  };
}

function levelUp(body: any, params: { currentPage: IPage; noteTitle: string }) {
  const { currentPage, noteTitle } = params;
  const { pagePath } = currentPage;
  let pageParentList: any = body;
  for (let i = 0; i < pagePath.length - 1; i += 1) {
    pageParentList = pageParentList[pagePath[i]];
  }

  let newPageParentList: any = body;
  for (let i = 0; i < pagePath.length - 3; i += 1) {
    newPageParentList = newPageParentList[pagePath[i]];
  }

  const newChildPageIndex: number = newPageParentList.length;
  const newChildPagePath: (string | number)[] = [
    ...currentPage.pagePath.slice(0, -3),
    newChildPageIndex,
  ];

  const newChildPage: IPage = {
    ...currentPage,
    pageId: newChildPageIndex,
    pagePath: newChildPagePath,
  };

  updateNestedPagesPath(newChildPage.pagePath, newChildPage.nestedPages);

  newPageParentList.push(newChildPage);
  pageParentList.splice(currentPage.pageId, 1);

  for (let i = 0; i < pageParentList.length; i += 1) {
    pageParentList[i] = {
      ...pageParentList[i],
      pageId: i,
      pagePath: [...pageParentList[i].pagePath.slice(0, -1), i],
    };
  }
  return {
    type: UPDATE_NOTE_BODY,
    body: [...body],
    title: noteTitle,
    focusComponentPath: { [noteTitle]: newChildPagePath },
  };
}

function addChild(
  body: any,
  params: { currentPage: IPage; noteTitle: string },
) {
  const { currentPage, noteTitle } = params;
  const { pagePath } = currentPage;

  const newPageId: number = 0;
  const newChildPath: PagePath[] = [...pagePath, 'nestedPages', newPageId];
  const newChild: IPage = {
    pageId: newPageId,
    pageLink: '',
    pagePath: newChildPath,
    content: '',
    nestedPages: [],
    textInputHeight: TEXT_INPUT_HEIGHT,
  };

  currentPage.nestedPages.push(newChild);

  updateIds(currentPage.nestedPages);
  updateNestedPagesPath(currentPage.pagePath, currentPage.nestedPages);

  return {
    type: UPDATE_NOTE_BODY,
    body: [...body],
    title: noteTitle,
    focusComponentPath: { [noteTitle]: newChildPath },
  };
}

function changeFocusElement(
  direction: string,
  body: any,
  params: { currentPage: IPage; list: IPage[]; noteTitle: string },
) {
  const { currentPage, list, noteTitle } = params;
  const { pagePath, pageId } = currentPage;

  let newFocusPath: PagePath[];

  if (direction === 'up') {
    if (pageId > 0) {
      newFocusPath = [...pagePath.slice(0, -1), pageId - 1];
    } else {
      newFocusPath = [...pagePath.slice(0, -2)];
    }
  } else if (pageId >= list.length - 1) {
    newFocusPath = [...pagePath];
  } else {
    newFocusPath = [...pagePath.slice(0, -1), pageId + 1];
  }

  return {
    type: CHANGE_FOCUS_ELEMENT,
    title: noteTitle,
    focusComponentPath: { [noteTitle]: newFocusPath },
  };
}

// function updateContent(body: any, params: { noteTitle: string }) {
//   const { noteTitle } = params;
//   return {
//     type: UPDATE_NOTE_BODY,
//     title: noteTitle,
//     body: [...body],
//   };
// }

function updateContent(
  body: any,
  params: {
    noteTitle: string; pageLinks: string[], content: string, currentNote: INote, currentPage: IPage
  },
) {
  const {
    noteTitle, pageLinks, content, currentNote, currentPage,
  } = params;
  // return {
  //   type: UPDATE_CONTENT,
  //   title: noteTitle,
  //   body: [...body],
  // };
  // eslint-disable-next-line func-names
  if (!pageLinks) {
    return {
      type: UPDATE_CONTENT,
      title: noteTitle,
      body: [...body],
    };
  }

  const service = new RSCloneService();

  const promises = pageLinks.map(async (item: string) => {
    const link = item.replace(/\[/gi, '').replace(/\]/gi, '');
    const res = await service.getNoteByTitle(link);
    let note: INote = res.DATA;
    let id: string;
    if (!note) {
      note = getEmptyNote(link);
      id = await service.addNote(note);
      // eslint-disable-next-line no-underscore-dangle
      note._id = id;
    }

    // необходимо добавить в parents ссылку на эту страницу
    // в виде { parentTitle: string; content: string[] }
    note.parents = updateNoteParents(note, noteTitle, content, currentPage);
    await service.updateNote(note, (note._id as string));
    return { id: note._id, title: link };
  });
  // eslint-disable-next-line func-names
  return function (dispatch: any) {
    dispatch({
      type: UPDATE_CONTENT_REQUESTED,
    });

    service.updateNote(currentNote, (currentNote._id as string))
      .then(() => Promise.all(promises))
      .then((data) => {
        dispatch({
          type: UPDATE_CONTENT_RECEIVED,
          payload: { pageLinks: data, title: noteTitle, body },
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_CONTENT_FAILED,
          payload: error,
        });
      });
  };
}

function addNote(note: INote) {
  return {
    type: ADD_NOTE,
    note,
  };
}

const userLoggedIn = (data: any) => {
  localStorage.setItem('username', data.user.name);
  localStorage.setItem('email', data.user.email);

  return {
    type: USER_LOGGED_IN,
    userData: {
      username: data.user.name,
      email: data.user.email,
    },
  };
};

const userLoggedOut = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('auth-token');
  return {
    type: USER_LOGGED_OUT,
    isLoggedIn: false,
  };
};

const getUserData = (data: any) => ({
  type: GET_USER_DATA,
  payload: data,
});

const addShortcut = (data: string) => ({
  type: ADD_SHORTCUT,
  payload: data,
});

export {
  removePage,
  addNeighbor,
  becomeChild,
  levelUp,
  updateContent,
  addChild,
  changeFocusElement,
  addNote,
  userLoggedIn,
  userLoggedOut,
  getUserData,
  addShortcut,
};
