import Link from "next/link";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { GoGlobe } from "react-icons/go";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="footer flex flex-col md:flex-row md:flex  items-center justify-between">
        <div className="flex  gap-6">
          <Link
            className="border border-blue-500 text-blue-600 p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
            target="_blank"
            href={"https://www.linkedin.com/in/sandip-chavda-86704a2aa/"}
          >
            <FaLinkedinIn size={18} />
          </Link>
          <Link
            className="border border-black p-3 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            target="_blank"
            href={"https://x.com/SandipC70731202"}
          >
            <FaXTwitter size={18} />
          </Link>
          <Link
            className="border border-[#FF7917] text-[#FF7917] p-3 rounded-full hover:bg-[#FF7917] hover:text-white transition-all duration-300"
            target="_blank"
            href={
              "https://sandip-portfolio-git-main-sandip-chavdas-projects-2b94e4eb.vercel.app/"
            }
          >
            <GoGlobe size={18} />
          </Link>
          <Link
            className="border border-black text-black p-3 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            target="_blank"
            href={"https://github.com/Sandip-Chavda"}
          >
            <FaGithub size={18} />
          </Link>
        </div>

        <div className="select-none text-[6.5rem] md:text-[13rem] font-bold">
          Nu
          <span className="text-[#ff7917]">Price</span>
        </div>
      </div>

      <div className="footer text-center -mt-8 md:-mt-14 mb-5">
        <p className="text-lg">
          Developed by{" "}
          <span className="font-semibold underline">Sandip Chavda</span> from
          India🧡
        </p>
      </div>
    </footer>
  );
};

export default Footer;
