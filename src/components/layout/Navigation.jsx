import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Home, Cpu, LogIn, UserPlus } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Simulation", path: "/simulation", icon: <Cpu size={18} /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#2b3b52] to-[#1f2a38] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left - Brand / Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-white text-xl font-bold tracking-wide flex items-center gap-2">
              <Cpu className="text-blue-400" size={22} />
              PageAlgo
            </div>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-blue-500/20"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right - Auth Buttons */}
          <div className="flex items-center space-x-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition">
                  <LogIn size={16} />
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition">
                  <UserPlus size={16} />
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "ring-2 ring-blue-500",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
