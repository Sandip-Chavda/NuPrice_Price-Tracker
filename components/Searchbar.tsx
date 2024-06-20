"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { LiaSearchDollarSolid } from "react-icons/lia";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // check is website is amazon with counrty code or some other website
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.in") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) toast.error("Please Provide Valid Amazon Link.");

    try {
      setIsLoading(true);

      // SCRAPPING THE PRODUCT PAGE
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter Product Link"
        className="searchbar-input"
      />

      <button
        type="submit"
        disabled={searchPrompt === ""}
        className="searchbar-btn disabled:opacity-75 flex items-center gap-1"
      >
        {isLoading ? (
          <p className="animate-pulse">Searching...</p>
        ) : (
          <>
            Search <LiaSearchDollarSolid size={22} className="" />
          </>
        )}
      </button>
    </form>
  );
};

export default Searchbar;
