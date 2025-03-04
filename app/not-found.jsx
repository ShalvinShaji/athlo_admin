export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#111111] text-white">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-300 mt-2">Oops! Page not found.</p>
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
