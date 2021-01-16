/* eslint-disable react/prop-types */
import React from 'react';
// import axios from 'axios';
import shortid from 'shortid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { addNeighbor } from '../../store/actionsCreators/actionsCreators';
import Page from './page/Page';
import { IPage } from '../../models/notes.model';

class Note extends React.Component {
  getPagesComponents() {
    const { body } = this.props as any;
    const content: any[] = body.map(this.renderPage.bind(this));
    return content;
  }

  // eslint-disable-next-line class-methods-use-this
  renderPage(page: IPage, index: number, arr: IPage[]) {
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

  render() {
    console.log('render');
    // eslint-disable-next-line react/prop-types
    const { body } = (this.props as any);
    const contentFromRedux: any[] = body.map(this.renderPage.bind(this));
    return (
      <div className="main">
        <h1>Title</h1>
        {contentFromRedux}
        <Button variant="contained" color="primary" onClick={() => console.log(body)}>Save the note</Button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  body: state.body,
});

const mapDispatchToProps = { addNeighbor };

export default connect(mapStateToProps, mapDispatchToProps)(Note);
