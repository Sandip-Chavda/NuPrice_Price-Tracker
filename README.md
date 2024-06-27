# NuPrice - Price Tracker [🔗💰](https://nuprice-pricetracker.vercel.app/)

- NuPrice - Price Tracker is a powerful tool designed to help users track prices from the Amazon website. It provides detailed information on prices, stock availability, max & lowest price, average price and product photos. Users can set up notifications to receive alerts via email whenever there is a price change,,stock availability, ensuring they never miss out on a deal. This project leverages modern web technologies, including React.js, Next.js, TypeScript, and Tailwind CSS, CRON jobs and MongoDB to deliver a seamless and efficient user experience.

## Key Features

- **Price Tracking:** Automatically scrape and track prices of products from Amazon, providing up-to-date information on price changes.

- **Notifications:** Users can set up email notifications to receive alerts whenever there is a price change, ensuring they don't miss any deals.

- **Stock Monitoring:** Check and display the availability of products, helping users stay informed about stock status.

- **Product Details:** View comprehensive details including prices, stock levels, current, highest, lowest & average prices and product photos.

- **Responsive Design:** Optimized for all devices, ensuring a seamless experience across desktops, tablets, and smartphones.

## Demo

- ## Video

## Tech-Stack & Tools

- **Brightdata for avoid IP blocking or device IP block**

- **Front-End & Back-End:** Next.js, React.js, Tailwind CSS, TypeScript

- **DataBase:** MongoDB, Mongoose

- **Libraries:** cheerio, nodemailer, axios

- **Tools:** VS Code, Postman, cron jobs, MongoDB Compass

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

- **`NODE_ENV = development`** `in development mode`

- **`BRIGHT_DATA_USERNAME = `**

- **`BIRGHT_DATA_PASSWORD = `**

- **`MONGODB_URI = `**

- **`EMAIL_USER = `**

- **`EMAIL_PASSWORD = `**

## Run Locally

- **Clone the project**

```bash
  git clone https://github.com/Sandip-Chavda/NuPrice_Price-Tracker.git
```

- **Install dependencies**

```bash
  npm install
```

- **Start the server** **`Both started with one command`**

```bash
  npm run dev
```

- Access the Application: Open your web browser and visit **`http://localhost:3000`** to access the NuPrice - Price Tracker.

## Deploy on Vercel

- The easiest way to deploy your Next.js app is to use the **[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)** from the creators of Next.js.

- Check out our **[Next.js deployment documentation](https://nextjs.org/docs/deployment)** for more details.

## Lern More

- _Refer this documnetation for the good understanding of the technologies used in the project._

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

- **[Brightdata](https://docs.brightdata.com/scraping-automation/web-unlocker/introduction?_gl=1*1iq6b2m*_gcl_au*NDczMzU5ODA4LjE3MTk1MDc4ODg.*_ga*MTM2Mjk1MTAxLjE3MTk1MDc4ODk.*_ga_KQX3XWKR2T*MTcxOTUwNzg4OC4xLjAuMTcxOTUwNzg4OC42MC4wLjA.)** We are using web unblocker in this app so visit this site and learn more about it and other features also.

-**[cron job](https://cron-job.org/en/)** set up cron job and learn more about cron job from here.

- **[MongoDB DataBase](https://www.mongodb.com/docs/manual/tutorial/getting-started/)** visit for the better understanding of the React.js.

- **[Mongoose](https://mongoosejs.com/docs/)** visit for the better understanding of Schema generation..

- **[Tailwind CSS](https://tailwindcss.com/docs/installation)** visit for the better understanding of the styling and customize your website with this.

## License

[MIT](https://choosealicense.com/licenses/mit/)
