/* eslint-disable react/prop-types */

import { cn } from "@/lib/utils";

const NotionLogo = ({ letter, isMyAccount }) => {
  return (
    <div
      className={cn(
        "flex-shrink-0  bg-transparent  border-black dark:bg-black dark:border-white p-1 flex-grow-0 border-y-2 border-x  ",
        isMyAccount ? "rounded-full" : "rounded-md"
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center ",
          isMyAccount ? "h-12 w-12" : "h-5 w-5"
        )}
      >
        <div className="absolute inset rounded-full dark:text-white text-black">
          <div className={cn("text-sm font-bold uppercase text-center")}>
            {letter}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionLogo;
