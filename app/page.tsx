import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";
import React from "react";

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16 ">
          <div className="flex flex-col justify-center">
            <div className="block md:hidden bg-orange-500/30 w-fit px-3 py-2 rounded-full mx-auto mb-8">
              Only for{" "}
              <span className="text-lg font-semibold italic animate-pulse duration-1000">
                amazon.in/.com{" "}
              </span>{" "}
              products
            </div>

            <p className="small-text group w-fit">
              Smart Shopping Start Here 😊
              <Image
                className="group-hover:ml-1.5 transition-all duration-300"
                src={"/assets/icons/arrow-right.svg"}
                width={16}
                height={16}
                alt="arraow-right"
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of <span className="text-primary">NuPrice</span>
            </h1>
            <p className="mt-6 text-base text-gray-600 tracking-normal">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending Products</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
