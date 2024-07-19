/* eslint-disable react/prop-types */
import { TabsTrigger } from "../ui/tabs";

const TabItem = ({ children, value, Icon }) => {
  return (
    <TabsTrigger
      value={value}
      className="border-0 w-full bg-transparent px-0 flex justify-start  gap-2 items-center text-sm data-[state=active]:border-b-0"
    >
      <span>
        <Icon className="w-5 h-5" />
      </span>
      <span className="capitalize md:block lg:block sm:hidden hidden ">
        {value}
      </span>
    </TabsTrigger>
  );
};

export default TabItem;
