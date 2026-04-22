import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";

export const metadata = {
  title: { template: `Book Inn | %s`, default: "Book Inn | Welcome" },
  description:
    "Luxurious Hotel, surranded by beautiful mountains and dask forest",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-primary-950 text-primary-100">
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}

export default RootLayout;
