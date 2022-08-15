import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link href="/">
        <h1 data-cy="header-title" className="nav-title">
          TO DO LIST APP
        </h1>
      </Link>
    </nav>
  );
}
