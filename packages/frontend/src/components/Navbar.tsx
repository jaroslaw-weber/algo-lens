// components/Navbar.tsx
import { useState, useEffect } from 'react';
import { authService } from '../auth/authService';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((token, model) => {
      setIsAuthenticated(authService.isAuthenticated());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    authService.logout();
    // Redirect to home or login page after logout
    window.location.href = '/';
  };

  return (
    <div className="w-full bg-base-100 flex-shrink ">
      <div className="navbar  mx-auto bg-primary text-primary-content shadow">
        <div className="flex-1">
          <a
            href="/"
            className="btn btn-ghost normal-case font-display text-xl"
          >
            <span className="hidden sm:inline">
              algolens: see algorithms in action!
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
            {isAuthenticated ? (
              <>
                <li>
                  <a href="/list?filter=bookmark">Bookmarked Problems</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
