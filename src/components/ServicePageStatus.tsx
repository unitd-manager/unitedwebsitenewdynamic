export function ServicePageStatus({ message }: { message: string }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#05060f] px-6 text-center text-white">
      <p role="status" className="max-w-xl text-lg text-slate-300">{message}</p>
    </main>
  );
}
