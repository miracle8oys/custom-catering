import { useState } from "react";
import { IoExitOutline, IoEnterOutline } from "react-icons/io5";
import { useUserContext } from "../utility/userCredential";
import { userLogout } from "../utility/auth";
import { useNavigate } from "react-router-dom";

function UserNavbar() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { displayName, photoURL, uid } = useUserContext();
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout().then(() => navigate("/login"));
  };
  return (
    <nav className="dark:bg-slate-700 bg-slate-500 border-gray-900 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap justify-between items-center md:pr-12">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Flowbite
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-slate-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setToggleMenu((current) => !current)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            toggleMenu ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col gap-7 p-4 mt-4 rounded-lg border border-gray-100 mb-3 md:mb-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li>
              <a
                href="/"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/cart"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 dark:text-white md:hover:text-blue-700 md:p-0"
              >
                Cart
              </a>
            </li>
            <li>
              <a
                href="/transfer"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 dark:text-white md:hover:text-blue-700 md:p-0"
              >
                Payment
              </a>
            </li>
          </ul>

          <div className="block md:hidden">
            {uid ? (
              <div className="flex justify-end gap-5 items-center relative dark:text-white text-black">
                <button
                  onClick={() => setShowLogout((current) => !current)}
                  className="flex items-center gap-3 md:border-l md:pl-5 border-secondary"
                >
                  <p className="text-primary text-sm hidden md:block">
                    {displayName}
                  </p>
                  <div className="w-12 h-12">
                    <img
                      className="rounded-full"
                      src={`${photoURL}`}
                      alt="user"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </button>
                {showLogout && uid && (
                  <div
                    className={`bg-white text-red-500 shadow-lg py-2 px-4 top-[64px] absolute rounded-md`}
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1"
                    >
                      <IoExitOutline />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-3xl text-green-500">
                <IoEnterOutline onClick={() => navigate("/login")} />
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:block">
          {uid ? (
            <div className="flex justify-end gap-5 items-center relative">
              <button
                onClick={() => setShowLogout((current) => !current)}
                className="flex items-center gap-3 md:border-l md:pl-5 border-secondary dark:text-white text-black"
              >
                <p className="text-primary text-sm hidden md:block">
                  {displayName}
                </p>
                <div className="w-12 h-12">
                  <img
                    className="rounded-full object-cover"
                    src={`${photoURL}`}
                    alt="user"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
              {showLogout && (
                <div
                  className={`bg-white text-red-500 shadow-lg py-2 px-4 top-[64px] absolute rounded-md`}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1"
                  >
                    <IoExitOutline />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-3xl text-green-500">
              <IoEnterOutline onClick={() => navigate("/login")} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
