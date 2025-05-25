// components/Navbar.tsx
import { useState, useEffect } from "react";
import { authService } from "../auth/authService";
import { trackUmamiEvent } from "../utils/umami";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );

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
    window.location.href = "/";
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
              <a
                href="https://github.com/jaroslaw-weber/algo-lens"
                className="tooltip tooltip-bottom"
                data-tip="Go to GitHub Repo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github text-2xl mr-2"></i>GitHub
              </a>
            </li>
            <li>
              <a
                href="/list?tag=blind75"
                onClick={() => trackUmamiEvent("click-nav-blind75")}
              >
                <i className="fas fa-list-ol mr-2"></i>Blind75
              </a>
            </li>
            <li>
              <a
                href="/list"
                onClick={() => trackUmamiEvent("click-nav-all-problems")}
              >
                <i className="fas fa-th-list mr-2"></i>All Problems
              </a>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <a
                    href="/list?filter=bookmark"
                    onClick={() =>
                      trackUmamiEvent("click-nav-bookmarked-problems")
                    }
                  >
                    <i className="fas fa-bookmark mr-2"></i>Bookmarked Problems
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      trackUmamiEvent("click-logout");
                    }}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/login"
                    onClick={() => trackUmamiEvent("click-nav-login")}
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    onClick={() => trackUmamiEvent("click-nav-register")}
                  >
                    <i className="fas fa-user-plus mr-2"></i>Register
                  </a>
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
