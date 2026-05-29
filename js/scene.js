/* scene.js — シーン管理・遷移（View Transitions API + fallback） */
window.EscapeScene = (function () {
  "use strict";

  function clearFeedback(container) {
    const fb = container.querySelector(".feedback");
    if (fb) fb.remove();
  }

  function showFeedback(container, message, type) {
    clearFeedback(container);
    const fb = document.createElement("p");
    fb.className = "feedback feedback--" + (type || "info");
    fb.setAttribute("role", "status");
    fb.textContent = message;
    container.appendChild(fb);
  }

  function transition(callback) {
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(callback);
    } else {
      callback();
    }
  }

  function render(state) {
    const scene = state.data.getScene(state.currentSceneId);
    if (!scene) return;

    const root = document.getElementById("scene-root");
    transition(function () {
      root.innerHTML = "";
      root.setAttribute("data-phase", scene.phase);

      const wrapper = document.createElement("section");
      wrapper.className = "scene scene--" + scene.phase;

      // Header
      const header = document.createElement("header");
      header.className = "scene-header";
      const title = document.createElement("h2");
      title.className = "scene-title";
      title.textContent = scene.title;
      header.appendChild(title);

      // Progress (puzzle phase only)
      if (scene.phase === "puzzle" || scene.phase === "branch") {
        const progress = document.createElement("p");
        progress.className = "scene-progress";
        const current = scene.id;
        progress.textContent = "謎 " + current + " / " + state.data.totalPuzzles;
        header.appendChild(progress);
      }
      wrapper.appendChild(header);

      // Body
      const body = document.createElement("div");
      body.className = "scene-body";

      // Opening / Ending image
      if (scene.image) {
        const imgFig = document.createElement("figure");
        imgFig.className = "scene-image-fig";
        const img = document.createElement("img");
        img.src = scene.image;
        img.alt = scene.title;
        img.loading = "eager";
        imgFig.appendChild(img);
        body.appendChild(imgFig);
      }

      // Chat
      if (scene.chat) {
        const chatBox = document.createElement("div");
        chatBox.className = "chat-box";
        chatBox.setAttribute("aria-live", "polite");
        window.EscapeChat.render(chatBox, scene.chat);
        body.appendChild(chatBox);
      }

      // Puzzle UI
      if (scene.puzzle) {
        const puzzleBox = document.createElement("div");
        puzzleBox.className = "puzzle-box";
        window.EscapePuzzle.renderPuzzleUI(puzzleBox, scene, {
          onSubmit: function (userInput) { handleSubmit(state, scene, userInput, puzzleBox); }
        });
        body.appendChild(puzzleBox);
      }

      wrapper.appendChild(body);

      // Actions (opening / ending)
      const actions = document.createElement("div");
      actions.className = "scene-actions";
      if (scene.phase === "opening") {
        const startBtn = document.createElement("button");
        startBtn.type = "button";
        startBtn.className = "btn btn--primary";
        startBtn.textContent = "謎を解きにいく";
        startBtn.addEventListener("click", function () {
          goToScene(state, scene.onStart.nextSceneId);
        });
        actions.appendChild(startBtn);
      } else if (scene.phase === "ending") {
        const replayBtn = document.createElement("button");
        replayBtn.type = "button";
        replayBtn.className = "btn btn--primary";
        replayBtn.textContent = "もう一度遊ぶ（別エンディング）";
        replayBtn.addEventListener("click", function () { reset(state); });
        actions.appendChild(replayBtn);
      }
      wrapper.appendChild(actions);

      root.appendChild(wrapper);
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  function handleSubmit(state, scene, userInput, puzzleBox) {
    const puzzle = scene.puzzle;
    // Branch phase: 3-way ending route
    if (puzzle.type === "branch") {
      const route = window.EscapeEnding.resolveRoute(puzzle, userInput);
      if (!route) return;
      state.endingRoute = route;
      window.EscapeStorage.saveEnding(route);
      const endingScene = window.EscapeEnding.getEndingScene(state.data, route);
      if (endingScene) goToScene(state, endingScene.id);
      return;
    }

    // Normal puzzle: input / choice
    const ok = window.EscapePuzzle.check(puzzle, userInput);
    if (ok) {
      showFeedback(puzzleBox, scene.onCorrect && scene.onCorrect.qaReply ? scene.onCorrect.qaReply : "正解！", "ok");
      if (state.solvedIds.indexOf(scene.id) === -1) state.solvedIds.push(scene.id);
      window.EscapeStorage.saveProgress({ sceneId: scene.id, solvedIds: state.solvedIds });
      setTimeout(function () { goToScene(state, scene.onCorrect.nextSceneId); }, 1200);
    } else {
      showFeedback(puzzleBox, "違うようです。ヒントを見てみてください。", "ng");
    }
  }

  function goToScene(state, nextId) {
    state.currentSceneId = nextId;
    window.EscapeStorage.saveProgress({ sceneId: nextId, solvedIds: state.solvedIds });
    render(state);
  }

  function reset(state) {
    window.EscapeStorage.clear();
    state.currentSceneId = 0;
    state.solvedIds = [];
    state.endingRoute = null;
    render(state);
  }

  return { render: render, goToScene: goToScene, reset: reset };
})();
