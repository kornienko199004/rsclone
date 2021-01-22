/* eslint-disable react/no-danger-with-children */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
// import { update } from 'lodash';
import autosize from 'autosize';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { IPage } from '../../../models/notes.model';
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

const mapStateToProps = (state: any, ownProps: any) => ({
  notes: state.notes,
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
    notes,
    pagePath,
    currentPage,
    list,
    focusComponentPath,
    textInputHeight,
    noteTitle,
  } = props;

  const body: IPage[] = selectNote(noteTitle, notes)?.body;
  // console.log('body', body);

  let childrenComponents = <span>{}</span>;
  const [pageContent, setContent] = useState(content);
  const [inputCursorPosition, setCursorPosition] = useState(0);
  const [showNestedPages, setNestedPagesVisibility] = useState(true);
  const [editorMode, setEditorMode] = useState(false);

  // setNestedPagesVisibility(true);
  // let showNestedPages = true;

  const textInput: HTMLTextAreaElement | null = null;

  if (
    JSON.stringify(currentPage.pagePath)
      === JSON.stringify(focusComponentPath)
    && !editorMode
  ) {
    setEditorMode(true);
  }

  useEffect(() => {
    // console.log('focusComponentPath', focusComponentPath);
    console.log('textInput', textInput);
    // if (JSON.stringify(currentPage.pagePath) ===
    // JSON.stringify(focusComponentPath) && textInput) {
    //   (textInput as HTMLTextAreaElement).focus();
    //   (textInput as HTMLTextAreaElement).selectionEnd = (textInput as HTMLTextAreaElement)
    //     .value.length;
    // }
    if (editorMode && textInput) {
      // textInput.focus();
      // textInput.selectionStart = textInput.value.length;
    }
    // autosize(textInput as HTMLTextAreaElement);
  }, [editorMode]);

  useEffect(() => {
    // console.dir('useEffect');
    // console.dir(inputCursorPosition);
    if (textInput) {
      // textInput.selectionEnd = inputCursorPosition;
    }
    // if (textInput) {
    //   console.log('textInput.selectionStart', textInput.selectionStart);
    //   const str: string = textInput.value;
    //   const { selectionStart, selectionEnd } = textInput;
    //   if (str[selectionStart - 1] === '[') {
    //     const newStrArr = str.split('');
    //     newStrArr.splice(selectionStart, 0, ']');
    //     setContent(newStrArr.join(''));
    //     return;
    //   }
    //   console.log('textInput.selectionEnd', textInput.selectionEnd);
    //   console.log('textInput.selectionStart', textInput.selectionStart);
    //   console.log('str[selectionEnd - 1]', str[selectionEnd - 1]);
    //   console.log('textInput.value.length', textInput.value.length);
    //   // console.log('textInput.value', textInput.value);
    //   if (str[selectionEnd - 1] === ']') {
    //     // textInput.selectionEnd -= 1;
    //   }
    // }
    // // if (pageContent.substr(-1) === ']' && textInput) {
    // //   console.log('textInput.selectionEnd', textInput.selectionEnd);
    // //   console.log('textInput.selectionStart', textInput.selectionStart);
    // //   console.log('textInput.value', textInput.value);
    // //   // textInput.selectionEnd -= 1;
    // //   console.log(textInput.value.match(/\[\[(.*?)\]]/g));
    // // }
  }, [inputCursorPosition]);

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
    // currentPageLink.textInputHeight = (textInput as HTMLTextAreaElement).clientHeight;
  };

  const onBlur = (editor: any, e: React.FocusEvent<HTMLTextAreaElement>) => {
    console.log('on blur');
    console.log(editor);
    console.log(editor.doc.getValue());
    console.log(e);
    // setEditorMode(false);
    if (editor.doc.getValue() === content) {
      return;
    }
    // console.log('blur', e.target.value.match(/\[\[(.*?)\]]/g));

    onUpdateContent(editor.doc.getValue());
    // props.updateContent(body, { noteTitle });
    console.log(props);
  };

  const onChangeContent = (value: any) => {
    // console.log(args);
    // console.log(e);
    // console.log(e.target.value);
    // console.log(e.target.value.match(/\[\[(.*?)\]]/g));
    // const str: string = e.target.value;
    // const { selectionStart } = e.nativeEvent.target as HTMLTextAreaElement;
    // if (str && (e.nativeEvent as InputEvent).data === '[') {
    //   // str = `${str}]`;
    //   const newStrArr = str.split('');
    //   newStrArr.splice(selectionStart, 0, ']');
    //   setContent(newStrArr.join(''));
    //   setCursorPosition(selectionStart);
    // } else {
    setContent(value);
    // }
    // // autosize(textInput as HTMLTextAreaElement);
  };

  const onEnterPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  const getHtmlMarkup = (str: string) => {
    // console.log(str);
    // const links: string[] = str.match(/\[\[(.*?)\]]/g);
    function replacer(match: any, p1: any, offset: any, string: any) {
      // console.log('match', match);
      // console.log('p1', p1);
      // console.log('offset', offset);
      // console.log('string', string);
      // console.log('string', string.replace(p1, `<a href="/">${p1}</a>`));
      const newString = string.replace(p1, `<a href="/">${p1}</a>`);
      return `[[<a href="/">${p1}</a>]]`;
    }
    const newStr = str.replace(/\[\[(.*?)\]]/g, replacer);
    return newStr;
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
        {/* {editorMode ? (
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
            onClick={() => {
              console.log('click');
              setEditorMode(true);
            }}
            content={getHtmlMarkup(pageContent)}
          />
        )} */}

        <CodeMirror
          className="codemirror-markdown-editor"
          value={pageContent}
          options={{
            mode: 'markdown',
            theme: 'material',
            lineNumbers: false,
          }}
          // onChange={(editor, data, value) => { onChangeContent(editor, data, value); }}
          onBeforeChange={(editor, data, value) => { onChangeContent(value); }}
          onBlur={onBlur}
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
