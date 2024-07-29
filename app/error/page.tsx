"use client";
export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen mx-2 my-2 overflow-hidden ">
      <div className="px-6 py-2 rounded shadow-lg">
        <div className="mb-2 text-xl font-bold">
          Error Kang{" "}
          <a href="/auth/login" className="underline">
            Kembali
          </a>
          😭
        </div>
      </div>
    </div>
  );
}
