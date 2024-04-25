import React from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-b-gray-600"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="m-1.5 p-1.5">
            Home Page
          </a>
          <a href="/user_management" className="m-1.5 p-1.5">
            User Management
          </a>
          <a href="/files" className="m-1.5 p-1.5">
            Files List
          </a>
        </div>
        <Link className="m-1.5 p-1.5" href="/files">Profile</Link>
      </nav>
    </header>
  );
}
