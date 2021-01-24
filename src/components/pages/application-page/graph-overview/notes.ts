const notesEx = {
  nodes: [
    {
      id: '1',
      title: 'Title1',
    },
    {
      id: '2',
      title: 'Title2',
    },
    {
      id: '3',
      title: 'Title3',
    },
    {
      id: '4',
      title: 'Title4',
    },
    {
      id: '5',
      title: 'Title5',
    },

  ],
  links: [
    {
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '5',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '1',
      target: '2',
    },

  ],
};
export default notesEx;
