import React from "react";

const DashboardMainPage = () => {
  return (
    <div className="h-screen w-full">
      <div className="max-w-sm  mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <div className="flex flex-col items-center">
              <h5 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                Feature Under Development
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                This feature is coming soon!
              </span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Notify Me
                </a>
                <a
                  href="#"
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainPage;
