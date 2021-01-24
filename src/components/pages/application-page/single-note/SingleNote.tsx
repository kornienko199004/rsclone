/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
// import React, { useEffect, useState } from 'react';
import './singleNote.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
// import RSCloneServiceContext from '../../../rsCloneServiceContext';
import RSCloneService from '../../../../services/RSClone.service';
import { INote } from '../../../../models/notes.model';
// import { getDayTitle } from '../../../../helpers/notes.helper';
import { addNote } from '../../../../store/actionsCreators/actionsCreators';
import Note from '../../../note/Note';
import { getEmptyNote, selectNote } from '../../../../store/utils';

const mapStateToProps = (state: any) => ({
  notes: state.notes,
});

// eslint-disable-next-line no-unused-vars
// const SingleNote = (props: { notes: INote[], addNote(note: INote): void }) => {
const SingleNote = (props: any) => {
  const { match } = props;
  const { params } = match;
  const { name } = params;
  const service = new RSCloneService();
  // const service: RSCloneService = useContext(RSCloneServiceContext);

  const [notesList, setNotes] = useState<INote[]>();

  useEffect(() => {
    const getNote = async () => {
      // const todayTitle: string = getDayTitle();
      let note: INote | null = selectNote(name, props.notes);
      console.log(note);
      console.log(name);

      if (!note) {
        const noteByTitle: { DATA: INote } = await service.getNoteByTitle(name);
        console.log(noteByTitle);
        if (noteByTitle.DATA) {
          note = noteByTitle.DATA;
        } else {
          note = getEmptyNote(name);
          const id: string = await service.addNote(note);
          note._id = id;
        }

        props.addNote(note);
      }

      setNotes(props.notes);
    };

    getNote();
  }, [notesList]);

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
  console.log(props);
  return (
    <Scrollbars
      autoHeight
      autoHeightMin={500}
      autoHeightMax="80vh"
      style={{
        width: 'calc(100% - 240px)', marginLeft: '240px',
      }}
    >
      <div className="daily-container">
        {list || 'loading'}
        {/* <h2>Single Note</h2> */}
      </div>
    </Scrollbars>
  );
};

const mapDispatchToProps = { addNote };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleNote));
