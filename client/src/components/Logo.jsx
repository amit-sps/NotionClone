// import { Poppins } from "next/font/google";
import logo from "../assets/logo.svg";
import logoDark from "../assets/logo-dark.svg";
import { cn } from "@/lib/utils";

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "600"],
// });

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <img
        src={logo}
        height="40"
        width="40"
        alt="Logo"
        className="dark:hidden"
      />
      <img
        src={logoDark}
        height="40"
        width="40"
        alt="Logo"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold")}>Motion</p>
    </div>
  );
};
