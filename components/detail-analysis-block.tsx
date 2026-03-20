export function DetailAnalysisBlock({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-[24px] border border-line bg-panel p-6">
      <div className="text-sm text-soft">{title}</div>
      <p className="mt-3 text-sm leading-7 text-ink">{content}</p>
    </div>
  );
}
