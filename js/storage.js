/* storage.js — localStorage 進捗保存（Vol.2 用 v3 キー） */
window.EscapeStorage = (function () {
  "use strict";

  const KEY_PROGRESS = "enu_escape_v2_progress:v3";
  const KEY_ENDING = "enu_escape_v2_ending:v3";

  function loadProgress() {
    try {
      const raw = localStorage.getItem(KEY_PROGRESS);
      return raw ? JSON.parse(raw) : { sceneId: 0, solvedIds: [] };
    } catch (e) {
      return { sceneId: 0, solvedIds: [] };
    }
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem(KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) { /* quota / disabled */ }
  }

  function loadEnding() {
    try {
      return localStorage.getItem(KEY_ENDING);
    } catch (e) {
      return null;
    }
  }

  function saveEnding(route) {
    try {
      localStorage.setItem(KEY_ENDING, route);
    } catch (e) { /* noop */ }
  }

  function clear() {
    try {
      localStorage.removeItem(KEY_PROGRESS);
      localStorage.removeItem(KEY_ENDING);
    } catch (e) { /* noop */ }
  }

  return { loadProgress: loadProgress, saveProgress: saveProgress,
           loadEnding: loadEnding, saveEnding: saveEnding, clear: clear };
})();
