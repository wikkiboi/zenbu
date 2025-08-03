export default function ButtonRowSkeleton() {
  return (
    <div className="flex gap-2 md:gap-4 items-center md:w-1/4 lg:w-1/6 w-1/3 h-8 mx-auto my-2 rounded-md">
      <div className="skeleton w-1/3 h-7 rounded-md" />
      <div className="skeleton w-1/3 h-7 rounded-md" />
      <div className="skeleton w-1/3 h-7 rounded-md" />
    </div>
  );
}
