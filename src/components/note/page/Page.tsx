import React from 'react';
import shortid from 'shortid';
import { IPage } from '../Note';

const newPage: IPage = {
  pageId: 0,
  pageLink: '',
  pagePath: [],
  content: 'some content',
  neighbors: [],
  nestedPages: [],
};

function Page(props: any) {
  console.log(props);
  let {
    nestedPages,
  } = props;
  const {
    content, onAddNeighbor, onAddChild, becomeChild,
  } = props;
  let childrenComponents = (<span>{}</span>);

  // const addNeighbor = (page: any) => {
  //   // const newPage: IPage = {
  //   //   pageId: 0,
  //   //   pageLink: '',
  //   //   pagePath: [],
  //   //   content: 'some content',
  //   //   neighbors: [],
  //   //   nestedPages: [],
  //   // };
  //   nestedPages.push(page);
  // };

  // const AddChild = (page: any) => {
  //   // const newPage: IPage = {
  //   //   pageId: 0,
  //   //   pageLink: '',
  //   //   pagePath: [],
  //   //   content: 'some content',
  //   //   neighbors: [],
  //   //   nestedPages: [],
  //   // };
  //   nestedPages.push(page);
  // };

  const updatePageIndex = (page: IPage) => ({
    ...page,
    pageId: page.pageId - 1,
  });

  const onBecomeChild = (page: IPage, pagesList: IPage[]) => {
    const pageIndex = page.pageId;
    console.log(pageIndex);
    if (pageIndex === 0) {
      return;
    }

    let parentPage: IPage = pagesList[pageIndex - 1];

    // необходимо обновить pageId страницы, которая стала ребенком
    const child: IPage = {
      ...page,
      pageId: parentPage.nestedPages.length,
    };

    parentPage = {
      ...parentPage,
      nestedPages: [...parentPage.nestedPages, child],
    };

    // eslint-disable-next-line no-debugger
    // debugger;
    // let newPage = body[pageIndex];
    // newPage = {
    //   ...newPage,
    //   nestedPages: [...newPage.nestedPages, child],
    // };

    let newBody: IPage[];
    if (pageIndex > 0) {
      newBody = [
        ...pagesList.slice(0, pageIndex - 1),
        parentPage,
        ...pagesList.slice(pageIndex + 1).map(updatePageIndex),
      ];
    } else {
      newBody = [parentPage, ...pagesList.slice(2).map(updatePageIndex)];
    }

    nestedPages = newBody;
    console.log(nestedPages);
  };

  if (nestedPages && nestedPages.length > 0) {
    // делаем из вложеннех страниц компоненты
    childrenComponents = nestedPages.map((item: IPage) => (
      <Page
        key={shortid.generate()}
        content={item.content}
        nestedPages={item.nestedPages}
        onAddNeighbor={() => onAddChild(newPage)}
        becomeChild={() => onBecomeChild(item, nestedPages)}
        // onAddChild={() => }
      />
    ));
  }

  return (
    <div>
      <p>{content}</p>
      <button type="button" onClick={() => onAddNeighbor(newPage)}>Add neighbor</button>
      <button type="button" onClick={() => becomeChild()}>Become a child</button>
      <div className="child">{childrenComponents}</div>
    </div>
  );
}

export default Page;
