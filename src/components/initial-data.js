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
      title: 'Poniedziałek',
        itemIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'Wtorek',
        itemIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Środa',
        itemIds: [],
    },
      'column-4': {
          id: 'column-4',
          title: 'Czwartek',
          itemIds: [],
      },
      'column-5': {
          id: 'column-5',
          title: 'Piątek',
          itemIds: [],
      },
      'column-6': {
          id: 'column-6',
          title: 'Sobota',
          itemIds: [],
      },
      'column-7': {
          id: 'column-7',
          title: 'Niedziela',
          itemIds: [],
      },

  },
  columnOrder: ['column-0','column-1','column-2','column-3','column-4','column-5','column-6','column-7'],
};

export default initialData;
