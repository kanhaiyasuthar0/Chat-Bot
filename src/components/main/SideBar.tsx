export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a
              className="flex items-center py-2 px-4 bg-gray-700 rounded-md text-white hover:bg-gray-600 transition duration-150 ease-in-out"
              href="#"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a
              className="flex items-center py-2 px-4 bg-gray-700 rounded-md text-white hover:bg-gray-600 transition duration-150 ease-in-out"
              href="#"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2m-6 0V6m0 4v4m4-4v4m-4 0h4"
                ></path>
              </svg>
              Chat
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}