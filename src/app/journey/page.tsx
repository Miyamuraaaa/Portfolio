import fs from "fs";
import path from "path";
import Link from "next/link";

function getManifest() {
  try {
    const p = path.join(process.cwd(), "src", "generated", "content-manifest.json");
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch { /* empty */ }
  return {};
}

const typeColors: Record<string, string> = {
  "Reading Process": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Reader Response": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "iCARE Activity": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const typeLinks: Record<string, string> = {
  "Reading Process": "/reading-process",
  "Reader Response": "/reader-responses",
  "iCARE Activity": "/icare",
};

export default function JourneyPage() {
  const manifest = getManifest();

  const allActivities = [
    ...(manifest["reading-process"] || []).map((i: any) => ({ ...i, type: "Reading Process" })),
    ...(manifest["reader-responses"] || []).map((i: any) => ({ ...i, type: "Reader Response" })),
    ...(manifest["icare"] || []).map((i: any) => ({ ...i, type: "iCARE Activity" })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">My Reading Journey</h1>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
          A timeline of my progress and completed activities throughout GED0001.
        </p>
      </div>

      {allActivities.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <p>Activities will appear here as you add content to your portfolio.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 md:-translate-x-px" />

          {/* Start marker */}
          <div className="relative flex items-center mb-12">
            <div className="absolute left-5 md:left-1/2 w-3 h-3 rounded-full bg-blue-600 -translate-x-1.5 md:-translate-x-1.5 ring-4 ring-blue-100 dark:ring-blue-900/30" />
            <div className="ml-14 md:ml-0 md:text-center md:w-full">
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Beginning of Term
              </span>
            </div>
          </div>

          {/* Timeline entries */}
          {allActivities.map((activity, index) => (
            <div key={activity.id} className="relative mb-10 flex items-start">
              {/* Dot */}
              <div className="absolute left-5 md:left-1/2 w-2.5 h-2.5 rounded-full bg-white dark:bg-neutral-900 border-2 border-blue-600 -translate-x-1 md:-translate-x-1 mt-2 z-10" />

              {/* Card */}
              <div className={`ml-14 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"}`}>
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-xl hover:shadow-md transition-shadow">
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold mb-2 ${typeColors[activity.type] || ""}`}>
                    {activity.type}
                  </span>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">{activity.title}</h3>
                  <p className="text-xs text-neutral-400 mb-2">{activity.date}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {activity.description || "Completed activity."}
                  </p>
                  <Link
                    href={typeLinks[activity.type] || "#"}
                    className="inline-block mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    View section →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* End marker */}
          <div className="relative flex items-center mt-12">
            <div className="absolute left-5 md:left-1/2 w-3 h-3 rounded-full bg-blue-600 -translate-x-1.5 md:-translate-x-1.5 ring-4 ring-blue-100 dark:ring-blue-900/30" />
            <div className="ml-14 md:ml-0 md:text-center md:w-full">
              <Link
                href="/reflection"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-blue-700 transition-colors"
              >
                Final Reflection →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
