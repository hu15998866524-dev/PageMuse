export function DetailAnalysisBlock({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
      <div className="text-sm text-white/55">{title}</div>
      <p className="mt-3 text-sm leading-7 text-white/88">{content}</p>
    </div>
  );
}
