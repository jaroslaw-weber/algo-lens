// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full bg-base-100 flex-shrink ">
      <div className="navbar  mx-auto bg-primary text-primary-content shadow">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case font-display text-xl">
          algo-lens: see algorithms in action! 
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link href="/problems">Problems</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
