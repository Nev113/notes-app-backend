const { addNotesHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByHandler, deleteNotesByhandler } = require('./handler');

const routes = [
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotesByhandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByHandler,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: addNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
];
module.exports = { routes };
