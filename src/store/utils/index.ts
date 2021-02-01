import { INote, IPage, IParent } from '../../models/notes.model';

const DEFAULT_TEXT_INPUT_HEIGHT = 24;
const DEFAULT_PAGE_ID = 0;

const selectNote = (title: string, list: INote[]): INote | null => {
  console.log(list);
  const note = list.find((item: INote) => item.title === title);
  return note || null;
};

const getEmptyNote = (title: string): INote => ({
  title,
  body: [
    {
      pageId: DEFAULT_PAGE_ID,
      pageLink: '',
      pagePath: [DEFAULT_PAGE_ID],
      content: '',
      neighbors: [],
      nestedPages: [],
      textInputHeight: DEFAULT_TEXT_INPUT_HEIGHT,
    },
  ],
});
// state.notes, action.title, action.body, action.pageLinks
const updateNoteByTitle = (
  notes: INote[],
  title: string,
  updatedBody: IPage[],
  pageLinks: any[],
): INote[] => {
  const notesCopy: INote[] = [...notes];
  const noteIndex = notesCopy.findIndex((item: INote) => item.title === title);

  const selectedNote = selectNote(title, notes);

  const updatedNote: INote = {
    ...(selectedNote as INote),
    body: updatedBody,
    parents: [...((selectedNote as INote).parents || []), ...pageLinks],
  };

  if (noteIndex > -1) {
    notesCopy.splice(noteIndex, 1, updatedNote);
  }

  return notesCopy;
};

const updateNoteParents = (note: INote, title: string, content: string): IParent[] => {
  // [...(note.parents || []), { pageLink: noteTitle, content: [content] }]
  if (!note.parents) {
    return [{ pageLink: title, content: [content] }];
  }

  const parentIndex: number = note.parents.indexOf((parent: IParent) => parent.pageLink === title);

  if (parentIndex === -1) {
    return [...note.parents, { pageLink: title, content: [content] }];
  }

  const parentsCopy: IParent[] = [...note.parents];

  const updatedParent: IParent = {
    pageLink: parentsCopy[parentIndex].pageLink,
    content: [...parentsCopy[parentIndex].content, content],
  };

  parentsCopy.splice(parentIndex, 1, updatedParent);
  return parentsCopy;
};

export {
  selectNote, getEmptyNote, updateNoteByTitle, updateNoteParents,
};
