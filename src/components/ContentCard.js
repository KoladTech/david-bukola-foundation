// export default function ContentCard({ title, subtitle, content }) {
//   return (
//     <>
//       {/* Left Side - Text */}
//       <div className="w-full justify-center items-center">
//         <h2 className="text-2xl font-bold mb-4">{title}</h2>
//         {subtitle && (
//           <span className="inline">
//             <h3 className=" text-xl font-semibold text-gray-700">{subtitle}</h3>
//           </span>
//         )}
//         <p className="text-gray-600">{content}</p>
//       </div>
//     </>
//   );
// }

export default function ContentCard({ title, subtitle, content }) {
  return (
    <div className={"space-y-2"}>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
        <h2 className="text-3xl text-center font-bold">{title}</h2>
        {subtitle && (
          <h3 className="text-xl font-semibold text-gray-700">{subtitle}</h3>
        )}
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}
