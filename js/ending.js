/* ending.js — Vol.2 新規・3エンディング分岐ロジック */
window.EscapeEnding = (function () {
  "use strict";

  const ROUTES = ["pasta", "japanese", "jiro"];

  function isEndingRoute(route) {
    return ROUTES.indexOf(route) !== -1;
  }

  function resolveRoute(puzzle, userChoice) {
    if (puzzle.type !== "branch" || !puzzle.endingRoutes) return null;
    return puzzle.endingRoutes[userChoice] || null;
  }

  function getEndingScene(data, route) {
    return data.getEndingByRoute(route);
  }

  return {
    routes: ROUTES,
    isEndingRoute: isEndingRoute,
    resolveRoute: resolveRoute,
    getEndingScene: getEndingScene
  };
})();
