import Link from "next/link";

export const metadata = { title: "About" };

function Page() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}

export default Page;
