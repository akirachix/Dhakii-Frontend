'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChartBar, FaUserNurse } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import { PiHospitalFill } from 'react-icons/pi';
import { RiTeamFill } from 'react-icons/ri';
import Image from 'next/image';
const Sidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  const SidebarItem = ({ Icon, label, path }: { Icon: React.ElementType, label: string, path: string }) => {
    const isActive = pathname === path || (path === '/chps' && pathname.startsWith('/chps'));
    return (
      <Link
        href={path}
        className={`group flex items-center px-4 py-3 transition-colors duration-200 rounded-md ${
          isActive ? 'text-white bg-[#F18721]' : 'text-gray-700 hover:bg-[#F18721] hover:text-white'
        }`}
      >
        <Icon
          className={`mr-4 text-2xl ${
            isActive ? 'text-white' : 'text-gray-700 group-hover:text-white'
          }`}
        />
        <span
          className={`font-semibold text-[18px] ${
            isActive ? 'text-white' : 'group-hover:text-white'
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };
  return (
    <div className="fixed h-screen w-72 bg-white text-gray-800 flex flex-col px-6 border-4 border-[#02A6A6] font-nunito">
      <div className="flex items-center justify-center h-40 mt-8">
        <Image src="/images/logomamamind.png" alt="Logo" width={170} height={170} />
      </div>
      <nav className="flex-1 px-2 py-8 space-y-16 mt-10">
        <SidebarItem Icon={FaChartBar} label="Dashboard" path="/dashboard" />
        <SidebarItem Icon={BsPeopleFill} label="Mothers' Details" path="/mothers-details" />
        <SidebarItem Icon={RiTeamFill} label="CHPs' Details" path="/chps" />
        <SidebarItem Icon={FaUserNurse} label="Nurses" path="/NurseList" />
        <SidebarItem Icon={PiHospitalFill} label="Nurse Admin" path="/nurse-admin" />
        <SidebarItem Icon={PiHospitalFill} label="Hospitals" path="/hospitals" />
      </nav>
    </div>
  );
};
export default Sidebar;