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
import { setCurrentNote } from '../../store/actionsCreators/actionsCreators';

class Note extends React.Component {
  service: RSCloneService;

  // eslint-disable-next-line react/state-in-constructor
  state: { isSaving: boolean };

  currentNote: INote | null;

  // private isSaving = true;

  constructor(props: any) {
    super(props);
    this.service = new RSCloneService();
    this.state = {
      isSaving: false,
    };

    const { notes, title } = (this.props as any);
    this.currentNote = selectNote(title, notes);
    props.setCurrentNote(this.currentNote);
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
  }

  titleClick(e: (React.MouseEvent | React.KeyboardEvent)) {
    e.preventDefault();
    const { title, history } = (this.props as any);
    history.push(`/app/note/${title}`);
  }

  // eslint-disable-next-line class-methods-use-this
  renderPage(title: string, page: IPage, index: number, arr: IPage[]) {
    return (
      <Page
        key={shortid.generate()}
        noteTitle={title}
        note={this.currentNote}
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
    const { title, id } = (this.props as any);
    const { isSaving } = this.state;
    // const currentNote: INote | null = selectNote(title, notes);

    const contentFromRedux: any[] = this.currentNote
      ? this.currentNote.body.map(this.renderPage.bind(this, title))
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
            onClick={() => this.saveNote((this.currentNote as INote), id)}
          >
            Save the note
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCurrentNote,
};

const mapStateToProps = (state: any, props: any) => ({
  ...props,
  notes: state.notes,
  body: state.body,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Note));
