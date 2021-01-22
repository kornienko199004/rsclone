/* eslint-disable react/prop-types */
import React from 'react';
// import axios from 'axios';
import shortid from 'shortid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Page from './page/Page';
import { INote, IPage } from '../../models/notes.model';
import { selectNote } from '../../store/utils';
import RSCloneService from '../../services/RSClone.service';
import './note.scss';

class Note extends React.Component {
  service: RSCloneService;

  private isSaving = false;

  constructor(props: any) {
    super(props);
    this.service = new RSCloneService();
  }

  getPagesComponents() {
    const { body } = this.props as any;
    const content: any[] = body.map(this.renderPage.bind(this));
    return content;
  }

  async saveNote(currentNote: INote, id: string) {
    this.isSaving = true;
    try {
      await this.service.updateNote(currentNote, id);
      this.isSaving = false;
    } catch (e) {
      this.isSaving = false;
    }
    console.log('the note was saved');
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
    console.log('render');
    // eslint-disable-next-line react/prop-types
    const { notes, title, id } = (this.props as any);
    const currentNote: INote | null = selectNote(title, notes);

    const contentFromRedux: any[] = currentNote
      ? currentNote.body.map(this.renderPage.bind(this, title))
      : null;

    return (
      <div className="note-container">
        <h1 className="note__title">{title}</h1>
        <div className="note__pages">
          {contentFromRedux}
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={this.isSaving}
          onClick={() => this.saveNote((currentNote as INote), id)}
        >
          Save the note
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  ...props,
  notes: state.notes,
});

export default connect(mapStateToProps)(Note);
