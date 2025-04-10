import { Link } from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarMain() {
  return (
    <nav className="relative flex items-center justify-between sm:h-10 md:justify-center py-6 px-4 mt-2">
      <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" aria-label="Home">
            <img
              src="https://www.svgrepo.com/show/491978/gas-costs.svg"
              height="40"
              width="40"
            />
          </Link>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              id="main-menu"
              aria-label="Main menu"
              aria-haspopup="true"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:space-x-10">
        <Link
          href="/blog"
          className="font-medium text-white transition duration-150 ease-in-out"
        >
          Create Blog
        </Link>
        <Link
          href="/blogs-all"
          className="font-medium text-white transition duration-150 ease-in-out"
        >
          All Blogs
        </Link>
        {/* <a href="/blog"
            className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Blog</a>
        <a href="https://docs.pingping.io" target="_blank"
            className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Docs</a> */}
      </div>
      <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
        <span className="inline-flex">
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-white focus:outline-none transition duration-150 ease-in-out"
          >
            Login
          </Link>
        </span>
        <span className="inline-flex rounded-md shadow ml-2">
          <Link
            href="/signup"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </nav>
  );
}
