"use client";

export default function GlobalError() {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center">
        <div className="max-w-lg px-6 text-center">
          <h1 className="text-4xl font-bold">
            Critical Application Error
          </h1>

          <p className="mt-4 text-gray-600">
            Pedumo encountered an unexpected system error.
            Please refresh the page or try again later.
          </p>
        </div>
      </body>
    </html>
  );
}