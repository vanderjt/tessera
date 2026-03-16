import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="page-wrap">
      <div className="page-inner">
        <p className="page-kicker">Welcome</p>
        <h1 className="page-title">Tessera</h1>
        <p className="page-body">A private sanctuary for shared memories, held gently with the people you trust.</p>

        <div className="soft-panel">
          <p className="m-0 text-sm">Begin quietly. Enter your sanctuary or create one with your circle.</p>
          <div className="mt-4 flex gap-4 text-sm">
            <Link className="font-medium text-stone-900" href="/login">
              Log in
            </Link>
            <Link className="text-stone-600" href="/signup">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
