import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractDescription,
  // extractNumberOfReviews,
  extractPrice,
  extractRetings,
} from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  //   ----------- BrightData Proxy Configuration ----------------  //

  //   curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_99ddeb8a-zone-nuprice:vp8axqp8i2v8 -k "http://geo.brdtest.com/mygeo.json"

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BIRGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  try {
    // -----------FETCH THE PRODUCT PAGE------------ //
    const response = await axios.get(url, options);

    const $ = cheerio.load(response.data);

    // -----------EXTRACT THE ALL NECESSARY PRODUCT DETAILS------------- //
    const title = $(`#productTitle`).text().trim();

    const currency = extractCurrency($(".a-price-symbol"));

    const description = extractDescription($);

    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $(`#availability span`).text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $(`#imgBlkFront`).attr(`data-a-dynamic-image`) ||
      $(`#landingImage`).attr(`data-a-dynamic-image`) ||
      "{}";
    const imageUrls = Object.keys(JSON.parse(images));

    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    const rattingText = extractRetings($(".a-size-base .a-color-base"));

    // GPT CODE
    const text = $("span#acrCustomerReviewText").text().trim();

    const numericPart = text.split(" ")[0];

    const formattedNumberOfReviews = numberWithCommas(numericPart);
    // GPT CODE

    // -------CREATE DATA OBJECT WITH SCRAPPED DATA----------- //
    const data = {
      url,
      currency: currency || "₹",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: "category",
      stars: rattingText,
      reviewsCount: formattedNumberOfReviews,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    return data;

    // console.log(data);
  } catch (error: any) {
    throw new Error(`Failed to Scrape Product ${error.message}`);
  }
}
