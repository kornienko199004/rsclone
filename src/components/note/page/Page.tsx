/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
// import { update } from 'lodash';
import { Link } from 'react-router-dom';
import autosize from 'autosize';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { IAstElement, IPage } from '../../../models/notes.model';
import './page.scss';

// eslint-disable-next-line import/extensions
import {
  addNeighbor,
  becomeChild,
  removePage,
  levelUp,
  updateContent,
  addChild,
  changeFocusElement, // @ts-ignore
} from '../../../store/actionsCreators/actionsCreators';
import { selectNote } from '../../../store/utils';
import TemplateReadOnly from '../pageReadOnly/PageReadOnly';
import { generateAst, getHtmlMarkup, getLinkContent } from '../../../helpers/notes.helper';

const mapStateToProps = (state: any, ownProps: any) => ({
  notes: state.notes,
  body: state.body,
  focusComponentPath: state.focusComponentPath,
  ...ownProps,
});

const mapDispatchToProps = {
  addNeighbor,
  becomeChild,
  removePage,
  levelUp,
  updateContent,
  addChild,
  changeFocusElement,
};

function Page(props: any) {
  const {
    content,
    note,
    notes,
    pagePath,
    currentPage,
    list,
    focusComponentPath,
    textInputHeight,
    noteTitle,
  } = props;

  const body: IPage[] = selectNote(noteTitle, notes)?.body;

  let childrenComponents = <span>{}</span>;
  const [pageContent, setContent] = useState(content);
  const [inputCursorPosition, setCursorPosition] = useState(0);
  const [showNestedPages, setNestedPagesVisibility] = useState(true);
  const [editorMode, setEditorMode] = useState(false);

  let textInput: HTMLTextAreaElement | null = null;

  if (
    JSON.stringify({ [noteTitle]: currentPage.pagePath })
      === JSON.stringify(focusComponentPath)
    && !editorMode
  ) {
    setEditorMode(true);
  }

  useEffect(() => {
    if (
      JSON.stringify({ [noteTitle]: currentPage.pagePath }) === JSON.stringify(focusComponentPath)
      && textInput
    ) {
      (textInput as HTMLTextAreaElement).focus();
      (textInput as HTMLTextAreaElement).selectionEnd = (textInput as HTMLTextAreaElement)
        .value.length;
      (textInput as HTMLTextAreaElement).selectionStart = (textInput as HTMLTextAreaElement)
        .value.length;
      return;
    }
    if (editorMode && textInput) {
      textInput.focus();
    }
    autosize(textInput as HTMLTextAreaElement);
  }, [editorMode]);

  useEffect(() => {
    if (textInput) {
      textInput.selectionStart = inputCursorPosition;
      // textInput.focus();
      textInput.selectionEnd = inputCursorPosition;
    }
  }, [inputCursorPosition]);

  const onAddNeighbor = () => {
    props.addNeighbor(body, { currentPage, list, noteTitle });
  };

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

    if (currentPage.pagePath.length === 1 && currentPage.pagePath[0] === 0) {
      return;
    }
    props.removePage(body, { currentPage, noteTitle });
  };

  const onChangeFocusElement = (direction: string = 'down') => {
    props.changeFocusElement(direction, body, { currentPage, list, noteTitle });
  };

  if (currentPage.nestedPages && currentPage.nestedPages.length > 0) {
    // делаем из вложеннех страниц компоненты
    childrenComponents = currentPage.nestedPages.map(
      (item: IPage, index: number, arr: IPage[]) => {
        const NewPage: any = connect(mapStateToProps, mapDispatchToProps)(Page);
        return (
          <NewPage
            key={shortid.generate()}
            content={item.content}
            nestedPages={item.nestedPages}
            pagePath={item.pagePath}
            currentPage={item}
            list={arr}
            note={note}
            textInputHeight={item.textInputHeight}
            noteTitle={noteTitle}
          />
        );
      },
    );
  }

  const onUpdateContent = (value: string) => {
    let currentPageLink: any = body;
    for (let i = 0; i < pagePath.length; i += 1) {
      currentPageLink = currentPageLink[pagePath[i]];
    }

    currentPageLink.content = value;
    currentPageLink.textInputHeight = (textInput as HTMLTextAreaElement).clientHeight;
    const pageLinks = value.match(/\[\[(.*?)\]]/g);
    props.updateContent(body, {
      noteTitle, pageLinks, content: value, currentNote: note, currentPage,
    });
  };

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setEditorMode(false);
    if (e.target.value === content) {
      return;
    }

    onUpdateContent(e.target.value);
    // const pageLinks = e.target.value.match(/\[\[(.*?)\]]/g);
    // props.updateContent(body, { noteTitle, pageLinks, content: e.target.value });
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const str: string = (e.target as HTMLTextAreaElement).value;
    const { selectionStart } = e.nativeEvent.target as HTMLTextAreaElement;
    if (str && (e.nativeEvent as InputEvent).data === '[') {
      const newStrArr = str.split('');
      newStrArr.splice(selectionStart, 0, ']');
      setContent(newStrArr.join(''));
      setCursorPosition(selectionStart);
    } else {
      setContent(str);
    }
    autosize(textInput as HTMLTextAreaElement);
  };

  const onEnterPressHandler = (e: any) => {
    const contentValue: string = (e.target as HTMLTextAreaElement).value;
    if (e.key === 'Tab') {
      e.preventDefault();
      onUpdateContent(contentValue);
      onBecomeChild();
    }
    if (e.key === 'Enter') {
      if (
        (contentValue && contentValue.length > 0)
        || currentPage.pagePath.length === 1
      ) {
        onUpdateContent(contentValue);
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
    setNestedPagesVisibility(!showNestedPages);
  };

  return (
    <div className="page-container">
      <div className="current-page__controls">
        <span className="open-page__wrapper">
          <button
            type="button"
            className={`nested-pages-button ${
              currentPage.nestedPages.length > 0
                ? 'nested-pages-button--show'
                : 'nested-pages-button--hidden'
            }`}
            onClick={toggleNestedPagesVisibility}
          >
            {showNestedPages ? (
              <ArrowDropDown fontSize="small" htmlColor="#000" />
            ) : (
              <ArrowRight fontSize="small" htmlColor="#000" />
            )}
          </button>
          <span className="open-page" />
        </span>
        {editorMode ? (
          <textarea
            className="text-input"
            style={{ height: `${textInputHeight}px` }}
            ref={(textarea: HTMLTextAreaElement) => {
              textInput = textarea;
            }}
            value={pageContent}
            onBlur={onBlur}
            onChange={onChangeContent}
            onKeyDown={onEnterPressHandler}
          />
        ) : (
          <TemplateReadOnly
            onClick={(e: any) => {
              const offset = e.clientX - e.target.getBoundingClientRect().x;
              setEditorMode(true);
              // setCursorPosition(offset / 7.5);
              if (textInput) {
                textInput.focus();
              }
            }}
          >
            {getHtmlMarkup(generateAst(pageContent))}
          </TemplateReadOnly>
        )}
      </div>
      <div
        className={`nestedPages ${
          showNestedPages ? 'nestedPages--show' : 'nestedPages--hidden'
        }`}
      >
        {childrenComponents}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
