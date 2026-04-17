export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white py-4 text-center text-sm text-neutral-400">
      <p>© {year} • Designed with intention.</p>
    </footer>
  );
}
