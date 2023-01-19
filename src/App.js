import React from "react";
import { Home } from "./Home";
import { Nav } from "./Nav";

export function App() {
  return (
    <div className="dark:bg-gray-800 text-white">
      <Nav />
      <Home />
    </div>
  );
}
