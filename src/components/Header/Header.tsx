import Image from "next/image";
import {UserIcon} from "@heroicons/react/24/solid";
import {BellIcon, ChevronDownIcon} from "@heroicons/react/24/outline";


export const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="px-8">
        <div className="h-16 flex justify-center items-center">
          <div className="flex items-center justify-start relative w-full h-full">
            <Image src="logo.svg" alt="logo" width={64} height={0}/>
          </div>
          <div className="flex items-center justify-end w-full h-full">
            <div className="flex items-center space-x-2">
              <button className="flex justify-center items-center">
                <BellIcon className="text-gray-500 w-5 h-5"/>
              </button>

              <hr className="border-t text-gray-500"/>

              <button className="flex justify-center items-center space-x-2">
                <UserIcon className="bg-gray-500 rounded-full p-1 text-white w-7 h-7"/>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-600">山田 太郎</span>
                  <ChevronDownIcon className="translate-y-0.5 w-3 h-3 text-gray-500" strokeWidth={3} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}