import Image from "next/image";
import Link from "next/link";
import React from "react";

const navIcons = [
  {
    src: "/assets/icons/search.svg",
    alt: "Search",
    // title: "Search",
  },
  {
    src: "/assets/icons/black-heart.svg",
    alt: "Heart",
    // title: "Like",
  },
  {
    src: "/assets/icons/user.svg",
    alt: "User",
    // title: "Account",
  },
];

const Navbar = () => {
  return (
    <header className="w-full ">
      <nav className="nav">
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            alt="Logo"
            src={"/assets/icons/logo1.svg"}
            width={27}
            height={27}
          />
          <p className="nav-logo">
            Nu<span className="text-primary">Price</span>
          </p>
        </Link>

        <div className="hidden md:flex mt-2 items-center justify-center gap-1 bg-orange-500/30 px-5 py-2 rounded-full font-normal">
          ⚠️Currently available only for{" "}
          <span className="text-lg font-semibold italic animate-pulse duration-1000">
            amazon.in/.com
          </span>{" "}
          products⚠️
        </div>

        <div className="flex items-center gap-5">
          {navIcons.map((navIcon) => {
            return (
              <Image
                key={navIcon.alt}
                src={navIcon.src}
                alt={navIcon.alt}
                width={25}
                height={25}
                className="object-contain"
              />
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
