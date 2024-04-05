import React, { useState } from "react";

const SettingsDialog: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<string>("accountPreferences");

  const renderSection = () => {
    switch (activeSection) {
      case "accountPreferences":
        return <AccountPreferences />;
      case "notificationSettings":
        return <NotificationSettings />;
      case "themeCustomization":
        return <ThemeCustomization />;
      default:
        return <AccountPreferences />;
    }
  };

  return (
    <div className="flex dark:bg-gray-800 dark:text-gray-200 h-full">
      <div className="w-64 p-5">
        <ul className="space-y-4">
          <li
            className="cursor-pointer"
            onClick={() => setActiveSection("accountPreferences")}
          >
            Account Preferences
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setActiveSection("notificationSettings")}
          >
            Notification Settings
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setActiveSection("themeCustomization")}
          >
            Theme
          </li>
        </ul>
      </div>
      <div className="flex-grow p-5">{renderSection()}</div>
    </div>
  );
};

const AccountPreferences: React.FC = () => (
  <section className="space-y-4">
    <h2 className="text-lg font-semibold">Account Preferences</h2>
    <div>
      <label htmlFor="language-select" className="block text-sm font-medium">
        Language
      </label>
      <select
        id="language-select"
        className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        {/* Add more options as needed */}
      </select>
    </div>
    <div>
      <label htmlFor="timezone-select" className="block text-sm font-medium">
        Time Zone
      </label>
      <select
        id="timezone-select"
        className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="UTC-5">Eastern Time</option>
        <option value="UTC-8">Pacific Time</option>
        {/* Add more options as needed */}
      </select>
    </div>
  </section>
);

const NotificationSettings: React.FC = () => (
  <section className="space-y-4">
    <h2 className="text-lg font-semibold">Notification Settings</h2>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="email-notifications"
        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <label
        htmlFor="email-notifications"
        className="ml-2 block text-sm font-medium"
      >
        Email Notifications
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="sms-notifications"
        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <label
        htmlFor="sms-notifications"
        className="ml-2 block text-sm font-medium"
      >
        SMS Notifications
      </label>
    </div>
  </section>
);

const ThemeCustomization: React.FC = () => (
  <section className="space-y-4">
    <h2 className="text-lg font-semibold">Theme</h2>
    <div className="flex items-center">
      <input
        type="radio"
        id="light-theme"
        name="theme"
        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <label htmlFor="light-theme" className="ml-2 block text-sm font-medium">
        Light
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="radio"
        id="dark-theme"
        name="theme"
        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <label htmlFor="dark-theme" className="ml-2 block text-sm font-medium">
        Dark
      </label>
    </div>
  </section>
);

export default SettingsDialog;
