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

const updateNoteParents = (
  note: INote, title: string, content: string, currentPage: IPage,
): IParent[] => {
  // [...(note.parents || []), { pageLink: noteTitle, content: [content] }]
  console.log('updateNoteParents', note);
  if (!note.parents) {
    return [{
      pageLink: title,
      content: [
        {
          pagePath: JSON.stringify(currentPage.pagePath),
          value: content,
        },
      ],
    }];
  }

  const parentIndex: number = note.parents
    .findIndex((parent: IParent) => parent.pageLink === title);

  if (parentIndex === -1) {
    return [...note.parents,
      // { pageLink: title, content: [content] }
      {
        pageLink: title,
        content: [
          {
            pagePath: JSON.stringify(currentPage.pagePath),
            value: content,
          },
        ],
      },
    ];
  }

  const parentsCopy: IParent[] = [...note.parents];
  const contentIndex = parentsCopy[parentIndex]
    .content
    .findIndex(
      (item: {
        pagePath: string, value: string
      }) => JSON.stringify(currentPage.pagePath) === item.pagePath,
    );

  let updatedContent = [...parentsCopy[parentIndex].content];

  if (contentIndex > -1) {
    // updatedContent = parentsCopy[parentIndex].content;
    updatedContent.splice(contentIndex, 1, updatedContent[contentIndex]);
    updatedContent[contentIndex].value = content;
  } else {
    updatedContent = [...updatedContent,
      {
        pagePath: JSON.stringify(currentPage.pagePath),
        value: content,
      },
    ];
  }

  const updatedParent: IParent = {
    pageLink: parentsCopy[parentIndex].pageLink,
    content: [...updatedContent],
  };

  parentsCopy.splice(parentIndex, 1, updatedParent);
  return parentsCopy;
};

export {
  selectNote, getEmptyNote, updateNoteByTitle, updateNoteParents,
};
