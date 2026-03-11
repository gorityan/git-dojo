const STORAGE_KEY = 'memoapp_notes';

export function loadNotes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
