import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-24">
      <div className="wrap">
        <span className="kicker">404</span>
        <h1 className="h-display mt-5">Wrong turn<span className="text-accent">.</span></h1>
        <p className="lead mt-5 max-w-md">This page doesn&apos;t exist. Let&apos;s get you back on the road.</p>
        <div className="mt-8 flex gap-3"><Link href="/" className="btn-ghost">Home</Link><Link href="/services" className="btn-ghost">Services</Link></div>
      </div>
    </section>
  );
}
