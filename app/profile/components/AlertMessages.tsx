interface AlertMessagesProps {
  error?: string;
  success?: string;
}

export default function AlertMessages({ error, success }: AlertMessagesProps) {
  if (!error && !success) return null;

  return (
    <>
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
          {success}
        </div>
      )}
    </>
  );
}
