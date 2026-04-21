import Navigation from "./components/Navigation";

export const metadata = { title: "Book Inn" };

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}

export default RootLayout;
