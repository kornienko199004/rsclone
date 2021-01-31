/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './singleNote.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { CircularProgress } from '@material-ui/core';
import RSCloneService from '../../../../services/RSClone.service';
import { INote } from '../../../../models/notes.model';
import { addNote } from '../../../../store/actionsCreators/actionsCreators';
import Note from '../../../note/Note';
import { getEmptyNote } from '../../../../store/utils';
import ParentsList from '../../../note/parentsLIst/ParentsList';

const mapStateToProps = (state: any) => ({
  notes: state.notes,
});

const SingleNote = (props: any) => {
  const { match } = props;
  const { params } = match;
  const { name } = params;
  const service = new RSCloneService();

  const [singleNote, setNote] = useState<INote | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  if (singleNote && singleNote.title !== name) {
    setLoading(true);
    setNote(null);
  }

  useEffect(() => {
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
        setLoading(false);
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
    <>
      {isLoading && (
        <div className="overlay">
          <CircularProgress
            size={100}
            className="spinner"
          />
        </div>
      )}
      <Scrollbars
        autoHeight
        autoHeightMin={500}
        autoHeightMax="80vh"
        style={{
          width: 'calc(100% - 240px)', marginLeft: '240px',
        }}
      >
        <div className="daily-container">
          {note}
          {/* <h2>Single Note</h2> */}
        </div>
        <div>
          <ParentsList note={singleNote} />
        </div>
      </Scrollbars>
    </>
  );
};

const mapDispatchToProps = { addNote };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleNote));
