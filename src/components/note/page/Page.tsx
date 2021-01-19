/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
// import { update } from 'lodash';
import autosize from 'autosize';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { IPage } from '../../../models/notes.model';
import './page.scss';

// eslint-disable-next-line import/extensions
import {
  addNeighbor, becomeChild,
  removePage, levelUp, updateContent, addChild, changeFocusElement, // @ts-ignore
} from '../../../store/actionsCreators/actionsCreators';
import { selectNote } from '../../../store/utils';

const mapStateToProps = (state: any, ownProps: any) => ({
  notes: state.notes,
  focusComponentPath: state.focusComponentPath,
  ...ownProps,
});

const mapDispatchToProps = {
  addNeighbor, becomeChild, removePage, levelUp, updateContent, addChild, changeFocusElement,
};

function Page(props: any) {
  const {
    content, notes, pagePath, currentPage, list, focusComponentPath, textInputHeight, noteTitle,
  } = props;

  const body: IPage[] = selectNote(noteTitle, notes)?.body;

  let childrenComponents = (<span>{ }</span>);
  const [pageContent, setContent] = useState(content);
  const [showNestedPages, setNestedPagesVisibility] = useState(true);

  // setNestedPagesVisibility(true);
  // let showNestedPages = true;

  let textInput: HTMLTextAreaElement | null = null;

  useEffect(() => {
    console.log('focusComponentPath', focusComponentPath);
    if (JSON.stringify(currentPage.pagePath) === JSON.stringify(focusComponentPath)) {
      (textInput as HTMLTextAreaElement).focus();
    }
    autosize(textInput as HTMLTextAreaElement);
  });

  const onAddNeighbor = () => {
    props.addNeighbor(body, { currentPage, list, noteTitle });
  };

  // const onAddChild = () => {
  //   props.addChild(body, { currentPage });
  // };

  const onBecomeChild = () => {
    if (currentPage.pageId === 0) {
      return;
    }
    props.becomeChild(body, { currentPage, noteTitle });
  };

  const onLevelUp = () => {
    if (currentPage.pagePath && currentPage.pagePath.length === 1) {
      return;
    }
    props.levelUp(body, { currentPage, noteTitle });
  };

  const onRemove = () => {
    if (currentPage.nestedPages && currentPage.nestedPages.length > 0) {
      return;
    }

    if (pageContent && pageContent.length > 0) {
      return;
    }

    props.removePage(body, { currentPage, noteTitle });
  };

  const onChangeFocusElement = (direction: string = 'down') => {
    props.changeFocusElement(direction, body, { currentPage, list, noteTitle });
  };

  if (currentPage.nestedPages && currentPage.nestedPages.length > 0) {
    // делаем из вложеннех страниц компоненты
    childrenComponents = currentPage.nestedPages.map((item: IPage, index: number, arr: IPage[]) => {
      const NewPage: any = connect(mapStateToProps, mapDispatchToProps)(Page);
      return (
        <NewPage
          key={shortid.generate()}
          content={item.content}
          nestedPages={item.nestedPages}
          pagePath={item.pagePath}
          currentPage={item}
          list={arr}
          textInputHeight={item.textInputHeight}
          noteTitle={noteTitle}
        />
      );
    });
  }

  const onUpdateContent = (value: string) => {
    let currentPageLink: any = body;
    for (let i = 0; i < pagePath.length; i += 1) {
      currentPageLink = currentPageLink[pagePath[i]];
    }

    currentPageLink.content = value;
    currentPageLink.textInputHeight = (textInput as HTMLTextAreaElement).clientHeight;
  };

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value === content) {
      return;
    }

    onUpdateContent(e.target.value);
    props.updateContent(body, { noteTitle });
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e);
    console.log(e.target.value);
    let str: string = e.target.value;
    if (str && (e.nativeEvent as InputEvent).data === '[') {
      str = `${str}]`;
      setContent(str);
      e.target.selectionEnd = str.length - 5;
    } else {
      setContent(str);
    }
    autosize(textInput as HTMLTextAreaElement);
  };

  const onEnterPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const contentValue: string = (e.target as HTMLTextAreaElement).value;
    if (e.key === 'Tab') {
      e.preventDefault();
      onUpdateContent(contentValue);
      onBecomeChild();
    }
    if (e.key === 'Enter') {
      if ((contentValue && contentValue.length > 0) || currentPage.pagePath.length === 1) {
        onUpdateContent(contentValue);
        // if (currentPage.nestedPages.length > 0) {
        //   onAddChild();
        //   return;
        // }
        onAddNeighbor();
        return;
      }
      onUpdateContent('');
      onLevelUp();
    }

    if (e.key === 'Backspace') {
      onRemove();
    }

    if (e.key === 'ArrowUp') {
      onUpdateContent(contentValue);
      onChangeFocusElement('up');
    }

    if (e.key === 'ArrowDown') {
      onUpdateContent(contentValue);
      onChangeFocusElement();
    }
  };

  const toggleNestedPagesVisibility = () => {
    console.log('click');
    // showNestedPages = !showNestedPages;
    setNestedPagesVisibility(!showNestedPages);
  };

  return (
    <div className="page-container">
      <div className="current-page__controls">
        <span className="open-page__wrapper">
          <button
            type="button"
            className={`nested-pages-button ${currentPage.nestedPages.length > 0 ? 'nested-pages-button--show' : 'nested-pages-button--hidden'}`}
            onClick={toggleNestedPagesVisibility}
          >
            {showNestedPages ? <ArrowDropDown fontSize="small" htmlColor="#000" /> : <ArrowRight fontSize="small" htmlColor="#000" />}
          </button>
          <span className="open-page" />
        </span>
        <textarea
          className="text-input"
          style={{ height: `${textInputHeight}px` }}
          ref={(textarea: HTMLTextAreaElement) => { textInput = textarea; }}
          value={pageContent}
          onBlur={onBlur}
          onChange={onChangeContent}
          onKeyDown={onEnterPressHandler}
        />
        {/* <input
          type="text"
          ref={(input: HTMLInputElement) => { textInput = input; }}
          value={pageContent}
          onBlur={onBlur}
          onChange={onChangeContent}
          onKeyDown={onEnterPressHandler}
        /> */}
        {/* <button type="button" onClick={onAddNeighbor}>Add neighbor</button>
        <button type="button" onClick={onBecomeChild}>Become a child</button>
        <button type="button" onClick={onRemove}>x</button>
        <button type="button" onClick={onLevelUp}>up</button> */}
      </div>
      <div className={`nestedPages ${showNestedPages ? 'nestedPages--show' : 'nestedPages--hidden'}`}>{childrenComponents}</div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
