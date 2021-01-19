/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './dailyNotes.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RSCloneService from '../../../../services/RSClone.service';
import { INote } from '../../../../models/notes.model';
import { getDayTitle } from '../../../../helpers/notes.helper';
import { addNote } from '../../../../store/actionsCreators/actionsCreators';
import Note from '../../../note/Note';
import { getEmptyNote, selectNote } from '../../../../store/utils';

const mapStateToProps = (state: any) => ({
  notes: state.notes,
});

// eslint-disable-next-line no-unused-vars
const DailyNotes = (props: { notes: INote[], addNote(note: INote): void }) => {
  const service = new RSCloneService();

  const [notesList, setNotes] = useState<INote[]>();

  useEffect(() => {
    const getNote = async () => {
      const todayTitle: string = getDayTitle();
      let note: INote | null = selectNote(todayTitle, props.notes);

      if (!note) {
        const noteByTitle: { DATA: INote } = await service.getNoteByTitle(todayTitle);

        if (noteByTitle.DATA) {
          note = noteByTitle.DATA;
        } else {
          note = getEmptyNote(todayTitle);
          const id: string = await service.addNote(note);
          note._id = id;
        }

        props.addNote(note);
      }

      setNotes(props.notes);
    };

    getNote();
  });

  let list: any[] | null = null;

  if (notesList) {
    list = notesList.map((item: INote) => {
      const NewNote: any = connect(mapStateToProps)(Note);
      return (
        <NewNote
          key={item._id}
          id={item._id}
          title={item.title}
        />
      );
    });
  }

  return (
    <div className="daily-container">
      {list || 'loading'}
    </div>
  );
};

const mapDispatchToProps = { addNote };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DailyNotes));
