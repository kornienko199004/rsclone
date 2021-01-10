/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
// import { update } from 'lodash';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { IPage } from '../Note';

// eslint-disable-next-line import/extensions
import {
  addNeighbor, becomeChild, removePage, levelUp, updateContent, // @ts-ignore
} from '../../../store/actionsCreators/actionsCreators.ts';

const mapStateToProps = (state: any, ownProps: any) => ({
  body: state.body,
  ...ownProps,
});

const mapDispatchToProps = {
  addNeighbor, becomeChild, removePage, levelUp, updateContent,
};

function Page(props: any) {
  const {
    content, body, pagePath, currentPage, list,
  } = props;

  let childrenComponents = (<span>{ }</span>);
  const [pageContent, setContent] = useState(content);

  const onAddNeighbor = () => {
    // const newPageId: number = list.length;
    // const newNeighborPath: (number | string)[] = [...pagePath.slice(0, -1), newPageId];
    // const newNeighbor: IPage = {
    //   pageId: newPageId,
    //   pageLink: '',
    //   pagePath: newNeighborPath,
    //   content: '',
    //   // content: `${newPageId} Inner page content`,
    //   neighbors: [],
    //   nestedPages: [],
    // };

    // let pageParentList: any = body;
    // console.log('pagePath', pagePath);
    // for (let i = 0; i < pagePath.length - 1; i += 1) {
    //   pageParentList = pageParentList[pagePath[i]];
    // }

    // // pageParentList.splice(currentPage.pageId + 1, 0, newNeighbor);
    // pageParentList.push(newNeighbor);
    // // for (let i = 0; i < pageParentList.length; i += 1) {
    // //   pageParentList[i] = {
    // //     ...pageParentList[i],
    // //     pageId: i,
    // //     content: `${i} Inner page content`,
    // //     pagePath: [...pageParentList[i].pagePath.slice(0, -1), i],
    // //   };
    // // }
    props.addNeighbor(body, { currentPage, list });
  };

  const onBecomeChild = () => {
    if (currentPage.pageId === 0) {
      return;
    }

    let pageParentList: any = body;
    for (let i = 0; i < pagePath.length - 1; i += 1) {
      pageParentList = pageParentList[pagePath[i]];
    }

    const newParentPageIndex: number = pagePath.slice(-1)[0] - 1;
    const newParentPage: IPage = pageParentList[newParentPageIndex];

    const newChildPageIndex: number = newParentPage.nestedPages.length;
    const newChildPagePath: (string | number)[] = [...currentPage.pagePath.slice(0, -1), newParentPageIndex, 'nestedPages', newChildPageIndex];
    const newChildPage: IPage = {
      ...currentPage,
      pageId: newChildPageIndex,
      pagePath: newChildPagePath,
      // content: `${newChildPageIndex} Inner page content`,
    };

    newParentPage.nestedPages.push(newChildPage);
    pageParentList.splice(currentPage.pageId, 1);

    for (let i = 0; i < pageParentList.length; i += 1) {
      pageParentList[i] = {
        ...pageParentList[i],
        pageId: i,
        // content: `${i} Inner page content`,
        pagePath: [...pageParentList[i].pagePath.slice(0, -1), i],
      };
    }
    props.becomeChild(body);
  };

  const onLevelUp = () => {
    if (currentPage.pagePath && currentPage.pagePath.length === 1) {
      return;
    }

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
      // content: `${newChildPageIndex} Inner page content`,
    };

    newPageParentList.push(newChildPage);
    pageParentList.splice(currentPage.pageId, 1);

    for (let i = 0; i < pageParentList.length; i += 1) {
      pageParentList[i] = {
        ...pageParentList[i],
        pageId: i,
        // content: `${i} Inner page content`,
        pagePath: [...pageParentList[i].pagePath.slice(0, -1), i],
      };
    }
    props.levelUp(body);
  };

  const onRemove = () => {
    if (currentPage.nestedPages && currentPage.nestedPages.length > 0) {
      return;
    }

    let pageParentList: any = body;
    for (let i = 0; i < pagePath.length - 1; i += 1) {
      pageParentList = pageParentList[pagePath[i]];
    }
    pageParentList.splice(currentPage.pageId, 1);

    for (let i = 0; i < pageParentList.length; i += 1) {
      pageParentList[i] = {
        ...pageParentList[i],
        pageId: i,
        // content: `${i} Inner page content`,
        pagePath: [...pageParentList[i].pagePath.slice(0, -1), i],
      };
    }
    props.removePage(body);
  };

  if (currentPage.nestedPages && currentPage.nestedPages.length > 0) {
    // делаем из вложеннех страниц компоненты
    childrenComponents = currentPage.nestedPages.map((item: IPage, index: number, arr: IPage[]) => {
      const NewPage: any = connect(mapStateToProps, mapDispatchToProps)(Page);
      // const mapStateToPropsForChild = (state: any, ownProps: any) => ({
      //   body: state.body,
      //   ...ownProps,
      // });
      return (
        <NewPage
          key={shortid.generate()}
          content={item.content}
          nestedPages={item.nestedPages}
          pagePath={item.pagePath}
          currentPage={item}
          list={arr}
        />
      );
    });
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value || e.target.value.length === 0) {
      return;
    }

    if (e.target.value === content) {
      return;
    }

    let currentPageLink: any = body;
    for (let i = 0; i < pagePath.length; i += 1) {
      currentPageLink = currentPageLink[pagePath[i]];
    }

    currentPageLink.content = e.target.value;
    props.updateContent(body);
    // console.log('textInput', textInput.current.value);
  };

  return (
    <div>
      <input type="text" value={pageContent} onBlur={onBlur} onChange={(e) => setContent(e.target.value)} />
      <button type="button" onClick={onAddNeighbor}>Add neighbor</button>
      <button type="button" onClick={onBecomeChild}>Become a child</button>
      <button type="button" onClick={onRemove}>x</button>
      <button type="button" onClick={onLevelUp}>up</button>
      {/* <p>{content}</p> */}
      <div className="child">{childrenComponents}</div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
