export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-100 bg-white py-8 text-center text-sm text-neutral-400">
      <p>© {year} • Designed with intention.</p>
    </footer>
  );
}
