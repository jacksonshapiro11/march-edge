export default function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-16 py-6 text-center">
      <div className="text-xs text-text-faint leading-relaxed">
        <p>Built with systems thinking. Powered by data.</p>
        <p className="mt-1">
          <a
            href="https://cosmictrex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple font-semibold no-underline hover:text-purple-light transition-colors"
          >
            Mental Models Observatory
          </a>
          {" · "}
          <span>© 2026 Cosmic Trex</span>
        </p>
      </div>
    </footer>
  );
}
