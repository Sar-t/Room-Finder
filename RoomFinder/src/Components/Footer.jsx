import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* TOP GRID */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
        ">
          {/* Logo + Copyright */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              HomeQuest
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed">
              Find verified rooms. Connect with trusted owners. Rent with confidence.
            </p>

            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} HomeQuest. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-300 tracking-wide">
              Company
            </h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-300 tracking-wide">
              Support
            </h3>
            <ul className="space-y-2">
              {["Account", "Help", "Contact Us", "Customer Support"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-300 tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <hr className="my-10 border-slate-800" />

        {/* BOTTOM SECTION */}
        <div className="
          flex flex-col
          sm:flex-row
          justify-between
          items-center
          gap-6
        ">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Built with ❤️ for renters and owners
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
