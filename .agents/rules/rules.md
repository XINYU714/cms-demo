---
trigger: always_on
---

## Rules
- 符合現代化 typescript + Vite + vue 3 Composition 開發標準
- Vue 3.5+
- Vite 7
- Vuetify 4+

## Typescript Rules
- 所有組件的 Props 必須使用 defineProps<{ ... }>()，不可使用 any。所有 API 回傳值必須對應 interface。

## Vuetify Rules
- 如果是 Vuetify 的組件，優先使用 Vuetify 的內建 Utility Classes。如果是特別樣式，則是用 Tailwind 寫法

## Vue Rules
嚴格使用 <script setup> 語法，邏輯複雜時需抽離至 use[Feature].ts 的 Hooks 中以利維護
如果是遇到陣列，希望以 XXXList 方式命名，如果有遇到.map, .filter 等 Array Function，以 'item'命名，例如： arr.map(item => {...})

## 問答
- 請使用「繁體中文」回答