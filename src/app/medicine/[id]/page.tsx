type Props = {
  params: {
    id: string;
  };
};

export default async function MedicinePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="mx-auto p-6 max-w-3xl">
      <h1 className="font-semibold text-2xl">Medicine Details</h1>

      <p className="mt-2 text-gray-600">
        Medicine ID: <span className="font-mono">{id}</span>
      </p>
    </div>
  );
}
