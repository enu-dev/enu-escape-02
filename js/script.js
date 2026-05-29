/* script.js — エントリーポイント */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const data = window.EscapeData;
    const progress = window.EscapeStorage.loadProgress();
    const ending = window.EscapeStorage.loadEnding();

    const state = {
      data: data,
      currentSceneId: progress.sceneId || 0,
      solvedIds: progress.solvedIds || [],
      endingRoute: ending || null
    };

    window.EscapeScene.render(state);

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (confirm("最初から始めますか？（進捗は消えます）")) {
          window.EscapeScene.reset(state);
        }
      });
    }
  });
})();
