import { escapeHtml, formatDate } from './utils.js';

export function renderNoteList(notes, currentId, onSelect) {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const list = document.getElementById('noteList');
  list.innerHTML = '';

  const filtered = notes
    .filter(n => !query || n.title.toLowerCase().includes(query) || n.body.toLowerCase().includes(query))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  filtered.forEach(note => {
    const item = document.createElement('div');
    item.className = 'note-item' + (note.id === currentId ? ' active' : '');
    item.innerHTML = `
      <div class="note-item-title">${escapeHtml(note.title) || '（タイトルなし）'}</div>
      <div class="note-item-preview">${escapeHtml(note.body.replace(/\n/g, ' ')) || '本文なし'}</div>
      <div class="note-item-date">${formatDate(note.updatedAt)}</div>
    `;
    item.onclick = () => onSelect(note.id);
    list.appendChild(item);
  });

  document.getElementById('noteCount').textContent = notes.length + ' 件のメモ';
}
