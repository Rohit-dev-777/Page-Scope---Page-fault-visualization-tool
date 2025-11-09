import { Link, useLocation } from "react-router-dom";
import { Home, Cpu, LogIn, UserPlus } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

const IS_CLERK_ENABLED = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Simulation", path: "/simulation", icon: <Cpu size={18} /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0f172a] border-b border-[#1e293b]/80 shadow-[0_2px_15px_rgba(0,0,0,0.4)] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left Logo */}
          <div className="flex items-center space-x-2">
            <Cpu size={22} className="text-blue-500 drop-shadow-glow" />
            <span className="text-gray-100 font-semibold text-lg tracking-wide">PageAlgo</span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40"
                    : "text-gray-300 hover:text-blue-400 hover:bg-[#1e293b]/80 hover:shadow-md hover:shadow-blue-500/20"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Auth Buttons */}
          <div className="flex items-center space-x-3">
            {IS_CLERK_ENABLED ? (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md shadow-blue-700/40 transition">
                      <LogIn size={16} /> Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-gray-100 px-4 py-2 rounded-lg text-sm font-medium border border-[#334155] transition">
                      <UserPlus size={16} /> Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "ring-2 ring-blue-600 shadow-md shadow-blue-700/30",
                      },
                    }}
                  />
                </SignedIn>
              </>
            ) : (
              <div className="text-xs text-gray-400 px-3 py-1 bg-gray-800/50 rounded-lg border border-gray-700">
                Development Mode
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
