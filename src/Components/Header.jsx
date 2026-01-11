import React, { useState } from "react";
import { LogoutBtn } from "./Index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "My Listings", slug: "/search", active: authStatus },
    { name: "Add Listing", slug: "/add-property", active: authStatus },
  ];

  return (
    <header className="bg-white/90 backdrop-blur shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl md:text-3xl text-indigo-700 font-bold tracking-tight"
        >
          HomeQuest
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAV LINKS + AUTH */}
        <div
  className={`
    ${menuOpen ? "flex" : "hidden"}
    md:flex
    absolute md:static
    top-full left-0
    w-full md:w-auto
    bg-white md:bg-transparent
    flex-col md:flex-row
    items-start md:items-center
    gap-4
    px-4 py-4 md:p-0
    shadow md:shadow-none
  `}
>
          {/* LINKS */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                    className="
                      text-gray-700
                      hover:text-indigo-700
                      font-medium
                      px-3 py-2
                      rounded-lg
                      transition
                      w-full md:w-auto
                      text-left md:text-center
                    "
                  >
                    {item.name}
                  </button>
                )
            )}
          </div>

          {/* AUTH ACTIONS */}
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {!authStatus && (
              <>
                <Button
                  size="sm"
                  bgColor="bg-transparent"
                  textColor="text-indigo-700"
                  className="border border-indigo-700 w-full md:w-auto"
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                >
                  Login
                </Button>

                <Button
                  size="sm"
                  className="w-full md:w-auto"
                  onClick={() => {
                    navigate("/signup");
                    setMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}

            {authStatus && <LogoutBtn />}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
