import ToggleSwitch from "../../dashboard/Header/ToggleSwitch";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";

const Header = ({ setOpen }) => {
  const user = useSelector((state) => state.auth.user);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Convert backend role into user-friendly display name
  const getRoleName = () => {
    switch (user?.role?.toLowerCase()) {
      case "admin":
        return "Admin";

      case "co-admin":
      case "co_admin":
      case "coadmin":
        return "Co-Admin";

      case "user":
        return "Employee";

      default:
        return "Employee";
    }
  };

  // Get first letter for avatar
  const getInitial = () => {
    return (
      user?.first_name?.charAt(0)?.toUpperCase() ||
      user?.name?.charAt(0)?.toUpperCase() ||
      "U"
    );
  };

  // Get user's complete name
  const getUserName = () => {
    if (user?.first_name) {
      return `${user.first_name} ${user.last_name || ""}`.trim();
    }

    return user?.name || "John Doe";
  };

  return (
    <div className="text-black py-3 bg-[#FFFFFF] dark:bg-[#2E2F2F] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] w-full flex items-center justify-end z-50">
      <div className="w-full flex items-center justify-between px-3 sm:px-4 lg:px-6">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden shrink-0"
            onClick={() => setOpen?.(true)}
            aria-label="Open sidebar"
          >
            <Menu
              size={28}
              className="text-black dark:text-white"
            />
          </button>

          {/* PROFILE SECTION */}
          <div className="flex gap-2 sm:gap-3 items-center min-w-0">

            {/* Avatar */}
            <div className="size-10 sm:size-12 shrink-0 rounded-full bg-gradient-to-b from-red-600 to-red-900 text-white flex items-center justify-center font-semibold text-lg sm:text-xl">
              {getInitial()}
            </div>

            {/* Profile Text */}
            <div className="flex flex-col min-w-0 leading-tight">

              {/* User Name */}
              <div className="flex items-center gap-1 text-black dark:text-white min-w-0">
                <h1 className="font-light text-base sm:text-lg whitespace-nowrap">
                  Hello!
                </h1>

                <h1 className="font-semibold text-base sm:text-lg truncate">
                  {getUserName()}
                </h1>
              </div>

              {/* Dynamic Role */}
              <div className="text-[#989696] dark:text-gray-400 font-semibold text-xs sm:text-sm mt-1 truncate">
                {getRoleName()}
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          {/* Desktop Date + Theme */}
          <div className="hidden sm:flex items-center gap-2 text-base dark:text-white">

            <div className="flex items-center justify-center gap-1.5">
              <span className="font-bold">
                {dayName}
              </span>

              <span className="font-light">
                | {formattedDate}
              </span>
            </div>

            <ToggleSwitch />
          </div>

          {/* Mobile Controls */}
          <div className="flex sm:hidden items-center gap-2">

            <ToggleSwitch />

            <button
              type="button"
              onClick={() => setOpen?.(true)}
              className="inline-flex items-center justify-center rounded-full p-2 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;