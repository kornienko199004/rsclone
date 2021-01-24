/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './dailyNotes.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
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
  const { notes } = props;
  const service = new RSCloneService();
  const todayTitle: string = getDayTitle();
  let scrollEnd = false;

  const [notesList, setNotes] = useState<INote[]>(notes.filter((note: INote) => note.isDaily));
  const [init, setInit] = useState<boolean>(false);
  // const [scrollEnd, setScrollEnd] = useState<boolean>(false);
  // eslint-disable-next-line react/destructuring-assignment
  console.log('props.notes', notes.filter((note: INote) => note.isDaily));
  const todayNote = selectNote(todayTitle, notes);
  console.log('todayNote', todayNote);
  console.log('notes', notes);
  // console.log('todayNote', todayNote);

  if (!todayNote && !init) {
    setInit(true);
    // console.log(setInit);
  }

  useEffect(() => {
    console.log('init');
    if (init) {
      const getNote = async () => {
        // const todayTitle: string = getDayTitle();
        let note: INote | null = selectNote(todayTitle, props.notes);
        console.log(note);

        if (!note) {
          console.log(localStorage.getItem('auth-token'));
          const noteByTitle: { DATA: INote } = await service.getNoteByTitle(todayTitle);
          console.log(noteByTitle);
          if (noteByTitle.DATA) {
            note = noteByTitle.DATA;
          } else {
            note = getEmptyNote(todayTitle);
            note.isDaily = true;
            const id: string = await service.addNote(note);
            note._id = id;
          }

          props.addNote(note);
        }

        setNotes([...(notesList || []), note]);
        // setNotes(props.notes);
      };

      getNote();
    }
  }, [init]);

  // useEffect(() => {
  //   if (scrollEnd) {
  //     const onScrollEnd = async () => {
  //       if (notesList && notesList.length > 0) {
  //         // scrollEnd = true;
  //         console.log('scrollEnd');
  //         const lastPageId = notesList.slice(-1)[0]._id;
  //         const res = await service.getPreviousDailyNote(lastPageId as string);
  //         const note = res.DATA;
  //         console.log(note);
  //         if (note) {
  //           setScrollEnd(false);
  //           props.addNote(note);
  //           setNotes([...(notesList || []), note]);
  //         }
  //       }
  //     };

  //     onScrollEnd();
  //   }
  // }, [scrollEnd]);

  const onScrollEnd = async () => {
    if (notesList && notesList.length > 0 && !scrollEnd) {
      scrollEnd = true;
      console.log('scrollEnd');
      const lastPageId = notesList.slice(-1)[0]._id;
      const res = await service.getPreviousDailyNote(lastPageId as string);
      const note = res.DATA;
      console.log(note);
      if (note) {
        scrollEnd = false;
        props.addNote(note);
        setNotes([...(notesList || []), note]);
      }
    }
  };

  // const handleUpdate = (values: any) => {
  //   if (!scrollEnd) {
  //     const { scrollTop, scrollHeight, clientHeight } = values;
  //     console.log('values', values);
  //     const pad = 1; // 100px of the bottom
  //     // t will be greater than 1 if we are about to reach the bottom
  //     const t = ((scrollTop + pad) / (scrollHeight - clientHeight));
  //     if (t > 1) {
  //       console.log('scrollEnd');
  //       setScrollEnd(true);
  //       // onScrollEnd();
  //     }
  //   }
  // };

  const onScrollStop = (values: any) => {
    // console.log('values render view', values);
    if (!scrollEnd) {
      const { scrollTop, scrollHeight, clientHeight } = values.srcElement;
      const pad = 1; // 100px of the bottom
      // t will be greater than 1 if we are about to reach the bottom
      const t = ((scrollTop + pad) / (scrollHeight - clientHeight));
      if (t > 1) {
        // setScrollEnd(true);
        onScrollEnd();
      }
    }
  };
  let list: any[] | null = null;

  if (notesList) {
    list = notesList
      .filter((note: INote) => note.isDaily)
      .map((item: INote) => {
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
    <Scrollbars
      autoHeight
      autoHeightMin={500}
      autoHeightMax="80vh"
      style={{
        width: 'calc(100% - 240px)', marginLeft: '240px',
      }}
      onScroll={onScrollStop}
    >
      <div className="daily-container">
        {list || 'loading'}
      </div>
    </Scrollbars>
  );
};

const mapDispatchToProps = { addNote };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DailyNotes));
