/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import RSCloneService from '../../../../services/RSClone.service';
import { INote } from '../../../../models/notes.model';
import { addNote, toggleLoader } from '../../../../store/actionsCreators/actionsCreators';
import Note from '../../../note/Note';
import { getEmptyNote } from '../../../../store/utils';
import ParentsList from '../../../note/parentsLIst/ParentsList';

const mapStateToProps = (state: any) => ({
  notes: state.notes,
  sidebarIsOpen: state.sidebarIsOpen,
});

const SingleNote = (props: any) => {
  const { match, sidebarIsOpen } = props;
  const { params } = match;
  const { name } = params;
  const service = new RSCloneService();

  const [singleNote, setNote] = useState<INote | null>(null);

  if (singleNote && singleNote.title !== name) {
    props.toggleLoader(true);
    setNote(null);
  }

  useEffect(() => {
    props.toggleLoader(true);
    const getNote = async () => {
      let note: INote | null = singleNote;

      if (!singleNote) {
        const noteByTitle: { DATA: INote } = await service.getNoteByTitle(name);
        if (noteByTitle.DATA) {
          note = noteByTitle.DATA;
        } else {
          note = getEmptyNote(name);
          const id: string = await service.addNote(note);
          note._id = id;
        }

        setNote(note);
        props.addNote(note);
        props.toggleLoader(false);
      }
    };

    getNote();
  }, [singleNote]);

  let note: any | null = null;

  if (singleNote) {
    const NewNote: any = connect(mapStateToProps)(Note);
    note = (
      <NewNote
        key={singleNote._id}
        id={singleNote._id}
        title={singleNote.title}
      />
    );
  }

  return (
    <Scrollbars
      autoHeight
      autoHeightMin={500}
      autoHeightMax="80vh"
      style={{
        width: sidebarIsOpen ? 'calc(100% - 240px)' : '100%', marginLeft: sidebarIsOpen ? '240px' : '0',
      }}
    >
      <div className="daily-container">
        {note}
      </div>
      <div>
        <ParentsList note={singleNote} />
      </div>
    </Scrollbars>
  );
};

const mapDispatchToProps = {
  addNote,
  toggleLoader,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleNote));
