/* puzzle.js — 謎の判定・ヒント・入力UI */
window.EscapePuzzle = (function () {
  "use strict";

  function normalize(s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, "");
  }

  function check(puzzle, userInput) {
    if (puzzle.type === "input") {
      const norm = normalize(userInput);
      const answers = Array.isArray(puzzle.answer) ? puzzle.answer : [puzzle.answer];
      return answers.some(function (a) { return normalize(a) === norm; });
    }
    if (puzzle.type === "choice") {
      return userInput === puzzle.answer;
    }
    return false;
  }

  function renderPuzzleUI(container, scene, callbacks) {
    container.innerHTML = "";
    const puzzle = scene.puzzle;
    if (!puzzle) return;

    // Clue image(s)
    if (puzzle.clueImages) {
      const imgWrap = document.createElement("div");
      imgWrap.className = "puzzle-clue-images";
      puzzle.clueImages.forEach(function (src, i) {
        const fig = document.createElement("figure");
        fig.className = "puzzle-clue-fig";
        const img = document.createElement("img");
        img.src = src;
        img.alt = "ヒント画像 " + String.fromCharCode(65 + i);
        img.loading = "lazy";
        const cap = document.createElement("figcaption");
        cap.textContent = String.fromCharCode(65 + i);
        fig.appendChild(img);
        fig.appendChild(cap);
        imgWrap.appendChild(fig);
      });
      container.appendChild(imgWrap);
    } else if (puzzle.clueImage) {
      const fig = document.createElement("figure");
      fig.className = "puzzle-clue-fig puzzle-clue-fig--single";
      const img = document.createElement("img");
      img.src = puzzle.clueImage;
      img.alt = "ヒント画像";
      img.loading = "lazy";
      fig.appendChild(img);
      container.appendChild(fig);
    }

    // Question
    const q = document.createElement("p");
    q.className = "puzzle-question";
    q.textContent = puzzle.question;
    container.appendChild(q);

    // Input form
    const form = document.createElement("form");
    form.className = "puzzle-form";
    form.setAttribute("novalidate", "");

    if (puzzle.type === "choice" || puzzle.type === "branch") {
      const choicesWrap = document.createElement("div");
      choicesWrap.className = "puzzle-choices";
      puzzle.choices.forEach(function (choice) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "puzzle-choice";
        btn.textContent = choice;
        btn.addEventListener("click", function () {
          callbacks.onSubmit(choice);
        });
        choicesWrap.appendChild(btn);
      });
      form.appendChild(choicesWrap);
    } else if (puzzle.type === "input") {
      const inputWrap = document.createElement("div");
      inputWrap.className = "puzzle-input-row";
      const input = document.createElement("input");
      input.type = "text";
      input.className = "puzzle-input";
      input.setAttribute("aria-label", "答えを入力");
      input.setAttribute("autocomplete", "off");
      const submit = document.createElement("button");
      submit.type = "submit";
      submit.className = "puzzle-submit";
      submit.textContent = "回答";
      inputWrap.appendChild(input);
      inputWrap.appendChild(submit);
      form.appendChild(inputWrap);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        callbacks.onSubmit(input.value);
      });
    }

    // Hints
    if (puzzle.hints && puzzle.hints.length > 0) {
      const hintsWrap = document.createElement("div");
      hintsWrap.className = "puzzle-hints";
      let hintIndex = 0;
      const hintBtn = document.createElement("button");
      hintBtn.type = "button";
      hintBtn.className = "puzzle-hint-btn";
      hintBtn.textContent = "ヒントを見る";
      const hintLog = document.createElement("ul");
      hintLog.className = "puzzle-hint-log";
      hintBtn.addEventListener("click", function () {
        if (hintIndex >= puzzle.hints.length) {
          hintBtn.textContent = "ヒント尽きました";
          hintBtn.disabled = true;
          return;
        }
        const li = document.createElement("li");
        li.textContent = puzzle.hints[hintIndex];
        hintLog.appendChild(li);
        hintIndex++;
        if (hintIndex >= puzzle.hints.length) {
          hintBtn.textContent = "ヒント尽きました";
          hintBtn.disabled = true;
        }
      });
      hintsWrap.appendChild(hintBtn);
      hintsWrap.appendChild(hintLog);
      form.appendChild(hintsWrap);
    }

    container.appendChild(form);
  }

  return { check: check, renderPuzzleUI: renderPuzzleUI };
})();
