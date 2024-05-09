// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">TypeScript Visualizer</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/problems">Problems</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
