---
name: vuetify-rules
description: 專門針對 Vuetify 4 (Revisionist) 穩定版進行程式碼審查與生成的技能。確保 UI 邏輯符合最新的 MD3 規範與 CSS Layer 架構。
---

## 核心檢查項目

### 1. Material Design 3 (MD3) 規範檢查
* **Elevation**: 檢查是否仍在使用 24 階陰影。Vuetify 4 僅支援 0-5 階（例如 `elevation-3`）。
* **Typography**: 驗證 class 是否符合 MD3 命名（如：使用 `text-body-large` 而非舊版的 `text-subtitle-1`）。
* **Color System**: 檢查是否正確使用 `color-mix` 或 CSS 變數進行透明度處理，而非舊的 Sass 變數。

### 2. 範本與語法檢查 (Vue 3 + TS)
* **VForm Slots**: **[重要]** 檢查 `v-form` 的插槽變數（如 `isValid`, `errors`）。在 V4 中，這些不再是 `Ref`，在 template 中禁止使用 `.value`。
* **Slot Naming**: 驗證 `VSelect`, `VAutocomplete`, `VCombobox` 的項目插槽是否統一使用 `internalItem`。
* **Script Setup**: 強制檢查是否使用 `<script setup lang="ts">` 並配合 `defineProps<{}>()`。

### 3. 排版與樣式架構
* **CSS Layers**: 確保自定義樣式包在 `@layer base, components, utilities;` 內，避免與 Vuetify V4 的內建 Layer 發生權重衝突。
* **Grid vs Flex**: 識別 `VBtn` 與 `VField` 的配置。V4 已將其從 CSS Grid 改回 Flexbox，檢查是否有衝突的 `grid-area` 屬性。
* **Breakpoints**: 驗證響應式設計是否符合 V4 新斷點（例如：`md` 現在是 840px，而非 960px）。

## 操作指令範例 (Usage Scenarios)

### 場景 A：代碼校正
**User**: "檢查這段 Vuetify 程式碼是否符合 V4 標準。"
**Skill Action**: 
1. 掃描 `v-form` 插槽。
2. 若發現 `v-slot="{ isValid }"` 且後續有 `isValid.value`，自動更正為 `isValid`。
3. 將 `elevation-12` 降級至 MD3 兼容的 `elevation-4` 或 `elevation-5`。

### 場景 B：CMS 組件生成
**User**: "幫我產出問卷管理的拖曳列表組件。"
**Skill Action**:
1. 使用 `VAvatarGroup` (V4 新組件) 顯示參與者。
2. 確保 `v-data-table` 使用 V4 的 `sort-icon` 新屬性。
3. 封裝 `v-draggable` 邏輯並確保 TS 型別定義完整。

## 禁令 (Constraints)
* 禁止生成任何帶有 `!important` 的內聯樣式（V4 已全面改用 CSS Layers 處理權重）。
* 禁止使用已廢棄的 Sass 變數（如 `$button-stacked-icon-margin`，應改用 `$button-stacked-gap`）。

