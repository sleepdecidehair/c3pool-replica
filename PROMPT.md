# 界面复刻任务提示词（直接粘贴给 Agent）

> 使用前替换：`{{URL}}`、`{{TARGET_DIR}}`（默认本仓库根目录）、`{{自动执行: YES/NO}}`。
> 工作准则以本仓库 `AGENTS.md` 为准；本文件是任务级提示词。

---

## 角色

你是资深前端工程师 + 浏览器数据采集专家。你要按线上 URL 复刻界面，且**所有展示数据必须来自对目标站点的真实抓取，禁止任何 mock / 写死假数据**。先侦察采集，后建模生成，最后做数据与视觉双重校验。

## 技术栈（强制，不得替换）

TypeScript 7（strict）· React 19 · Vite 8 · pnpm · Arco Design · React Router · `react-virtuoso` · `react-telemetry-open` · `@tanstack/react-pacer` · TanStack Query · Zustand · Oxlint · Oxfmt · Vitest。

## 输入

- 目标 URL：`{{URL}}`
- 输出目录：`{{TARGET_DIR}}`（默认当前仓库）
- 视口：桌面 1440×900、平板 834×1112、移动 390×844，`deviceScaleFactor=2`
- 登录态：如目标站点需要登录，使用 `--storage-state` 传入**你自己的会话文件**；不得绕过登录
- 自动执行：`{{自动执行}}`（NO 时每个阶段结束暂停等确认）

## 硬性规则

1. **数据 100% 来自爬取**。缺失就补抓，不编造字段、不写死数组、不返回假响应。
2. 只复刻布局与视觉；不复制商标 Logo、品牌文案、专有插画、付费字体。受版权素材用中性占位并在报告登记。
3. 不绕过登录、付费墙、反爬；遵守 robots.txt / ToS；采集限速（默认 1 req/500ms）。
4. Token / Cookie / PII 只留本地 `.replica/`，禁止进代码、日志、测试夹具、git。
5. 先产出 `.replica/spec.md`，确认后再写业务代码。
6. 不擅自引入清单外的依赖。
7. 所有中间产物写入 `.replica/`，不污染 `src/`。

---

## 阶段 0 · 预检（只读）

1. 打开 `{{URL}}`，确认可达、是否需登录、是否有验证码/反爬。被拦立即报告并停止。
2. 记录技术栈指纹（SSR/CSR、框架、UI 库）、页面结构、主要分区。
3. 检查 robots.txt 与 ToS。

## 阶段 1 · 结构提取

1. 三视口整页截图 → `.replica/original/`。
2. AOM 无障碍树快照 → `.replica/aom.txt`（布局与语义主依据）。
3. 探测 `__NEXT_DATA__` / `__NUXT__` / `__INITIAL_STATE__` / JSON-LD / 框架 devtools hook。
4. 查找 `sourceMappingURL` 与 `.map`，存在则用 `source-map` 还原原始组件 → `.replica/recovered/`。
5. 提取独有 class/文案，用 GitHub Code Search / grep.app 溯源开源模板；命中则复用结构并注明来源。
6. 提取 Design Token（写入 `.replica/tokens.json`）：颜色频率聚类、字体阶梯、间距网格、圆角/阴影/断点；仅对关键节点取精确 computedStyle，禁止逐节点灌入上下文。

## 阶段 2 · 数据采集（本任务重点）

目标：把页面所需真实数据全部抓下来，并能按原接口语义本地回放。

1. 运行：
   ```bash
   pnpm prepare:browsers   # 首次
   pnpm crawl --url {{URL}} [--storage-state .replica/auth.json] --max-scrolls 30
   ```
   产出：
   - `.replica/crawl/network/record-*.json`：每条响应含 `method/url/path/query/status/contentType/body/sourceUrl/capturedAt`
   - `.replica/crawl/endpoints.json`：接口汇总
   - `.replica/original/full.png`、`.replica/dom.html`、`.replica/aom.txt`
2. **必须覆盖所有状态**（缺一不可）：
   - 滚动到底反复触发无限加载，抓完全部分页；
   - 切换 Tab / 筛选 / 排序 / 搜索关键词；
   - 打开弹窗、抽屉、下拉、折叠菜单；
   - 空态、错误态（如可触发）；
   - SPA 遍历所有路由。
     脚本未覆盖的交互，手动用 Playwright 补采，写入同一目录。
3. 登录态用你自己的 `storageState`；令牌只留 `.replica/`；对手机号、邮箱、证件号等做脱敏标记。
4. 图片/SVG/字体/图标下载到 `public/replica-assets/`；受版权素材用中性占位并登记。

## 阶段 3 · 数据契约建模

1. 基于抓包结果在 `src/lib/api/schemas.ts` 用 zod 定义响应契约（禁止 `any`）。
2. 在 `src/lib/api/endpoints.ts` 登记接口：key、method、path、description。
3. 回放由 `build/vite-plugin-replay.ts` 自动完成（按 path + query 匹配）。未命中返回 `REPLICA_FIXTURE_NOT_FOUND`，看到它就去补抓，不要造数据。
4. 建立「数据映射表」：组件 ← 接口 ← fixture 字段，写入 spec。

## 阶段 4 · 复刻方案 spec（写入 `.replica/spec.md`）

必须包含：

- 组件清单与 Arco 组件映射（Table/Modal/Form/Button…）
- 布局树 JSON、Design Token 摘要、三档响应式行为
- 数据映射表、状态与交互矩阵（hover/focus/disabled/loading/empty/error）
- React Router 路由表、目录结构、每文件职责
- 风险：Canvas/WebGL、跨域 iframe、Shadow DOM、登录墙内区域
- 无法采集的数据与原因

若自动执行=NO，到此暂停。

## 阶段 5 · 代码生成

1. 沿用现有工程约定；如新建模块，按 `src/features/<feature>/` 组织。
2. Providers 已就绪：QueryClient、Arco `ConfigProvider`（zh-CN）、Telemetry、Pacer、BrowserRouter。
3. 实现规则：
   - **服务端数据 → TanStack Query**：列表 `useInfiniteQuery` + `react-virtuoso` `endReached`；详情 `useQuery`；写操作 `useMutation`。
   - **客户端状态 → Zustand**：筛选、主题、弹窗开关；禁止把接口数据塞进 store。
   - **高频回调 → `@tanstack/react-pacer`**：`useDebouncedValue` / `useDebouncedCallback` / `useThrottledCallback`。
   - **长列表 → `react-virtuoso`**。
   - **性能 → 统一走 `src/app/telemetry.tsx`**，组件不自行上报。
   - 样式用 `src/styles/global.css` 的 Design Token 变量；移动端优先，验证 1440/834/390。
   - 语义化 HTML + 无障碍：aria、键盘可达、focus 管理、Escape/遮罩关闭。
   - 所有可见数据来自 fixture 回放；禁止 hardcode 业务数据。
4. 质量门槛必须全绿：`pnpm fmt:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build`。

## 阶段 6 · 双重自校验

1. **数据校验**：逐组件核对渲染字段是否 1:1 来自 fixture；分页条数/计数/排序与抓包一致；全局搜索确认没有写死数组或假数据。
2. **视觉校验**（最多 5 轮）：
   - 本地 `pnpm dev`，同视口截图到 `.replica/clone/`；
   - `pnpm verify:diff --original .replica/original/full.png --clone .replica/clone/full.png --out .replica/diff.png`；
   - 只修差异区域对应组件，按「布局 > 间距 > 颜色 > 字体」排序；
   - SSIM 提升 <1% 或 ≥0.95 停止；
   - 同时比对 AOM 结构（角色层级、可交互元素数量）。
3. 交互态回归：滚动加载、筛选、弹窗、空/错态。

## 阶段 7 · 交付报告

写入 `.replica/report.md`：

- 三视口完成度与剩余差异
- 数据溯源表：接口 → fixture → 组件 → 抓取时间
- 脱敏清单、受版权素材替换清单
- 复用的开源模板/组件库及 license
- 运行方式、已知限制、后续建议

---

## 汇报格式

每阶段结束用 ≤3 行：

1. 做了什么
2. 产出文件
3. 下一步

## 开始

读取 `{{URL}}`，依次执行阶段 0 → 1 → 2，产出 `.replica/` 下截图、`aom.txt`、`tokens.json`、`crawl/network/*.json`、`crawl/endpoints.json`；然后写 `.replica/spec.md`，按「自动执行」决定是否暂停。
