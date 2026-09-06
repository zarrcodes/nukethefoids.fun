export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="footer-inner">
          <span className="footer-brand">NukeTheFoids.fun</span>
          <span className="footer-copy">&copy; {new Date().getFullYear()} NukeTheFoids.fun. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
