/* enU.Labs Escape Vol.2 — scenes data
 * 6 puzzle + opening + 3 endings (pasta / japanese / jiro)
 * 主役: UIUX 宮崎 / 仕掛人: QA 浜田
 */

window.EscapeData = (function () {
  "use strict";

  const scenes = [
    /* ───── Scene 0 · Opening ───── */
    {
      id: 0,
      phase: "opening",
      title: "QAからのランチ招待",
      image: "assets/opening.png",
      chat: [
        { speaker: "qa", message: "宮崎さん、今日お昼一緒にどうですか？" },
        { speaker: "qa", message: "店はもう決めてあります。" },
        { speaker: "qa", message: "ただし、自分で当ててもらいます。" },
        { speaker: "uiux", message: "え、当てる？" },
        { speaker: "qa", message: "謎を6問送りますね。最後に何食べるか決まります。" }
      ],
      onStart: { nextSceneId: 1 }
    },

    /* ───── Scene 1 · 間違い探し（壁の数字）───── */
    {
      id: 1,
      phase: "puzzle",
      title: "謎 1 / 6 ・間違い探し",
      chat: [
        { speaker: "qa", message: "お店までの道、写真2枚で送りますね。" },
        { speaker: "qa", message: "1枚目はさっきの廊下、2枚目はちょっと違うところがあります。" },
        { speaker: "qa", message: "どこが違うか、当ててください。" }
      ],
      puzzle: {
        type: "choice",
        question: "2枚の画像で『違うところ』はどれですか？",
        clueImages: ["assets/clues/01-hallway-a.png", "assets/clues/01-hallway-b.png"],
        choices: [
          "壁の案内板の数字",
          "観葉植物の位置",
          "天井のライトの形",
          "受付ベルの位置"
        ],
        answer: "壁の案内板の数字",
        hints: [
          "数字に注目してみてください。",
          "壁にかかっている案内板を見比べてみて。",
          "Aは『207』、Bは…？"
        ]
      },
      onCorrect: { nextSceneId: 2, qaReply: "正解。217号室がお店の方向です。" }
    },

    /* ───── Scene 2 · 逆順暗号（番地）───── */
    {
      id: 2,
      phase: "puzzle",
      title: "謎 2 / 6 ・逆さ読み",
      chat: [
        { speaker: "qa", message: "お店の番地、暗号で送ります。" },
        { speaker: "qa", message: "『521』" },
        { speaker: "qa", message: "そのままじゃないですよ。逆さに読んでください。" }
      ],
      puzzle: {
        type: "input",
        question: "『521』を逆さに読むと？（数字で）",
        answer: ["125"],
        hints: [
          "数字の並びをそのまま逆向きに。",
          "5・2・1 → ?・?・?",
          "最後の数字から読み直して。"
        ]
      },
      onCorrect: { nextSceneId: 3, qaReply: "正解。125番地です。" }
    },

    /* ───── Scene 3 · 論理パズル ───── */
    {
      id: 3,
      phase: "puzzle",
      title: "謎 3 / 6 ・三人のランチ",
      chat: [
        { speaker: "qa", message: "先週のチームランチ。" },
        { speaker: "qa", message: "うちのCTO、アーキ、PMが、それぞれ別のお店に行きました。" },
        { speaker: "qa", message: "パスタ屋・定食屋・ラーメン屋、3つです。" },
        { speaker: "qa", message: "ヒント：" },
        { speaker: "qa", message: "① CTOは麺類じゃない" },
        { speaker: "qa", message: "② アーキは『重いものは食べたくない』と言ってた" },
        { speaker: "qa", message: "③ ラーメン屋に行ったのはPMじゃない" }
      ],
      puzzle: {
        type: "choice",
        question: "アーキが行ったお店は？",
        choices: ["パスタ屋", "定食屋", "ラーメン屋", "わからない"],
        answer: "定食屋",
        hints: [
          "『重いものは食べたくない』 → 軽めの選択肢は？",
          "③でラーメン屋はPMではない、①でCTOも麺類NG → ラーメン屋に行ったのは…",
          "ラーメン屋＝アーキ？ いや『重いものNG』なのでアーキはラーメン屋じゃない。"
        ]
      },
      onCorrect: { nextSceneId: 4, qaReply: "正解。アーキは定食屋、CTOはパスタ屋、PMがラーメン屋でした。" }
    },

    /* ───── Scene 4 · 観察計算（机上の数字）───── */
    {
      id: 4,
      phase: "puzzle",
      title: "謎 4 / 6 ・机の上の合計",
      chat: [
        { speaker: "qa", message: "今、自分の席はこんな感じです。" },
        { speaker: "qa", message: "机の上にある数字を、全部足してください。" },
        { speaker: "qa", message: "見落としに気をつけて。" }
      ],
      puzzle: {
        type: "input",
        question: "机の上の数字を全部足すと？（数字で）",
        clueImage: "assets/clues/04-desk-numbers.png",
        answer: ["88"],
        hints: [
          "カレンダー、ノート、ふせん、マグカップ、本…全部の場所をチェック。",
          "見つかる数字は7箇所。",
          "14 + 23 + 7 + 12 + 5 + 8 + 19 = ?"
        ]
      },
      onCorrect: { nextSceneId: 5, qaReply: "正解、88です。ちゃんと全部見つけてくれましたね。" }
    },

    /* ───── Scene 5 · なぞなぞ古典 ───── */
    {
      id: 5,
      phase: "puzzle",
      title: "謎 5 / 6 ・なぞなぞ",
      chat: [
        { speaker: "qa", message: "ここで軽くなぞなぞ。" },
        { speaker: "qa", message: "パンはパンでも、食べられないパンなーんだ？" }
      ],
      puzzle: {
        type: "input",
        question: "パンはパンでも、食べられないパンは？",
        answer: ["フライパン", "ふらいぱん", "fryingpan", "frying pan"],
        hints: [
          "台所にあります。",
          "料理に使うもの。",
          "卵焼きやチャーハンを作るときの…？"
        ]
      },
      onCorrect: { nextSceneId: 6, qaReply: "正解。古典ですみません。」" }
    },

    /* ───── Scene 6 · 3択分岐（最終）───── */
    {
      id: 6,
      phase: "branch",
      title: "謎 6 / 6 ・最後の質問",
      chat: [
        { speaker: "qa", message: "最後の問題です。" },
        { speaker: "qa", message: "今日の私の気分、当ててください。" },
        { speaker: "qa", message: "（どれを選んでも、その答えのお店に連れていきます。）" }
      ],
      puzzle: {
        type: "branch",
        question: "QA浜田の今日のランチ気分は？",
        choices: ["パスタ", "和食", "次郎系"],
        endingRoutes: {
          "パスタ": "pasta",
          "和食": "japanese",
          "次郎系": "jiro"
        }
      }
    },

    /* ───── Ending · pasta ───── */
    {
      id: 7,
      phase: "ending",
      route: "pasta",
      title: "Ending · パスタの一日",
      image: "assets/endings/01-pasta.png",
      chat: [
        { speaker: "qa", message: "正解、今日はパスタ気分でした。" },
        { speaker: "qa", message: "ハーブの香りが効いた地中海風のお店、知ってるんです。" },
        { speaker: "uiux", message: "ヘルシーで嬉しい…！" },
        { speaker: "qa", message: "謎、ちゃんと付き合ってくれてありがとうございました。" }
      ]
    },

    /* ───── Ending · japanese ───── */
    {
      id: 8,
      phase: "ending",
      route: "japanese",
      title: "Ending · 和食の安心",
      image: "assets/endings/02-japanese.png",
      chat: [
        { speaker: "qa", message: "正解、今日は和食気分でした。" },
        { speaker: "qa", message: "焼き魚定食のお店、近くにいい所があるんです。" },
        { speaker: "uiux", message: "…落ち着く。" },
        { speaker: "qa", message: "謎、ちゃんと付き合ってくれてありがとうございました。" }
      ]
    },

    /* ───── Ending · jiro ───── */
    {
      id: 9,
      phase: "ending",
      route: "jiro",
      title: "Ending · 次郎系の覚悟",
      image: "assets/endings/03-jiro.png",
      chat: [
        { speaker: "qa", message: "正解、今日は次郎系気分でした。" },
        { speaker: "qa", message: "麺カタメ、アブラ多め、ニンニク全部入りで。" },
        { speaker: "uiux", message: "…え、QAさんがそれ食べるんですか？" },
        { speaker: "qa", message: "意外でしたか？ 付き合ってくれてありがとうございました。" }
      ]
    }
  ];

  function getScene(id) {
    return scenes.find(function (s) { return s.id === id; });
  }

  function getEndingByRoute(route) {
    return scenes.find(function (s) { return s.phase === "ending" && s.route === route; });
  }

  return {
    scenes: scenes,
    getScene: getScene,
    getEndingByRoute: getEndingByRoute,
    totalPuzzles: 6
  };
})();
