import { Link, useLocation } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <img src={assetUrl("/img/404.png")} alt="Page not found" className="w-full max-w-120 h-auto mb-6" />
      <p className="text-sm text-neutral-500 mb-8">
        <span className="font-mono font-bold bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600">{pathname}</span>
        {" "}doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
      >
        <i className="material-symbols-rounded text-base">arrow_back</i>
        Back to home
      </Link>
    </main>
  );
}
