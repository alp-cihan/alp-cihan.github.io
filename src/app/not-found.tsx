import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell flex min-h-[100svh] flex-col justify-between py-10">
      <p className="label">alpcihan.me — 404</p>
      <div>
        <p className="label mb-6">
          <span className="text-signal">●</span> No detections in this region
        </p>
        <h1 className="display text-[clamp(4rem,18vw,14rem)]">Not found.</h1>
      </div>
      <Link href="/" className="link-wipe self-start py-1 text-paper">
        ← Back to the index
      </Link>
    </main>
  );
}
