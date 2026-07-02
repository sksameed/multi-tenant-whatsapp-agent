import { Bell, Search, Bot } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8">

      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="bg-green-600 p-2 rounded-lg">
          <Bot className="text-white" size={24} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-800">
            WhatsApp AI Agent
          </h1>

          <p className="text-xs text-gray-500">
            Multi-Tenant Dashboard
          </p>
        </div>
      </div>

      {/* Center */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search conversations..."
          className="ml-3 bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell
            size={22}
            className="text-gray-600 hover:text-green-600 transition"
          />

          <span className="absolute -top-2 -right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            A
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-sm">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Online
            </p>
          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;