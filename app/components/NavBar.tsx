import React from "react";

export default function NavBar() {
  return (
    <>
      <div className="border-b top-0 bg-white xl:static">
        <header className="border-b top-0 bg-white xl:static">
          <nav className="pt-1.5 flex items-center justify-between flex-wrap text-sm sm:flex-nowrap px-4 xl:px-8">
            <div className="">
              <a href="/deidine">deidine</a>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto sm:flex-1 lg:block">
              <ul className="flex items-center overflow-x-auto sm:ml-12">
             
                <li className="py-3 border-b-[1.5px] border-transparent">
                  <a
                    className="block py-1.5 px-3 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 duration-150"
                 
                  >
                    Form builder{" "}
                  </a>
                </li>
          
              </ul>
            </div>
            {/* <div className="order-2 flex-shrink-0 sm:order-3">
              <button
                type="button"
                id="radix-:r11:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
                className="outline-none"
              >
                <span className="flex shrink-0 overflow-hidden rounded-full w-10 h-10 relative">
                  <img
                    className="aspect-square h-full w-full"
                    alt="@sidiDev"
                    src="https://lh3.googleusercontent.com/a/ACg8ocIcWXswWwbrxF67jPgcqRLmu5TOF-d3oNQs9qfPqKj4t6TxrAM=s96-c"
                  />
                </span>
              </button>
            </div> */}
          </nav>
        </header>
      </div>
    </>
  );
}
