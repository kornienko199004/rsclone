/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import React, { KeyboardEvent } from 'react';
// import axios from 'axios';
import shortid from 'shortid';
import { connect } from 'react-redux';
// import shortid from 'shortid';
// import TemplateReadOnly from './pageReadOnly/PageReadOnly';
// @ts-ignore
// eslint-disable-next-line import/extensions
import { addNeighbor } from '../../store/actionsCreators/actionsCreators.ts';
import Page from './page/Page';

export interface INote {
  _id?: string;
  title: string;
  parents?: any[];
  body: any;
}

export interface IPage {
  pageId: number;
  pageLink: string;
  pagePath: (number | string)[];
  content: string;
  nestedPages: IPage[];
  neighbors: IPage[];
  textInputHeight: number;
}

// const body: IPage = {
//   pageLink: 'level 0',
//   pagePath: [],
//   children: [],
// };

export interface IState {
  title: string;
  input: string;
  // children: any[];
  body: IPage[];
  content: any[];
  pagesIdCount: number;
}

export interface IInputHandler {
  // eslint-disable-next-line no-unused-vars
  (e: KeyboardEvent<HTMLInputElement>): void;
}

class Note extends React.Component {
  // eslint-disable-next-line react/sort-comp
  renderPage(page: IPage, index: number, arr: IPage[]) {
    // console.log(this);
    return (
      <Page
        key={shortid.generate()}
        content={page.content}
        nestedPages={page.nestedPages}
        pagePath={page.pagePath}
        currentPage={page}
        list={arr}
        textInputHeight={page.textInputHeight}
      />
    );
  }

  getPagesComponents() {
    const { body } = this.props as any;
    const content: any[] = body.map(this.renderPage.bind(this));
    return content;
  }

  render() {
    console.log('render');

    // eslint-disable-next-line react/prop-types
    const { body } = (this.props as any);
    const contentFromRedux: any[] = body.map(this.renderPage.bind(this));
    return (
      <div className="main">
        <h1>Title</h1>
        {contentFromRedux}
        <button type="button" onClick={() => console.log(body)}>Save the note</button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  body: state.body,
});

const mapDispatchToProps = { addNeighbor };

export default connect(mapStateToProps, mapDispatchToProps)(Note);
