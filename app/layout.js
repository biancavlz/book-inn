import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: { template: `Book Inn | %s`, default: "Book Inn | Welcome" },
  description:
    "Luxurious Hotel, surranded by beautiful mountains and dask forest",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} min-h-screen bg-primary-950 text-primary-100`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
