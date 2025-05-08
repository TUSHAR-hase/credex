import logo from "../assets/seel.jpg"

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={logo} // 👈 update the path as needed
            alt="SoftSell Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-bold dark:text-white">SoftSell</span>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
        >
          {/* {darkMode ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )} */}
        </button>
      </div>
    </header>
  )
}
