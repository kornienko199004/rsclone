import { INote, IPage } from '../../models/notes.model';

const DEFAULT_TEXT_INPUT_HEIGHT = 24;
const DEFAULT_PAGE_ID = 0;

const selectNote = (title: string, list: INote[]): INote | null => {
  const note = list.find((item: INote) => item.title === title);
  console.log('selectNote note', note);
  console.log('selectNote list', list);
  console.log('selectNote title', title);
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

const updateNoteByTitle = (notes: INote[], title: string, updatedBody: IPage[]): INote[] => {
  const notesCopy: INote[] = [...notes];
  const noteIndex = notesCopy.findIndex((item: INote) => item.title === title);

  const updatedNote: INote = {
    ...(selectNote(title, notes) as INote),
    body: updatedBody,
  };

  if (noteIndex > -1) {
    notesCopy.splice(noteIndex, 1, updatedNote);
  }

  return notesCopy;
};

export { selectNote, getEmptyNote, updateNoteByTitle };
