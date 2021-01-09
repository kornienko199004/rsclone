/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import React, { KeyboardEvent } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { connect } from 'react-redux';
// import shortid from 'shortid';
// import TemplateReadOnly from './pageReadOnly/PageReadOnly';
import Page from './page/Page';
// @ts-ignore
// eslint-disable-next-line import/extensions
import action1 from '~/store/actionsCreators';

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

// const templateInput = (value: string, clb: IInputHandler, changeHandle: any) => {
//   console.log(value);
//   return (
//     <div key={shortid.generate()}>
//       <button type="button">Открыть</button>
//       <input type="text" onKeyDown={clb} value={value} onChange={changeHandle} />
//     </div>
//   );
// };

// const PAGE_ID_SEPARATOR = '_';

// const templateReadOnly = (content: string) => (
//   <div key={shortid.generate()}>
//     <button type="button">Открыть</button>
//     <button type="button">Add child</button>
//     <button type="button">Add neighbor</button>
//     <p className="content">{content}</p>
//   </div>
// );

class Note extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state: IState;

  constructor(props: { [k: string]: any }) {
    super(props);
    this.state = {
      title: '',
      input: '',
      content: [],
      pagesIdCount: 0,
      // children: [],
      body: [{
        pageId: 0,
        pageLink: '',
        pagePath: [],
        content: 'some content',
        neighbors: [],
        nestedPages: [],
      }],
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:3000/api/note/5ff7612eb67c1f2d24405756');
      const data: INote = res.data.DATA;

      this.setState((state: IState) => {
        const content = this.getPagesComponents(state);
        return {
          title: data.title,
          content,
        };
      });
    } catch (e) {
      this.setState({
        title: 'no title',
      });
    }
  }

  handleChange(event: any) {
    this.setState({ input: event.target.value });
  }

  onEnterPressHandler(e: KeyboardEvent<HTMLInputElement>) {
    const page: IPage = {
      pageId: 0,
      pageLink: '',
      pagePath: [0],
      content: 'some content',
      neighbors: [],
      nestedPages: [],
    };
    if (e.key === 'Tab') {
      e.preventDefault();
      // this.addChild(page);
    }
    if (e.key === 'Enter') {
      this.addNeighbor(page);
    }
  }

  // eslint-disable-next-line react/sort-comp
  renderPage(page: IPage) {
    // return (
    //   <div>
    //     <TemplateReadOnly
    //       content={page.content}
    //       onAddNeighbor={() => this.addNeighbor(page)}
    //     />
    //     {page.children.map(this.renderPage)}
    //   </div>
    // );
    // console.log(this);
    return (
      <Page
        key={shortid.generate()}
        content={page.content}
        nestedPages={page.nestedPages}
        // eslint-disable-next-line react/jsx-no-bind
        onAddNeighbor={(neighbor: IPage) => this.addNeighbor(neighbor)}
        // eslint-disable-next-line react/jsx-no-bind
        onAddChild={(child: IPage) => this.addChild(page, child)}
        becomeChild={() => this.becomeChild(page)}
      // onAddNeighbor={() => { console.log(this); }}
      />
    );
  }

  getPagesComponents(state: IState) {
    const { body } = state;
    console.log(body);
    // let content = [templateInput(body.content, this.onEnterPressHandler.bind(this))];
    const content: any[] = body.map(this.renderPage.bind(this));

    // if (body.length > 0) {
    //   content = [TemplateReadOnly(body.content)];
    // } else {
    //   // this.setState({
    //   //   input: body.content,
    //   // });
    //   content = [
    //     templateInput(
    //       input, this.onEnterPressHandler.bind(this), this.handleChange.bind(this),
    //     ),
    //   ];
    // }

    // body.forEach((item: IPage) => {
    //   content = [
    //     ...content,
    //     <div className="child" key={shortid.generate()}>
    //       <TemplateReadOnly content={item.content} />

    //       {item.children.map((child: IPage) => item)}
    //     </div>];
    // });

    // body.neighbors.forEach((item: IPage, index: number, arr: IPage[]) => {
    //   if (index === arr.length - 1) {
    //     // this.setState({
    //     //   input: body.content,
    //     // });
    //     content = [
    //       ...content,
    //       templateInput(
    //         // eslint-disable-next-line react/destructuring-assignment
    //         this.state.input, this.onEnterPressHandler.bind(this), this.handleChange.bind(this),
    //       ),
    //     ];
    //   } else {
    //     content = [
    //       ...content,
    //       <TemplateReadOnly
    //         content={item.content}
    //         onAddNeighbor={() => this.addNeighbor(item)}
    //       />,
    //     ];
    //   }
    // });
    return content;
  }

  private addNeighbor(page: IPage) {
    /*
      find page by id and update
    */
    console.log('addNeighbor', page);
    this.setState((state: IState) => {
      // const newChildren: IPage[] = [
      //   ...state.children,
      //   template(this.onEnterPressHandler.bind(this)),
      // ];
      const { body, pagesIdCount } = state;
      const newPagesIdCount = pagesIdCount + 1;

      // const currentId = Number(page.pageId.split('_').slice(-1)[0]);
      // const pageIds: string[] = page.pageId.split(PAGE_ID_SEPARATOR);
      // const levelCurrentId: number = Number(pageIds.slice(-1)[0]);
      const currentId = body.length - 1;
      const newtId = currentId + 1;

      const newNeighbor: IPage = {
        // pageId: `${pageIds.slice(0, -1).join(PAGE_ID_SEPARATOR)}_${levelCurrentId + 1}`,
        pageId: newtId,
        pageLink: '',
        pagePath: [...page.pagePath, 'neighbors', newtId],
        content: `${newtId} some content`,
        neighbors: [],
        nestedPages: [],
      };

      // const newNeighbors = [...state.body.neighbors, newNeighbor];
      // const updatedPage: IPage = {
      //   ...page,
      //   neighbors: [...page.neighbors, newNeighbor],
      // };
      // const newNeighbors = [...state.body.neighbors, newNeighbor];
      const newBody: IPage[] = [
        ...body,
        newNeighbor,
      ];

      const content = this.getPagesComponents({
        ...state,
        body: newBody,
      });
      return {
        ...state,
        body: newBody,
        content,
        pagesIdCount: newPagesIdCount,
      };
    });
  }

  private becomeChild(page: IPage) {
    this.setState((state: IState) => {
      const { body } = state;
      const pageIndex = page.pageId;
      if (pageIndex === 0) {
        return state;
      }

      let parentPage: IPage = body[pageIndex - 1];

      // необходимо обновить pageId страницы, которая стала ребенком
      const child: IPage = {
        ...page,
        content: `${parentPage.nestedPages.length} some content`,
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
          ...body.slice(0, pageIndex - 1),
          parentPage,
          ...body.slice(pageIndex + 1).map(this.updatePageIndex),
        ];
      } else {
        newBody = [parentPage, ...body.slice(2).map(this.updatePageIndex)];
      }
      const content = this.getPagesComponents({
        ...state,
        body: newBody,
      });
      return {
        ...state,
        body: newBody,
        content,
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private updatePageIndex(page: IPage) {
    return {
      ...page,
      pageId: page.pageId - 1,
    };
  }

  private addChild(page: IPage, child: IPage) {
    this.setState((state: IState) => {
      const { body } = state;
      const pageIndex = page.pageId;
      // eslint-disable-next-line no-debugger
      // debugger;
      let newPage = body[pageIndex];
      const updatedChild: IPage = {
        ...child,
        pageId: newPage.nestedPages.length,
        content: `${newPage.nestedPages.length} some content`,
      };
      newPage = {
        ...newPage,
        nestedPages: [...newPage.nestedPages, updatedChild],
      };

      let newBody: IPage[];
      if (pageIndex > 0) {
        newBody = [...body.slice(0, pageIndex), newPage, ...body.slice(pageIndex + 1)];
      } else if (pageIndex === body.length - 1) {
        newBody = [...body.slice(0, -1), newPage];
      } else {
        newBody = [newPage, ...body.slice(1)];
      }
      const content = this.getPagesComponents({
        ...state,
        body: newBody,
      });
      return {
        ...state,
        body: newBody,
        content,
      };
    });
    // this.setState((state: IState) => {
    //   const { body, pagesIdCount } = state;
    //   const newPagesIdCount = pagesIdCount + 1;

    //   const newChild: IPage = {
    //     pageId: 0,
    //     pageLink: '',
    //     pagePath: [],
    //     content: 'some content',
    //     neighbors: [],
    //     nestedPages: [],
    //   };

    //   const newChildren = [...body.children, newChild];
    //   const newBody: IPage = {
    //     ...body,
    //     nestedPages: newChildren,
    //   };

    //   const content = this.getPagesComponents({
    //     ...state,
    //     body: newBody,
    //   });
    //   return {
    //     ...state,
    //     body: newBody,
    //     content,
    //     pagesIdCount: newPagesIdCount,
    //   };
    // });
  }

  showBody() {
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.state.body);
  }

  render() {
    console.log('render');
    // eslint-disable-next-line react/destructuring-assignment
    const { title, content } = this.state;
    console.log(content);
    // const children = (
    //   <div>
    //     <button type="button">Открыть страницу</button>
    //     <input type="text" onKeyUp={this.onEnterPressHandler.bind(this)} />
    //   </div>
    // );

    // const { children } = this.state;
    // console.log(children);
    // const content = template(body.content, this.onEnterPressHandler.bind(this));
    // const content = this.getPagesComponents();
    // console.log(content);
    // if (children.length === 0) {
    //   children.push(<div key={Date.now()}>{template(this.onEnterPressHandler.bind(this))}</div>);
    //   console.log(children);
    // }
    // eslint-disable-next-line react/no-array-index-key
    // children = children.map((item: any, index: number) => (<div key={index}>{item}</div>));

    // const page: IPage = {
    //   pageId: 0,
    //   pageLink: '',
    //   pagePath: [],
    //   content: 'some content',
    //   neighbors: [],
    //   nestedPages: [],
    // };

    // eslint-disable-next-line react/prop-types
    const { value } = (this.props as any);
    return (
      <div className="main">
        <h1>{title}</h1>
        <p><b>{value}</b></p>
        <button type="button" onClick={(this.props as any).action1}>Dispatch action</button>
        {/* <button type="button" onClick={this.addNeighbor.bind(this, page)}>Add Neightbor</button>
        <button type="button" onClick={this.addChild.bind(this)}>Add Child</button>
        <button type="button" onClick={this.showBody.bind(this)}>Show body</button> */}
        {/* <input
          type="text"
          onKeyDown={this.onEnterPressHandler.bind(this)}
          value={input}
          onChange={this.handleChange.bind(this)}
        /> */}
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  value: state.value,
});

const mapDispatchToProps = { action1 };

export default connect(mapStateToProps, mapDispatchToProps)(Note);
