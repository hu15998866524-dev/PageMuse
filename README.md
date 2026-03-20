# PageMuse

一个帮助用户按场景、页型与风格检索优秀 PPT 单页的设计参考网站，面向 PPT 小白、初级设计师与职场汇报人群。

## 功能范围

- 首页推荐：热门单页、最新单页、专题推荐
- 分类检索：封面页、目录页、过渡页、数据页、图表页、时间轴页、对比页、案例页、人物介绍页、结尾页
- 场景检索：工作汇报、述职晋升、商业提案、品牌营销、路演融资、毕业答辩、教育培训、产品发布
- 单页详情：标签、场景、结构拆解、相似推荐、收藏
- 收藏夹：本地存储、创建收藏夹、查看收藏内容
- 搜索：按标题、标签、页型、场景搜索

## 技术栈

- Next.js 15
- TypeScript
- Tailwind CSS
- App Router
- lucide-react
- 本地 mock data + localStorage

## 目录结构

- `app/`: 页面路由
- `components/`: 通用组件与客户端交互组件
- `lib/`: mock data、常量、类型与工具函数

## 本地运行

先确保本机安装 Node.js 20 及以上。

```bash
cd ppt-inspiration-mvp
npm install
npm run dev
```

默认访问地址：

```bash
http://localhost:3000
```

## 已实现页面

- `/`
- `/discover`
- `/category/[slug]`
- `/scene/[slug]`
- `/slide/[id]`
- `/favorites`
- `/search`

## 数据说明

- 预置 30 条 `Slide` 示例数据
- 预置 3 个 `Collection`
- 收藏夹数据保存在浏览器 `localStorage`

## 交互说明

- 首页卡片有 hover 反馈
- 分类页和场景页支持标签筛选
- 搜索支持标题、标签、页型、场景匹配
- 详情页支持收藏
- 收藏页支持空状态与多收藏夹查看
- 相似推荐基于页型、标签和场景匹配

## 后续扩展建议

- 接入真实图片资源与内容后台
- 加入登录注册与多端同步
- 支持移动收藏到指定收藏夹的弹层交互
- 增加专题推荐页与编辑策展机制
- 接入 CMS 或数据库
