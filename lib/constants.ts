import { SceneName, SlideCategory } from "@/lib/types";

export const categoryMeta: Record<
  SlideCategory,
  { label: string; slug: string; description: string }
> = {
  cover: {
    label: "封面页",
    slug: "cover",
    description: "适合建立第一印象的封面结构，强调标题、氛围与汇报身份。 ",
  },
  agenda: {
    label: "目录页",
    slug: "agenda",
    description: "适合梳理汇报章节顺序，让内容框架在开场阶段就足够清楚。",
  },
  transition: {
    label: "过渡页",
    slug: "transition",
    description: "用于章节切换与节奏控制，适合建立内容层次和阅读停顿。",
  },
  data: {
    label: "数据页",
    slug: "data",
    description: "围绕关键指标、结论表达与数据摘要收录的参考页面。",
  },
  chart: {
    label: "图表页",
    slug: "chart",
    description: "适合用图形化方式表达趋势、结构与对比关系的页面参考。",
  },
  timeline: {
    label: "时间轴页",
    slug: "timeline",
    description: "适合呈现发展历程、阶段里程碑与节奏推进。",
  },
  comparison: {
    label: "对比页",
    slug: "comparison",
    description: "适合展示前后变化、方案差异与竞品对照。",
  },
  "case-study": {
    label: "案例页",
    slug: "case-study",
    description: "适合陈列项目成果、客户案例与代表性落地内容。",
  },
  profile: {
    label: "人物介绍页",
    slug: "profile",
    description: "适合展示创始人、讲师与团队成员的专业信息。",
  },
  ending: {
    label: "结尾页",
    slug: "ending",
    description: "适合收束观点、表达感谢与引导下一步行动。",
  },
};

export const sceneMeta: Record<SceneName, { slug: string; description: string }> = {
  工作汇报: {
    slug: "work-report",
    description: "适合项目进展、季度复盘与阶段成果汇报。",
  },
  述职晋升: {
    slug: "promotion-review",
    description: "适合成果总结、价值表达与晋升场景的正式汇报。",
  },
  商业提案: {
    slug: "business-proposal",
    description: "适合方案陈述、策略沟通与客户提案。",
  },
  品牌营销: {
    slug: "brand-marketing",
    description: "适合活动策划、品牌策略与营销方案展示。",
  },
  路演融资: {
    slug: "fundraising-pitch",
    description: "适合核心指标、市场机会与团队介绍表达。",
  },
  毕业答辩: {
    slug: "graduation-defense",
    description: "适合课题介绍、研究成果与答辩陈述。",
  },
  教育培训: {
    slug: "education-training",
    description: "适合课程讲解、知识结构与教学成果展示。",
  },
  产品发布: {
    slug: "product-launch",
    description: "适合卖点说明、功能亮点与发布会节奏表达。",
  },
};

export const topics = [
  {
    name: "述职汇报",
    description: "适合成果总结、项目复盘与晋升表达。",
    href: "/scene/promotion-review",
    tone: "accent",
  },
  {
    name: "路演融资",
    description: "聚焦投资人沟通中最关键的数字与故事。",
    href: "/scene/fundraising-pitch",
    tone: "charcoal",
  },
  {
    name: "工作复盘",
    description: "围绕季度、年度与阶段复盘整理参考页。",
    href: "/scene/work-report",
    tone: "sage",
  },
  {
    name: "营销策划",
    description: "适合品牌策略、Campaign 与提案场景。",
    href: "/scene/brand-marketing",
    tone: "tertiary",
  },
];

export const defaultCollectionId = "collection-default";
