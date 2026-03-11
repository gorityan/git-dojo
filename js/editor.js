import { escapeHtml } from './utils.js';

export function renderEditor(note, { onUpdate, onDelete }) {
  const area = document.getElementById('editorArea');
  area.innerHTML = `
    <div class="editor-toolbar">
      <input type="text" id="titleInput" placeholder="タイトル" value="${escapeHtml(note.title)}" />
      <button class="btn-delete" id="btnDelete">削除</button>
    </div>
    <div class="editor-body">
      <textarea id="bodyInput" placeholder="ここにメモを書く...">${escapeHtml(note.body)}</textarea>
    </div>
  `;

  document.getElementById('titleInput').addEventListener('input', onUpdate);
  document.getElementById('bodyInput').addEventListener('input', onUpdate);
  document.getElementById('btnDelete').addEventListener('click', onDelete);
  document.getElementById('titleInput').focus();
}

export function renderEmptyState() {
  document.getElementById('editorArea').innerHTML = `
    <div class="empty-state">
      <div class="icon">📄</div>
      <p>メモを選択するか、新規作成してください</p>
    </div>
  `;
}

export function getEditorValues() {
  return {
    title: document.getElementById('titleInput')?.value ?? '',
    body: document.getElementById('bodyInput')?.value ?? '',
  };
}
