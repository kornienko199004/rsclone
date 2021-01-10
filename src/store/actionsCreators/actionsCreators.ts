// @ts-ignore
import { ADD_NEIGHBOR } from '../actions/actions.ts';

export interface IPage {
  pageId: number;
  pageLink: string;
  pagePath: (number | string)[];
  content: string;
  nestedPages: IPage[];
  neighbors: IPage[];
}

function addNeighbor(body: any, params: { currentPage: IPage, list: IPage[]}) {
  const { list, currentPage } = params;
  const { pagePath } = currentPage;
  const newPageId: number = list.length;
  const newNeighborPath: (number | string)[] = [...pagePath.slice(0, -1), newPageId];
  const newNeighbor: IPage = {
    pageId: newPageId,
    pageLink: '',
    pagePath: newNeighborPath,
    content: '',
    // content: `${newPageId} Inner page content`,
    neighbors: [],
    nestedPages: [],
  };

  let pageParentList: any = body;
  console.log('pagePath', pagePath);
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
  };
}

function becomeChild(body: any) {
  return {
    type: ADD_NEIGHBOR,
    body: [...body],
  };
}

function removePage(body: any) {
  return {
    type: ADD_NEIGHBOR,
    body: [...body],
  };
}

function levelUp(body: any) {
  return {
    type: ADD_NEIGHBOR,
    body: [...body],
  };
}

function updateContent(body: any) {
  return {
    type: ADD_NEIGHBOR,
    body: [...body],
  };
}

export {
  removePage, addNeighbor, becomeChild, levelUp, updateContent,
};
