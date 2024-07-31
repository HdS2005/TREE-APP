import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="flex flex-col bg-green-400 text-black border-r border-green-600 h-full p-4">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          {/* Replacing the logo with text "NewTree" */}
          <span className="text-2xl font-bold text-white">NewTree</span>
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold">{user.name}</p>
              <p className="text-sm text-green-900">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`group ${isActive ? "bg-green-600" : ""} rounded-md`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4 text-black hover:bg-green-600 rounded-md"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert ${
                      isActive ? "invert" : ""
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="flex items-center gap-2 mt-auto text-white hover:bg-green-400"
        onClick={(e) => handleSignOut(e)}
      >
        <img src="/assets/icons/logout.svg" alt="logout" className="w-5 h-5" />
        <p className="text-sm">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
