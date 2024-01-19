export default async function RenderList({
  data,
  component,
}: {
  readonly data: any;
  readonly component: any;
}) {
  const Component = component;
  console.log(data);
  if (!data) return <p>No Items Found</p>;
  return (
    <div className="grid gap-4 grid-cols-3 p-6">
      {data.map((item: any) => (
        <Component key={item.id} item={item} />
      ))}
    </div>
  );
}
