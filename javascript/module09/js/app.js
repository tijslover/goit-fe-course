'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) {
        return note;
      }
    }
  }

  saveNote(title, text) {
    const note = {
      id: Notepad.generateUniqueId(),
      title: title,
      body: text,
      priority: PRIORITY_TYPES.LOW,
    };
    this._notes.push(note);
    return note;
  }

  deleteNote(id) {
    const updatedNotes = this._notes.filter(note => note.id !== id);
    return updatedNotes;
  }

  updateNoteContent(id, updatedContent) {
    const updatedNote = this.findNoteById(id);
    const {
      title,
      body
    } = updatedContent;

    if (!updatedNote) return;

    updatedNote.title = title;
    updatedNote.body = body;

    return updatedNote;
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;

    note.priority = priority;

    return note;
  }

  filterNotesByQuery(query) {
    const filtredNotes = this._notes.filter(note =>
      (note.title + note.body).toLowerCase().includes(query.toLowerCase())
    );
    return filtredNotes;
  }

  filterNotesByPriority(priority) {
    const filtredNotes = [];

    for (const note of this._notes) {
      if (note.priority === priority) {
        filtredNotes.push(note);
      }
    }
    return filtredNotes;
  }

  static generateUniqueId = () =>
    Math.random()
    .toString(36)
    .substring(2, 15) +
    Math.random()
    .toString(36)
    .substring(2, 15);

  static getPriorityName(priorityId) {
    const priorityValues = Object.values(this.PRIORITIES);

    for (const value of priorityValues) {
      if (value.id === priorityId) {
        return value.name;
      }
    }
  }
}

Notepad.PRIORITIES = {
  0: {
    id: 0,
    value: 0,
    name: 'Low'
  },
  1: {
    id: 1,
    value: 1,
    name: 'Normal'
  },
  2: {
    id: 2,
    value: 2,
    name: 'High'
  },
};

const initialNotes = [{
    id: 1,
    title: 'JavaScript essentials',
    body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 2,
    title: 'Refresh HTML and CSS',
    body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 3,
    title: 'Get comfy with Frontend frameworks',
    body: 'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 4,
    title: 'Winter clothes',
    body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

const notepad = new Notepad(initialNotes);
console.log(notepad.notes);

const refs = {
  list: document.querySelector('.note-list'),
  editor: document.querySelector('.note-editor'),
  searchForm: document.querySelector('.search-form'),
};

const createNoteContent = ({
  title,
  body
}) => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;

  noteContent.append(noteTitle, noteBody);

  return noteContent;
};

const createActionButton = (button, icon) => {
  const buttonPriority = document.createElement('button');
  buttonPriority.classList.add('action');
  buttonPriority.dataset.action = button;

  const iconPriority = document.createElement('i');
  iconPriority.classList.add('material-icons');
  iconPriority.classList.add('action__icon');
  iconPriority.textContent = icon;
  buttonPriority.appendChild(iconPriority);

  return buttonPriority;
};

const createFooter = ({
  priority
}) => {
  const footer = document.createElement('footer');
  footer.classList.add('note__footer');

  const section_1 = document.createElement('section');
  section_1.classList.add('note__section');
  const buttonPriorityDec = createActionButton(
    NOTE_ACTIONS.DECREASE_PRIORITY,
    ICON_TYPES.ARROW_DOWN
  );
  const buttonPriorityInc = createActionButton(
    NOTE_ACTIONS.INCREASE_PRIORITY,
    ICON_TYPES.ARROW_UP
  );
  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = priority;

  const section_2 = document.createElement('section');
  section_2.classList.add('note__section');
  const buttonPriorityEdit = createActionButton(
    NOTE_ACTIONS.EDIT,
    ICON_TYPES.EDIT
  );
  const buttonPriorityDel = createActionButton(
    NOTE_ACTIONS.DELETE,
    ICON_TYPES.DELETE
  );
  section_1.append(buttonPriorityDec, buttonPriorityInc, notePriority);
  section_2.append(buttonPriorityEdit, buttonPriorityDel);
  footer.append(section_1, section_2);

  return footer;
};

const createListItem = data => {
  const item = document.createElement('li');
  item.classList.add('note-list__item');
  item.dataset.id = data.id;
  const note = document.createElement('div');
  note.classList.add('note');
  const noteContent = createNoteContent(data);
  const footer = createFooter(data);
  note.append(noteContent, footer);

  item.appendChild(note);

  return item;
};

const renderNoteList = (list, data) => {
  const items = data.map(note => createListItem(note));

  list.innerHTML = '';
  list.append(...items);

  return list;
};

renderNoteList(refs.list, notepad.notes);

const addListItem = (list, note) => {
  const listItem = createListItem(note);
  list.appendChild(listItem);
};

const handleFormSubmit = event => {
  event.preventDefault();

  const [title, body] = event.target.elements;
  const titleValue = title.value;
  const bodyValue = body.value;

  if ((titleValue.trim() && bodyValue.trim()) === '') {
    alert('Необходимо заполнить все поля!!');
    return;
  }
  const newNote = notepad.saveNote(titleValue, bodyValue);
  addListItem(refs.list, newNote);

  event.currentTarget.reset();
};

const handleListClick = event => {
  const target = event.target;
  if (target.nodeName !== 'I') {
    return;
  }
  const button = target.closest('.action');
  const action = button.dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeListItem(event.target);
      break;

    case NOTE_ACTIONS.EDIT:
      break;
    case NOTE_ACTIONS.DECREASE_PRIORITY:
      break;
    case NOTE_ACTIONS.INCREASE_PRIORITY:
      break;
    default:
      console.log('Ошибка!!!');
      break;
  }
};

const removeListItem = button => {
  const deletedItem = button.closest('.note-list__item');
  const id = deletedItem.dataset.id;
  notepad.deleteNote(id);
  deletedItem.remove();
};

const handleFilterInput = event => {
  const value = event.target.value;
  const filteredNotes = notepad.filterNotesByQuery(value);

  renderNoteList(refs.list, filteredNotes);
};

refs.editor.addEventListener('submit', handleFormSubmit);
refs.searchForm.addEventListener('input', handleFilterInput);
refs.list.addEventListener('click', handleListClick);
