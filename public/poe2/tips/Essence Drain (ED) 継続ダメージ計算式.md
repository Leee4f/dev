---
tags:
- poe2
- damage
- dot
- witch
- lich
---

エッセンスドレイン固有のDoT（継続ダメージ）スケーリング規則です。

## ED専用数式
$$\text{Total DoT DPS} = \text{Base DoT} \times (1 + \sum \text{Inc.}) \times (1 + \sum \text{DoT Multi}) \times \prod (1 + \text{More})$$

---

## 特記事項：EDの特殊仕様
EDには以下のプロパティがあるため、通常のDoTとはスケーリングが異なります。
> *"Modifiers to Spell Damage apply to this skill's Damage over Time effect"*

### スケーリングの優先順位
1. **ジェムレベル (Base DoT):** DoTの基礎値はレベルに応じて指数関数的に上昇します。レベル+1は最も強力な強化です。
2. **Chaos DoT Multiplier:** 「Increased」とは別枠で乗算されるため、パッシブや装備での優先度が極めて高いです。
3. **Spell Damage / Chaos Damage % Inc:** これらはすべて「Increased」のバケツで合算されます。

### Contagionへの伝播
* 敵が死亡した際、その時点での「EDのDoTインスタンス」が周囲にコピーされます。
* **スナップショット:** 基本的に発動時のバフ（リッチ形態など）が乗った状態で伝播します。**