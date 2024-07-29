export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen mx-2 my-2 overflow-hidden ">
      <div className="px-6 py-2 rounded shadow-lg">
        <div className="mb-2 text-xl font-bold">
          ❌ Kamu gabisa kesini kang{" "}
          <a href="/auth/login" className="underline">
            Kembali
          </a>
          ❌
        </div>
      </div>
    </div>
  );
}
