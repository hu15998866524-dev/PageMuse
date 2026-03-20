export type SlideCategory =
  | "cover"
  | "agenda"
  | "transition"
  | "data"
  | "chart"
  | "timeline"
  | "comparison"
  | "case-study"
  | "profile"
  | "ending";

export type SceneName =
  | "工作汇报"
  | "述职晋升"
  | "商业提案"
  | "品牌营销"
  | "路演融资"
  | "毕业答辩"
  | "教育培训"
  | "产品发布";

export type Slide = {
  id: string;
  title: string;
  coverImage: string;
  category: SlideCategory;
  scenes: SceneName[];
  tags: string[];
  style: string;
  summary: string;
  layoutAnalysis: string;
  visualFocus: string;
  reusableTips: string;
  createdAt: string;
  isFeatured: boolean;
  popularity: number;
  topic: string;
  dominantTone: string;
  sourceType: string;
};

export type Collection = {
  id: string;
  name: string;
  slideIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type FilterOption = {
  label: string;
  value: string;
};
