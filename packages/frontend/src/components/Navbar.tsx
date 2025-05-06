// components/Navbar.tsx

const Navbar = () => {
  return (
    <div className="w-full bg-base-100 flex-shrink ">
      <div className="navbar  mx-auto bg-primary text-primary-content shadow">
        <div className="flex-1">
          <a
            href="/"
            className="btn btn-ghost normal-case font-display text-xl"
          >
            <span className="hidden sm:inline">
              algo-lens: see algorithms in action!
            </span>
            <span className="inline sm:hidden">algo-lens</span>
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <a href="/list?tag=blind75">Blind75</a>
            </li>
            <li>
              <a href="/list">All Problems</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
