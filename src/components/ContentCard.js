export default function ContentCard({ title, content }) {
  return (
    <>
      {/* Left Side - Text */}
      <div className="w-full justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    </>
  );
}
