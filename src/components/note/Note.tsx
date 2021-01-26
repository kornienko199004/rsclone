/* eslint-disable react/prop-types */
import React from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Page from './page/Page';
import { INote, IPage } from '../../models/notes.model';
import { selectNote } from '../../store/utils';
import RSCloneService from '../../services/RSClone.service';
import './note.scss';

class Note extends React.Component {
  service: RSCloneService;

  // eslint-disable-next-line react/state-in-constructor
  state: { isSaving: boolean };

  // private isSaving = true;

  constructor(props: any) {
    super(props);
    this.service = new RSCloneService();
    this.state = {
      isSaving: false,
    };
  }

  getPagesComponents() {
    const { body } = this.props as any;
    const content: any[] = body.map(this.renderPage.bind(this));
    return content;
  }

  async saveNote(currentNote: INote, id: string) {
    this.setState({
      isSaving: true,
    });
    try {
      await this.service.updateNote(currentNote, id);
    } catch (e) {
      // this.isSaving = false;
    }
    this.setState({
      isSaving: false,
    });
    console.log('the note was saved');
  }

  titleClick(e: (React.MouseEvent | React.KeyboardEvent)) {
    e.preventDefault();
    console.log(e);
    console.log(this);
    const { title, history } = (this.props as any);
    history.push(`/app/note/${title}`);
  }

  // eslint-disable-next-line class-methods-use-this
  renderPage(title: string, page: IPage, index: number, arr: IPage[]) {
    return (
      <Page
        key={shortid.generate()}
        noteTitle={title}
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
    // eslint-disable-next-line react/prop-types
    const { notes, title, id } = (this.props as any);
    const { isSaving } = this.state;
    const currentNote: INote | null = selectNote(title, notes);

    const contentFromRedux: any[] = currentNote
      ? currentNote.body.map(this.renderPage.bind(this, title))
      : null;

    return (
      <div className="note-container">
        <h1 className="note__title">
          <a
            className="note__title-link"
            href="/"
            onClick={this.titleClick.bind(this)}
            onKeyDown={this.titleClick.bind(this)}
          >
            {title}
          </a>
        </h1>
        <div className="note__pages">
          {contentFromRedux}
        </div>
        <div className="save-button-wrapper">
          <Button
            variant="contained"
            color="primary"
            disabled={isSaving}
            onClick={() => this.saveNote((currentNote as INote), id)}
          >
            Save the note
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  ...props,
  notes: state.notes,
  body: state.body,
});

export default withRouter(connect(mapStateToProps)(Note));
