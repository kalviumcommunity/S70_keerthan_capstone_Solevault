import React from "react";

const Header = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="px-6 mx-auto max-w-[1272px] max-sm:px-4">
        <div className="flex justify-between items-center border border-slate-200 h-[121px]">
          <div className="flex gap-12 items-center max-md:gap-6">
            <div className="text-4xl font-bold">SoleVault</div>
            <div className="flex gap-12 items-center max-md:hidden">
              <div className="relative">
                <div className="text-3xl text-indigo-700">Market</div>
                <div className="absolute left-0 -bottom-7 h-0.5 bg-indigo-700 w-[105px]" />
              </div>
              <div className="text-3xl text-slate-500">Collection</div>
              <div className="text-3xl text-slate-500">Wishlist</div>
              <div className="text-3xl text-slate-500">Dashboard</div>
            </div>
          </div>
          <div className="flex gap-4 items-center max-md:hidden">
            <div className="px-8 py-5 text-2xl text-indigo-700 border-2 border-indigo-700 shadow-sm bg-slate-50 rounded-[50px]">
              Login
            </div>
            <div className="px-8 py-5 text-2xl text-white bg-indigo-700 shadow-sm rounded-[50px]">
              Signup
            </div>
          </div>
          <div className="md:hidden">
            <i className="ti ti-menu-2 text-3xl text-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
