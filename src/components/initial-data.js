const initialData = {
  recipeList: {},
  scheduleItemList: {},
  columns: {
    'column-0': {
      id: 'column-0',
      title: 'Przepisy',
        itemIds: [],
    },
    'column-1': {
      id: 'column-1',
      title: 'poniedziałek',
        itemIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'wtorek',
        itemIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'środa',
        itemIds: [],
    },
      'column-4': {
          id: 'column-4',
          title: 'czwartek',
          itemIds: [],
      },
      'column-5': {
          id: 'column-5',
          title: 'piątek',
          itemIds: [],
      },
      'column-6': {
          id: 'column-6',
          title: 'sobota',
          itemIds: [],
      },
      'column-7': {
          id: 'column-7',
          title: 'niedziella',
          itemIds: [],
      },

  },
  columnOrder: ['column-0','column-1','column-2','column-3','column-4','column-5','column-6','column-7'],
};

export default initialData;
