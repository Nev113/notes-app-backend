const { nanoid } = require('nanoid');
const { notes } = require('./notes');

const addNotesHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNotes = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNotes);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Data Berhasil ditambahkan.',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Data gagal ditambahkan.',
    data: {
      noteId: id,
    },
  });
  response.code(500);
  return response;
};
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan.',
  });
  response.code(404);
  return response;
};
const editNoteByHandler = (request, h) => {
  const { id } = request.params;
  const { tags, body, header } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);
  if (index !== undefined) {
    notes[index] = {
      ...notes[index],
      tags,
      body,
      header,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Data berhasil ditambahkan.',
    });
    response.code(200);
    return response;
  };
  const response = h.response({
    status: 'fail',
    message: 'Data berhasil ditambahkan.'
  });
  response.code(404);
  return response;
};
const deleteNotesByhandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);
  if ( index !== undefined ) {
    notes.splice(notes[index], 1);
    const response = h.response({
      status: 'success',
      message: 'Data berhasil di Hapus'
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Data gagal dihapus'
  });
  response.code(404);
  return response;
}
module.exports = { addNotesHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByHandler, deleteNotesByhandler };