import { loadNotes, saveNotes } from './storage.js';
import { renderNoteList } from './noteList.js';
import { renderEditor, renderEmptyState, getEditorValues } from './editor.js';

let notes = loadNotes();
let currentId = null;

function refresh() {
  renderNoteList(notes, currentId, openNote);
}

function newNote() {
  const note = {
    id: Date.now().toString(),
    title: '',
    body: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  notes.unshift(note);
  saveNotes(notes);
  openNote(note.id);
}

function openNote(id) {
  currentId = id;
  const note = notes.find(n => n.id === id);
  if (!note) return;

  renderEditor(note, {
    onUpdate: updateNote,
    onDelete: deleteNote,
  });
  refresh();
}

function updateNote() {
  const note = notes.find(n => n.id === currentId);
  if (!note) return;
  const { title, body } = getEditorValues();
  note.title = title;
  note.body = body;
  note.updatedAt = Date.now();
  saveNotes(notes);
  refresh();
}

function deleteNote() {
  if (!confirm('このメモを削除しますか？')) return;
  notes = notes.filter(n => n.id !== currentId);
  currentId = null;
  saveNotes(notes);
  renderEmptyState();
  refresh();
}

// イベントの登録
document.getElementById('btnNew').addEventListener('click', newNote);
document.getElementById('searchInput').addEventListener('input', refresh);

// 初期表示
refresh();
