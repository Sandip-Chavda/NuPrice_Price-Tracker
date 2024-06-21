// import Product from "@/lib/models/product.model";
// import { connectToDB } from "@/lib/mongoose";
// import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
// import { scrapeAmazonProduct } from "@/lib/scrapper";
// import {
//   getAveragePrice,
//   getEmailNotifType,
//   getHighestPrice,
//   getLowestPrice,
// } from "@/lib/utils";
// import { NextResponse } from "next/server";

// export const maxDuration = 55; // this is seconds
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// const BATCH_SIZE = 10; // Define the batch size

// export async function GET() {
//   try {
//     connectToDB();

//     const products = await Product.find({});

//     if (!products) throw new Error("Not Found Any Products.");

//     // ---1---    Scrape latest product and update db

//     const updatedProducts = await Promise.all(
//       products.map(async (currentProduct) => {
//         const scrappedProduct = await scrapeAmazonProduct(currentProduct.url);

//         if (!scrappedProduct)
//           throw new Error("Not Found Any Scraped Products.");

//         const updatedPriceHistory = [
//           ...currentProduct.priceHistory,
//           { price: scrappedProduct.currentPrice },
//         ];

//         const product = {
//           ...scrappedProduct,
//           priceHistory: updatedPriceHistory,
//           lowestPrice: getLowestPrice(updatedPriceHistory),
//           highestPrice: getHighestPrice(updatedPriceHistory),
//           averagePrice: getAveragePrice(updatedPriceHistory),
//         };

//         const updatedProduct = await Product.findOneAndUpdate(
//           {
//             url: product.url,
//           },
//           product
//         );

//         // ---2---   Check each Product status and send email if status changed..

//         const emailNotifType = getEmailNotifType(
//           scrappedProduct,
//           currentProduct
//         );

//         if (emailNotifType && updatedProduct.users.length > 0) {
//           const productInfo = {
//             title: updatedProduct.title,
//             url: updatedProduct.url,
//           };

//           const emailContent = await generateEmailBody(
//             productInfo,
//             emailNotifType
//           );

//           const userEmails = updatedProduct.users.map(
//             (user: any) => user.email
//           );

//           await sendEmail(emailContent, userEmails);
//         }

//         return updatedProduct;
//       })
//     );

//     return NextResponse.json({
//       message: "Ok",
//       data: updatedProducts,
//     });
//   } catch (error: any) {
//     throw new Error("Error in CRON GET : ", error);
//   }
// }

import { NextResponse } from "next/server";

import {
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
  getEmailNotifType,
} from "@/lib/utils";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/lib/models/product.model";
import { scrapeAmazonProduct } from "@/lib/scrapper";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

export const maxDuration = 55; // This function can run for a maximum of 300 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products) throw new Error("No product fetched");

    // ======================== 1 SCRAPE LATEST PRODUCT DETAILS & UPDATE DB
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        // Scrape product
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) return;

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          {
            price: scrapedProduct.currentPrice,
          },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        // Update Products in DB
        const updatedProduct = await Product.findOneAndUpdate(
          {
            url: product.url,
          },
          product
        );

        // ======================== 2 CHECK EACH PRODUCT'S STATUS & SEND EMAIL ACCORDINGLY
        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );

        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };
          // Construct emailContent
          const emailContent = await generateEmailBody(
            productInfo,
            emailNotifType
          );
          // Get array of user emails
          const userEmails = updatedProduct.users.map(
            (user: any) => user.email
          );
          // Send email notification
          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProducts,
    });
  } catch (error: any) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
}
