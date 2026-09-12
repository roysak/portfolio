import { useLocation } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import Button, { ArrowIcon } from "../components/Button";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-gutter pt-32 pb-16 text-center">
      <img src={assetUrl("/img/404.png")} alt="Page not found" className="w-full max-w-[420px] h-auto mb-6 rounded" />
      <p className="text-bone-2 mb-8">
        <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-ink-3 text-bone">{pathname}</code> doesn't exist.
      </p>
      <Button to="/">
        <ArrowIcon /> Back to home
      </Button>
    </main>
  );
}
