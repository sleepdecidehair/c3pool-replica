# C3Pool 全站复刻报告

## 目标

- URL：`https://c3pool.org/`
- 数据源：`https://api.c3pool.org` + `https://c3pool.org/leaf/*`（全部为真实抓包）
- 采集时间：2026-11-07

## 已复刻路由（19 个页面 + 404）

| 路由                   | 组件                   | 数据来源                                                      |
| ---------------------- | ---------------------- | ------------------------------------------------------------- |
| `/`                    | HomePage               | `/pool/stats`、`/network/stats`、`/leaf/public/announcements` |
| `/coins`               | CoinsPage              | `/pool/stats`、`/network/stats`                               |
| `/explorer/blocks`     | BlocksPage             | `/pool/stats`、`/pool/blocks`、`/pool/coin_altblocks/{port}`  |
| `/explorer/payments`   | PaymentsPage           | `/pool/stats`、`/pool/payments`                               |
| `/announcements`       | AnnouncementsPage      | `/leaf/public/announcements/archive`                          |
| `/announcements/:id`   | AnnouncementDetailPage | 同上                                                          |
| `/about`               | AboutPage              | `/leaf/public/announcements/archive` + 静态文案               |
| `/community`           | CommunityPage          | 静态文案                                                      |
| `/help`、`/help/:slug` | HelpPage               | `/leaf/public/help`                                           |
| `/verify`              | VerifyPage             | `/leaf/public/official-channels`                              |
| `/feedback`            | FeedbackPage           | 本地表单                                                      |
| `/abuse-report`        | AbuseReportPage        | 本地表单                                                      |
| `/law-enforcement`     | LawEnforcementPage     | 静态文案                                                      |
| `/legal/service`       | LegalServicePage       | `/leaf/public/legal/service`                                  |
| `/legal/privacy`       | LegalPrivacyPage       | `/leaf/public/legal/privacy`                                  |
| `/legal/disclaimer`    | LegalDisclaimerPage    | `/leaf/public/legal/disclaimer`                               |
| `/api`                 | ApiDocsPage            | `/leaf/public/api-docs`                                       |
| `/mobile-app`          | MobileAppPage          | `/leaf/public/mobile-app`                                     |
| `/desktop-app`         | DesktopAppPage         | `/leaf/public/desktop-release`                                |
| `*` / `earnings` 等    | NotFoundPage           | 原站 404 样式                                                 |

`/dashboard` 按原站行为重定向到首页（无地址状态下）。

## 首屏视觉差异（1440×900）

| 页面                                 | diff                          |
| ------------------------------------ | ----------------------------- |
| home                                 | 0.65%                         |
| api                                  | 0.37%                         |
| mobile-app                           | 2.17%                         |
| coins                                | 2.42%                         |
| community                            | 2.84%                         |
| verify                               | 2.92%                         |
| announcements / about / abuse / law  | 3.38% / 3.42% / 3.39% / 3.39% |
| feedback                             | 2.50%                         |
| desktop-app                          | 3.51%                         |
| help                                 | 3.89%                         |
| payments                             | 4.16%                         |
| blocks                               | 4.25%                         |
| legal-service / privacy / disclaimer | 4.69% / 4.25% / 4.34%         |
| 404                                  | 0.25%                         |

## 本轮修复

- **列表白底**：Arco Table 的 `td` 原本是不透明白色。已改为透明，表头/悬停使用 `--table-header-bg`、`--table-row-hover`，与玻璃卡片融合。
- **Arco 暗色主题**：主题切换时同步 `document.body[arco-theme="dark"]`，Select / Dropdown / Pagination / Input / Table 不再出现亮色残留。
- **全局 Pool Info**：浮动窗移至 App 层，除 `/api` 外所有页面与原站一致显示。
- **移动端 App 页**：按原站 `mobile-page__*` 布局重写，diff 从 17.17% 降到 2.17%。
- **404 页**：按原站无 Header/Footer、居中 404 + Back to home + 浮动窗复刻，diff 0.25%。
- **表格分页数据**：补采 blocks/payments 第 2–4 页、全部 active 币种的 `coin_altblocks` 第 1–2 页。

## 验证

- 19 个路由逐页打开：0 pageerror、0 API 404、均有 h1 与内容。
- 暗色主题扫描：无大面积白色残留（仅移动端二维码占位为白色，符合原站）。
- `fmt:check` / `lint` / `typecheck` / `test` / `build` 全绿。

## 已知限制

- 需要登录的 dashboard/earnings/withdrawal/workers/notifications 无真实地址，按原站 404 或重定向处理。
- 分页 fixture 仅覆盖部分页；超出范围显示空态。
- 移动端二维码为占位，不可扫码。
- 数据为抓包时点快照；`refetchInterval` 不会产生新数据。
- Arco 在 React 19 下仍有 `element.ref` 弃用告警，非功能性。

## 版权与数据说明

- 本项目为学习/演示用途的界面复刻，与 C3Pool 官方无关。
- C3Pool 名称、Logo、截图、公告配图版权归其所有者；如侵权请联系删除。
- `replica-data/network` 为公开 API 的抓包快照，用于离线回放；不含登录凭据或用户隐私。
