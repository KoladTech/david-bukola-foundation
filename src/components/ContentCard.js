export default function ContentCard({ title, subtitle, content }) {
  return (
    <div className={"space-y-2"}>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && (
          <h3 className="text-xl font-semibold text-gray-700">{subtitle}</h3>
        )}
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}
