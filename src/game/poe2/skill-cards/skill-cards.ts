import "../../../style.css";
import "./skill-cards.css";
import { createNav } from "../../../components/nav";

interface SupportGem {
  name: string;
  effect: string;
}

interface CardStat {
  label: string;
  value: string;
}

interface SkillCard {
  icon: string;
  title: string;
  role: string;
  type: "offense" | "debuff" | "defense" | "util";
  tags: { label: string; main?: boolean }[];
  supports: SupportGem[];
  stats: CardStat[];
}

interface Section {
  label: string;
  cards: SkillCard[];
}

const sections: Section[] = [
  {
    label: "offense",
    cards: [
      {
        icon: "ED",
        title: "Essence Drain",
        role: "Chaos DoT + 回復 — メイン火力",
        type: "offense",
        tags: [{ label: "主力", main: true }],
        supports: [
          { name: "Chain", effect: 'Projectile が複数敵に連鎖 → <span class="note">Contagion との二重カバー</span>' },
          { name: "Zenith II", effect: '<span class="more">30% more Spell Damage</span> / <span class="less">マナ90%以上維持</span><br><span class="note">Soulless Form で条件維持が容易（Lich特権）</span>' },
          { name: "Swift Affliction I", effect: '<span class="more">30% more non-Ailment DoT</span> / <span class="less">20% less Duration</span><br><span class="note">Contagion 再塗りで Duration 短縮が実質無害</span>' },
          { name: "Considered Casting", effect: '<span class="more">25% more Spell Hit Damage</span> / <span class="less">10% less Cast Speed</span><br><span class="note">DoT はキャスト頻度に依存しないので無害</span>' },
        ],
        stats: [
          { label: "More 合算（Asc込）", value: "x2.75" },
          { label: "Base DoT (Lv20)", value: "2,170/秒" },
        ],
      },
      {
        icon: "CT",
        title: "Contagion",
        role: "AoE debuff 拡散 — ED の配達役",
        type: "offense",
        tags: [{ label: "拡散", main: true }],
        supports: [
          { name: "Rapid Casting", effect: 'Cast Speed ↑ → <span class="note">素早く群れに撒ける</span>' },
          { name: "Magnified Area", effect: 'AoE ↑ → <span class="note">拡散範囲を広げて漏らさない</span>' },
          { name: "Unleash", effect: '複数回同時キャスト → <span class="note">1アクションで広範囲カバー</span>' },
        ],
        stats: [
          { label: "役割", value: "ED の DoT を群れに配達" },
          { label: "自身の DoT", value: "微小（拡散用）" },
        ],
      },
      {
        icon: "DE",
        title: "Dark Effigy",
        role: "Chaos Projectile トーテム",
        type: "offense",
        tags: [{ label: "補助" }, { label: "wither" }],
        supports: [
          { name: "Poison I", effect: '毒付与確率 → <span class="note">debuff 枠 +1（攻撃頻度 3→4回/秒）</span>' },
          { name: "Withering Touch", effect: 'ヒット時 Wither 付与 → <span class="note">ED の DoT を間接 x1.9 ブースト</span>' },
          { name: "Increase Limit", effect: 'トーテム +1体 → <span class="note">ヒット DPS 約2倍 + Wither 維持安定</span>' },
        ],
        stats: [
          { label: "攻撃頻度", value: "4回/秒/体 × 2体" },
          { label: "ヒット DPS (Lv20)", value: "≈7,600/秒" },
          { label: "設計思想", value: "More 枠を捨てて間接貢献を最大化" },
        ],
      },
      {
        icon: "CB",
        title: "Chaos Bolt",
        role: "Wand Weapon Skill",
        type: "offense",
        tags: [{ label: "wither" }],
        supports: [
          { name: "Unleash", effect: '複数回同時発射 → <span class="note">Wither スタック素早く蓄積</span>' },
          { name: "Considered Casting", effect: '<span class="more">25% more Spell Hit</span> / <span class="note">Wither 付与が主目的なので火力は副次的</span>' },
        ],
        stats: [{ label: "主な役割", value: "Wither スタック維持（単体戦）" }],
      },
    ],
  },
  {
    label: "debuff",
    cards: [
      {
        icon: "DP",
        title: "Despair",
        role: "Chaos 耐性低下カース",
        type: "debuff",
        tags: [{ label: "カース", main: true }],
        supports: [
          { name: "Curse Effect", effect: 'カース効果 ↑ → <span class="note">-Chaos 耐性の絶対値が増加</span>' },
          { name: "Decaying Hex", effect: 'Chaos DoT 付与 → <span class="note">Dark Effigy の debuff 枠 +1</span>' },
          { name: "Cursed Ground", effect: '地面にカース範囲を残す → <span class="note">カース維持が楽になる</span>' },
        ],
        stats: [{ label: "敵デバフ乗数（例 -30%）", value: "x1.30" }],
      },
      {
        icon: "TC",
        title: "Blasphemy + Temporal Chains",
        role: "敵行動速度低下オーラ",
        type: "debuff",
        tags: [{ label: "防御" }],
        supports: [
          { name: "Slow Potency", effect: 'Slow 効果 ↑ → <span class="note">敵の攻撃頻度をさらに下げる</span>' },
          { name: "Magnified Area", effect: 'AoE ↑ → <span class="note">オーラ範囲拡大</span>' },
          { name: "Ritualistic Curse", effect: 'カース効果 ↑ → <span class="note">Slow のかかりが強くなる</span>' },
        ],
        stats: [{ label: "役割", value: "ES リチャージの隙間を確保" }],
      },
      {
        icon: "WP",
        title: "Withering Presence",
        role: "Wither 自動蓄積オーラ",
        type: "debuff",
        tags: [{ label: "wither" }],
        supports: [
          { name: "Prolonged Duration", effect: '持続時間 ↑ → <span class="note">Wither スタックが剥がれにくくなる</span>' },
          { name: "Chaos Mastery", effect: '+1 Skill Level → <span class="note">Wither 効果・蓄積速度向上</span>' },
        ],
        stats: [{ label: "Wither 15stk 乗数", value: "≈ x1.90" }],
      },
    ],
  },
  {
    label: "utility & defense",
    cards: [
      {
        icon: "SP",
        title: "Sigil of Power",
        role: "マナ消費で Spell Damage バフ",
        type: "util",
        tags: [{ label: "バフ" }],
        supports: [
          { name: "Prolonged Duration", effect: '持続時間 ↑ → <span class="note">Sigil を長く維持</span>' },
          { name: "Magnified Area", effect: 'AoE ↑ → <span class="note">Sigil 内で動ける範囲拡大</span>' },
          { name: "Rapid Casting", effect: 'Cast Speed ↑ → <span class="note">素早く設置</span>' },
        ],
        stats: [
          { label: "役割", value: "ステージ蓄積で % more Spell Damage" },
          { label: "武器セット2", value: "Chiming Staff 必須" },
        ],
      },
      {
        icon: "UE",
        title: "Unearth",
        role: "死体生成ミニオン",
        type: "util",
        tags: [{ label: "死体" }],
        supports: [
          { name: "Minion Instability", effect: 'ミニオン爆発 → <span class="note">追加の AoE ダメージ</span>' },
          { name: "Feeding Frenzy", effect: 'ミニオン攻撃性 ↑ → <span class="note">素早く死体を供給</span>' },
        ],
        stats: [{ label: "役割", value: "死体供給 + 微量の追加ダメージ" }],
      },
    ],
  },
];

const typeColors: Record<string, { color: string; bg: string; border: string }> = {
  offense: { color: "#c084fc", bg: "rgba(192,132,252,0.10)", border: "rgba(192,132,252,0.2)" },
  debuff: { color: "#f472b6", bg: "rgba(244,114,182,0.10)", border: "rgba(244,114,182,0.2)" },
  defense: { color: "#60a5fa", bg: "rgba(96,165,250,0.10)", border: "rgba(96,165,250,0.2)" },
  util: { color: "#fbbf24", bg: "rgba(251,191,36,0.10)", border: "rgba(251,191,36,0.2)" },
};

function renderCard(card: SkillCard): string {
  const tc = typeColors[card.type];
  const tagHtml = card.tags
    .map(
      (t) =>
        `<span class="sc-tag${t.main ? " sc-tag-main" : ""}" ${t.main ? `style="color:${tc.color};border-color:${tc.border}"` : ""}>${t.label}</span>`
    )
    .join("");

  const supportsHtml = card.supports
    .map(
      (s, i) => `
      <div class="sc-support-row">
        <div class="sc-support-num">${i + 1}</div>
        <div class="sc-support-info">
          <div class="sc-support-name">${s.name}</div>
          <div class="sc-support-effect">${s.effect}</div>
        </div>
      </div>`
    )
    .join("");

  const statsHtml = card.stats
    .map((s) => `<div class="sc-stat"><span>${s.label}</span><span class="sc-stat-val">${s.value}</span></div>`)
    .join("");

  return `
    <div class="sc-card">
      <div class="sc-card-head">
        <div class="sc-icon" style="background:${tc.bg};color:${tc.color};border:1px solid ${tc.border}">${card.icon}</div>
        <div>
          <div class="sc-card-title">${card.title}</div>
          <div class="sc-card-role">${card.role}</div>
        </div>
        <div class="sc-tags">${tagHtml}</div>
      </div>
      <div class="sc-card-body">${supportsHtml}</div>
      <div class="sc-card-footer">${statsHtml}</div>
    </div>`;
}

function renderAll(): string {
  let html = `
    <header class="sc-header">
      <h1><span class="sc-hl">[0.4]</span> ED Contagion Lich — Skill & Support Cards</h1>
      <p>DEADRABB1T build / campaign variant / skill × support synergy map</p>
    </header>`;

  for (const section of sections) {
    html += `
      <div class="sc-section-label">${section.label}</div>
      <hr class="sc-section-line">
      <div class="sc-grid">${section.cards.map(renderCard).join("")}</div>`;
  }

  html += `
    <div class="sc-legend">
      <div class="sc-legend-item"><div class="sc-legend-dot" style="background:#c084fc"></div>Offense（攻撃）</div>
      <div class="sc-legend-item"><div class="sc-legend-dot" style="background:#f472b6"></div>Debuff（弱体化）</div>
      <div class="sc-legend-item"><div class="sc-legend-dot" style="background:#fbbf24"></div>Utility（補助）</div>
      <div class="sc-legend-item"><div class="sc-legend-dot" style="background:#7edc6a"></div><span class="font-mono">more</span> = 乗算</div>
      <div class="sc-legend-item"><div class="sc-legend-dot" style="background:#ef5350"></div><span class="font-mono">less</span> = 代償</div>
      <div class="sc-legend-item"><div class="sc-legend-dot" style="background:#fbbf24"></div><span class="italic">note</span> = 設計意図</div>
    </div>
    <footer class="sc-footer">
      <p>Build: <a href="https://mobalytics.gg/poe-2/builds/chaos-dot-lich-starter-deadrabbit">DEADRABB1T — Mobalytics</a> / Patch 0.4 Campaign Variant</p>
    </footer>`;

  return html;
}

function main(): void {
  document.getElementById("nav")?.appendChild(createNav("GAME"));

  const container = document.getElementById("skill-cards-content");
  if (container) {
    container.innerHTML = renderAll();
  }

  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");
}

document.addEventListener("DOMContentLoaded", main);
