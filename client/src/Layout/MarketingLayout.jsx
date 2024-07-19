import Navbar from '@/components/marketing/Navbar';

// eslint-disable-next-line react/prop-types
const MarketingLayout = ({children}) => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
}

export default MarketingLayout