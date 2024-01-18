export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
      <div className="animate-spin h-12 w-12 border-t-2 border-gray-900 rounded-full" />
    </div>
  );
}
