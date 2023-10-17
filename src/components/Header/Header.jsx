import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="pt-4 pl-10 pr-10 pb-4 flex items-center text-lg bg-blue-50 text-blue-900">
      <p className="mr-8 font-bold">Test tasks:</p>
      <nav>
        <ul className="flex flex-wrap gap-4">
          <li>
            <NavLink
              className="bg-blue-100 rounded-md px-4 py-2 hover:bg-blue-200 aria-[current=page]:bg-blue-300"
              to="/"
            >
              1. Filter
            </NavLink>
          </li>
          <li>
            <NavLink
              className="bg-blue-100 rounded-md px-4 py-2 hover:bg-blue-200 aria-[current=page]:bg-blue-300"
              to="dnd"
            >
              2. DND
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
