export default function ListSkeleton() {
  return (
    <div>
      <div className="skeleton mx-auto my-4 mb-2 w-44 aspect-[7/10]"></div>
      <div className="skeleton mx-auto w-32 h-3"></div>
      <div className="flex gap-2 w-24 mx-auto mt-2">
        <div className="skeleton mx-auto w-8 h-4"></div>
        <div className="skeleton mx-auto w-8 h-4"></div>
        <div className="skeleton mx-auto w-8 h-4"></div>
      </div>
    </div>
  );
}
