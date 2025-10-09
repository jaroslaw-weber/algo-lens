// components/Navbar.tsx
import { useState, useEffect } from "react";
import { authService } from "../auth/authService";
import { trackUmamiEvent } from "../utils/umami";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [userPlan, setUserPlan] = useState<"free" | "premium">(
    authService.getUserPlan()
  );
  const [userEmail, setUserEmail] = useState<string | null>(
    authService.getUser()?.email || null
  );

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((token, model) => {
      setIsAuthenticated(authService.isAuthenticated());
      setUserPlan(authService.getUserPlan());
      setUserEmail(authService.getUser()?.email || null);
    });

    // Refresh auth data on mount
    authService.refreshAuth().catch(console.error);

    // Periodic refresh every 5 minutes
    const interval = setInterval(
      () => {
        authService.refreshAuth().catch(console.error);
      },
      5 * 60 * 1000
    );

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    authService.logout();
    // Redirect to home or login page after logout
    window.location.href = "/";
  };

  return (
    <div className="w-full bg-base-100 flex-shrink">
      <div className="navbar mx-auto bg-primary text-primary-content shadow">
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
        <div className="flex-none lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 p-2 shadow bg-primary text-primary-content rounded-box w-52"
            >
              <li>
                <a
                  href="https://github.com/jaroslaw-weber/algo-lens"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github text-2xl mr-2"></i>GitHub
                </a>
              </li>
              <li className="menu-title">
                <span>Problems</span>
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
              <li>
                <a
                  href="/list?plan=premium"
                  onClick={() => trackUmamiEvent("click-nav-premium-problems")}
                >
                  <i className="fas fa-star mr-2"></i>Premium Problems
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  onClick={() => trackUmamiEvent("click-nav-pricing")}
                >
                  <i className="fas fa-dollar-sign mr-2"></i>Pricing
                </a>
              </li>
              <li className="menu-title">
                <span>Account</span>
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
                      <i className="fas fa-bookmark mr-2"></i>Bookmarked
                      Problems
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
        <div className="flex-none hidden lg:flex">
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
            <li className="dropdown dropdown-hover">
              <label tabIndex={0}>
                <i className="fas fa-list mr-2"></i>Problems
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content p-2 shadow bg-primary text-primary-content rounded-box w-52"
              >
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
                <li>
                  <a
                    href="/list?plan=premium"
                    onClick={() =>
                      trackUmamiEvent("click-nav-premium-problems")
                    }
                  >
                    <i className="fas fa-star mr-2"></i>Premium Problems
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="/pricing"
                onClick={() => trackUmamiEvent("click-nav-pricing")}
              >
                <i className="fas fa-dollar-sign mr-2"></i>Pricing
              </a>
            </li>
            <li className="dropdown dropdown-hover">
              <label tabIndex={0}>
                <i className="fas fa-user mr-2"></i>Account
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content p-2 shadow bg-primary text-primary-content rounded-box w-52"
              >
                {isAuthenticated ? (
                  <>
                    <li>
                      <a
                        href="/list?filter=bookmark"
                        onClick={() =>
                          trackUmamiEvent("click-nav-bookmarked-problems")
                        }
                      >
                        <i className="fas fa-bookmark mr-2"></i>Bookmarked
                        Problems
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
            </li>
          </ul>
          <div className="flex items-center gap-2 ml-4">
            <span
              className={`badge ${userPlan === "premium" ? "badge-primary" : "badge-secondary"}`}
            >
              {userPlan === "premium" ? "Premium" : "Free"}
            </span>
            {isAuthenticated && userEmail && (
              <span
                className="text-sm opacity-75 truncate max-w-32"
                title={userEmail}
              >
                {userEmail.split("@")[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
