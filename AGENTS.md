# C3Pool · AI 协作准则

## 项目定位

按线上 URL 复刻界面。**所有展示数据必须来自对目标站点的真实抓取，禁止任何形式的 mock / 写死假数据。** 抓包结果落盘到 `.replica/`（本地中间产物）；需要随仓库发布的去重快照放 `replica-data/network/`，由 Vite 插件按原接口路径回放，业务代码无感消费。

## 技术栈（不得擅自替换或新增）

| 领域       | 选型                                           |
| ---------- | ---------------------------------------------- |
| 语言       | TypeScript 7（strict，禁止 `any`、未使用代码） |
| 框架       | React 19 + Vite 8                              |
| 包管理     | pnpm（锁定 `packageManager`，禁止 npm/yarn）   |
| 组件库     | Arco Design（`@arco-design/web-react`）        |
| 路由       | React Router（`react-router`）                 |
| 虚拟列表   | `react-virtuoso`                               |
| 性能检测   | `react-telemetry-open`                         |
| 函数优化   | `@tanstack/react-pacer`（防抖/节流）           |
| 服务端状态 | TanStack Query（`@tanstack/react-query`）      |
| 客户端状态 | Zustand                                        |
| 3D 地球    | `cobe`（复刻原站 Canvas 地球，唯一额外依赖）   |
| 代码质量   | Oxlint                                         |
| 格式化     | Oxfmt                                          |
| 测试       | Vitest + @testing-library/react + happy-dom    |

引入、删除、升级依赖前必须先说明必要性并获得确认。

## 目录结构

```
src/app/            # Providers（QueryClient / Arco ConfigProvider / Telemetry / Pacer / Router）
src/routes/         # 页面级路由组件
src/features/<f>/   # 业务模块（components / hooks / api）
src/components/     # 通用 UI
src/lib/api/        # 请求客户端、zod 契约、接口清单
src/stores/         # Zustand（仅客户端 UI 状态）
src/styles/         # 全局样式 + Design Token CSS 变量
src/test/           # 测试 setup
scripts/crawl/      # Playwright 采集脚本（可复跑）
scripts/verify/     # 视觉 diff 校验
build/              # Vite 抓包回放插件
shared/             # 前后端脚本共享类型
public/replica-assets/  # 抓取并本地化的图片/SVG/字体
replica-data/network/   # 去重后的接口抓包快照（随仓库发布）
.replica/           # 本地中间产物：截图、AOM、全量抓包、spec、report（禁止提交）
```

## 常用命令

| 操作           | 命令                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------- |
| 安装依赖       | `pnpm install`                                                                           |
| 开发           | `pnpm dev`                                                                               |
| 采集目标站     | `pnpm crawl --url <目标URL> [--storage-state <文件>] [--max-scrolls 30]`                 |
| 安装采集浏览器 | `pnpm prepare:browsers`                                                                  |
| 视觉 diff      | `pnpm verify:diff --original .replica/original/full.png --clone .replica/clone/full.png` |
| 类型检查       | `pnpm typecheck`                                                                         |
| 代码检查       | `pnpm lint`                                                                              |
| 格式化         | `pnpm fmt` / `pnpm fmt:check`                                                            |
| 测试           | `pnpm test`                                                                              |
| 构建           | `pnpm build`                                                                             |

提交前必须全绿：`pnpm fmt:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build`。

## 数据法则（最高优先级）

1. 页面所需数据全部通过 `pnpm crawl` 采集，落到 `.replica/crawl/network/*.json`；将需要随仓库发布的去重快照放入 `replica-data/network/`。
2. 采集必须覆盖所有状态：滚动到底触发分页、切换 Tab/筛选/排序/搜索、打开弹窗/抽屉、空态/错误态；SPA 要遍历路由。
3. 缺失数据时**回到采集阶段补抓**，绝不允许自行编造字段或用占位假数据填充。确实无法获取的，UI 显示明确空态并在 report 中记录。
4. 数据契约用 zod 校验，集中在 `src/lib/api/schemas.ts`；不得组件直连 `fetch`，统一走 `src/lib/api/client.ts`。
5. 每条 fixture 保留 `sourceUrl` 与 `capturedAt`，保证可溯源。
6. 回放由 `build/vite-plugin-replay.ts` 完成，按 path + query 匹配；未命中返回 `REPLICA_FIXTURE_NOT_FOUND`，这是明确信号，不是让你补假数据。
7. 新增接口时同步更新 `shared/replica-types.ts`（如涉及结构）与对应 feature 内的 schema。

## 状态管理边界

- **服务端数据** → TanStack Query。列表用 `useInfiniteQuery` + `react-virtuoso` 的 `endReached`；详情 `useQuery`；写操作 `useMutation`。
- **客户端 UI 状态** → Zustand（筛选、主题、弹窗开关等）。禁止把服务端数据放进 Zustand，禁止用 Zustand 缓存接口响应。
- **高频函数** → `@tanstack/react-pacer` 的 `useDebouncedValue` / `useDebouncedCallback` / `useThrottledCallback`，不手写定时器。
- **长列表** → 必须 `react-virtuoso`，禁止一次性渲染全量。
- **性能** → 统一在 `src/app/telemetry.tsx` 通过 `TelemetryProvider` 初始化，业务组件不得自行上报。

## 编码规范

- TypeScript strict；禁止 `any`、未使用变量/导入、隐藏错误。
- 语义化 HTML + 无障碍：aria、键盘可达、focus 管理、Escape/遮罩关闭。
- 样式用 Design Token CSS 变量（`src/styles/global.css`），禁止散落魔数；移动端优先，验证 1440/834/390 三档。
- 组件拆分按 AOM 结构映射到 Arco 组件，不逐像素硬抄。
- 不复制原站压缩后的 JS/CSS；class 名与命名体系保持自有风格。
- 不搬运商标 Logo、品牌文案、专有插画、付费字体；用中性占位并在报告登记。
- 注释只在必要时写，不复述代码。

## 安全与合规

- 仅复刻布局视觉；遵守 robots.txt 与服务条款，不绕过登录、付费墙、反爬。
- 采集默认限速（1 req/500ms），不压垮目标站。
- Token、Cookie、手机号/邮箱/证件号等 PII 只留本地 `.replica/`，**禁止进代码、日志、测试夹具、git**；采集后做脱敏标记。
- `.replica/`、`.env*`、`.env.example` 之外的 env 文件已加入 `.gitignore`，不得提交。
- 不修改 `{{目标仓库}}` 之外的文件；不 commit / push，除非明确要求。

## 复刻工作流

1. **侦察**：三视口截图、AOM 快照、框架指纹、source map、开源模板溯源、Design Token 提取。
2. **采集**：`pnpm crawl` 抓全接口与状态，产出 `endpoints.json`。
3. **建模**：zod schema + 接口清单 + 数据映射表。
4. **方案**：写 `.replica/spec.md`（组件清单、布局树、Token、状态矩阵、路由、风险），确认后再写码。
5. **生成**：先脚手架后组件，沿用现有约定。
6. **双重校验**：数据逐字段溯源 + 三视口视觉 diff（`pnpm verify:diff`），差异区域局部修复，最多 5 轮。
7. **报告**：`REPORT.md` 记录完成度、数据溯源、脱敏与版权清单、已知限制。

## 变更卫生

- 只改本次任务相关文件；不修改无关 lockfile、配置或设计记录。
- 不使用破坏性 Git 命令覆盖他人改动。
- 每阶段用 ≤3 行汇报「做了什么 / 产出文件 / 下一步」。
