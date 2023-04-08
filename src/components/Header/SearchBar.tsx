import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import React from "react";

const SearchBar = () => {
  return (
    <div className="relative hidden text-gray-500 sm:block">
      <input
        type="text"
        className="input-secondary input input-sm w-[450px] pl-10"
        placeholder="Szukaj osób, społeczności..."
      />
      <div className="absolute left-2 top-2 text-gray-500">
        <MagnifyingGlassIcon className="h-6" />
      </div>
    </div>
  );
};

export default SearchBar;
