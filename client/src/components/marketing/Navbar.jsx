import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "../Logo";
import { Button } from "../ui/button";
import { ModeToggle } from "../ModeToggle";
import { Link } from "react-router-dom";
const Navbar = () => {
  const scrolled = useScrollTop();
  // console.log("scrolled", scrolled);
  const user = localStorage.getItem("user");
  console.log("Object.keys(user).length", user);

  const handleLogout = async () => {
    localStorage.clear();
    window.open("http://localhost:3851/logout", "_self");
  };
  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {user && Object.keys(user).length > 0 ? (
          <Button onClick={handleLogout} variant="ghost" size="sm">
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
        )}
      </div>
      <ModeToggle />
      {/* Navbar */}
    </div>
  );
};

export default Navbar;
