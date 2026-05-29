# enU.Labs Escape Vol.2 — QAのランチに付き合った話

うちのQAがランチに誘ってくれた。でも何食べるかは教えてくれない。代わりに謎が6問送られてきた。

主人公はUIUXデザイナー。仕掛人はQA。
6問の謎を解いて、最後に3つのエンディング（パスタ・和食・次郎系）のどれかにたどり着く、マルチエンディング型の脱出ゲーム。

## 遊び方

`index.html` をブラウザで開けば即遊べる。所要時間 約10分。

- 進捗は localStorage に自動保存される
- 「最初から」ボタンでリセット可
- リプレイで3エンディング全制覇できる

## 技術スタック

- HTML / CSS（バニラ）/ JavaScript（バニラ・ES6+）
- ビルドツール・フレームワーク不使用
- 外部依存：Google Fonts（Bricolage Grotesque + Inter Tight）

## デザイン

[Hallmark](https://github.com/) skill（v1.0.0）の Custom Theme route で構築：

- Vibe: *"midday, fresh-green, observant, friendly"*
- Paper: `oklch(97% 0.006 145)` · Accent: `oklch(60% 0.13 145)` （QA fresh-green）
- Display: Bricolage Grotesque 700 / Body: Inter Tight 400

## ライセンス

MIT — `LICENSE` 参照。Fork・改変・流用すべて自由。

---

Made by enU.Labs · 2026
