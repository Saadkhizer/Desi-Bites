import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-7xl font-extrabold text-deep">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Yeh page handi mein nahi mila.</h1>
      <Link href="/" className="btn btn-deep mt-8">Back to the menu</Link>
    </section>
  );
}
