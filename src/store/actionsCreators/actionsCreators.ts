// @ts-ignore
import { ADD_NEIGHBOR, CHANGE_FOCUS_ELEMENT } from '../actions/actions.ts';

export type PagePath = (number | string);

export interface IPage {
  pageId: number;
  pageLink: string;
  pagePath: PagePath[];
  content: string;
  nestedPages: IPage[];
  neighbors: IPage[];
  textInputHeight: number;
}

const TEXT_INPUT_HEIGHT = 24;

const updateNestedPagesPath = (newRootPath: PagePath[], nestedPages: IPage[]): void => {
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
  const pageId: number = (pagePath.slice(-1)[0] as number);
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

function addNeighbor(body: any, params: { currentPage: IPage; list: IPage[] }) {
  const { list, currentPage } = params;
  const { pagePath } = currentPage;
  const newPageId: number = list.length;
  const newNeighborPath: PagePath[] = [
    ...pagePath.slice(0, -1),
    newPageId,
  ];
  const newNeighbor: IPage = {
    pageId: newPageId,
    pageLink: '',
    pagePath: newNeighborPath,
    content: '',
    neighbors: [],
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
    type: ADD_NEIGHBOR,
    body: [...body],
    focusComponentPath: newNeighborPath,
  };
}

function becomeChild(body: any, params: { currentPage: IPage }) {
  const { currentPage } = params;
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
    type: ADD_NEIGHBOR,
    body: [...body],
    focusComponentPath: newChildPagePath,
  };
}

function removePage(body: any, params: { currentPage: IPage }) {
  const { currentPage } = params;
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

  const newFocusComponentPath: (string | number)[] = getFocusPathOnRemove(pagePath);
  return {
    type: ADD_NEIGHBOR,
    body: [...body],
    focusComponentPath: newFocusComponentPath,
  };
}

function levelUp(body: any, params: { currentPage: IPage }) {
  const { currentPage } = params;
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
    type: ADD_NEIGHBOR,
    body: [...body],
    focusComponentPath: newChildPagePath,
  };
}

function addChild(body: any, params: { currentPage: IPage }) {
  const { currentPage } = params;
  const { pagePath } = currentPage;

  const newPageId: number = 0;
  const newChildPath: PagePath[] = [
    ...pagePath,
    'nestedPages',
    newPageId,
  ];
  const newChild: IPage = {
    pageId: newPageId,
    pageLink: '',
    pagePath: newChildPath,
    content: '',
    neighbors: [],
    nestedPages: [],
    textInputHeight: TEXT_INPUT_HEIGHT,
  };

  currentPage.nestedPages.push(newChild);

  updateIds(currentPage.nestedPages);
  updateNestedPagesPath(currentPage.pagePath, currentPage.nestedPages);

  return {
    type: ADD_NEIGHBOR,
    body: [...body],
    focusComponentPath: newChildPath,
  };
}

function changeFocusElement(
  direction: string, body: any, params: { currentPage: IPage; list: IPage[] },
) {
  const { currentPage, list } = params;
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
    focusComponentPath: newFocusPath,
  };
}

function updateContent(body: any) {
  return {
    type: ADD_NEIGHBOR,
    body: [...body],
  };
}

export {
  removePage, addNeighbor, becomeChild, levelUp, updateContent, addChild, changeFocusElement,
};
