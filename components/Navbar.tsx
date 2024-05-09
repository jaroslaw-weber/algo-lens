// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full bg-base-100 flex-shrink">
      <div className="navbar bg-base-100 max-w-3xl mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            algo-lens
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link href="/problems">Problems</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
