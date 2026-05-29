/* chat.js — チャットUI レンダリング */
window.EscapeChat = (function () {
  "use strict";

  const AVATAR = { qa: "🧐", uiux: "🎨", system: "💬" };
  const NAMES = { qa: "QA", uiux: "宮崎", system: "システム" };

  function render(container, messages) {
    container.innerHTML = "";
    messages.forEach(function (msg, idx) {
      const bubble = document.createElement("div");
      bubble.className = "chat-bubble chat-bubble--" + msg.speaker;
      bubble.style.animationDelay = (idx * 80) + "ms";

      const avatar = document.createElement("span");
      avatar.className = "chat-avatar";
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = AVATAR[msg.speaker] || "💬";

      const body = document.createElement("div");
      body.className = "chat-body";

      const name = document.createElement("span");
      name.className = "chat-name";
      name.textContent = NAMES[msg.speaker] || "—";

      const text = document.createElement("p");
      text.className = "chat-text";
      text.textContent = msg.message;

      body.appendChild(name);
      body.appendChild(text);
      bubble.appendChild(avatar);
      bubble.appendChild(body);
      container.appendChild(bubble);
    });
  }

  return { render: render };
})();
