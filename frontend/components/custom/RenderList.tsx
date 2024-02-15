type Item = {
  id: string;
};

interface RenderListProps {
  data: Item[];
  component: React.ComponentType<{ item: Item }>;
  columns?: number;
}

export default function RenderList({
  data,
  component: Component,
}: RenderListProps) {
  if (!data || data.length === 0) return <p>No Items Found</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <Component key={item.id} item={item} />
      ))}
    </div>
  );
}
