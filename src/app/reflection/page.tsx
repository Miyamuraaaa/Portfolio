import { portfolioConfig } from "@/config/portfolio";
import Link from "next/link";

export default function ReflectionPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">Final Reflection</h1>
        <p className="text-neutral-500 dark:text-neutral-400">Looking back at my growth and progress in {portfolioConfig.subject}.</p>
      </div>

      <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-10 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Overall Experience</h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            My journey through {portfolioConfig.subject} has been a transformative experience.
            Before this course, my approach to reading was often passive — focusing simply on getting through the text.
            Now, I have learned to engage actively with what I read, questioning the author&apos;s intent, analyzing the structure,
            and connecting the material to my own experiences and the wider world.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
            <li><strong className="text-neutral-800 dark:text-neutral-200">Critical Thinking:</strong> I developed the ability to critically evaluate texts rather than accepting them at face value.</li>
            <li><strong className="text-neutral-800 dark:text-neutral-200">Active Reading Strategies:</strong> Annotating, summarizing, and asking questions dramatically improved my comprehension and retention.</li>
            <li><strong className="text-neutral-800 dark:text-neutral-200">Collaborative Learning:</strong> Through the iCARE activities, I learned how valuable it is to discuss interpretations with peers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Areas for Improvement</h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            While I have made significant progress, I still want to improve my reading speed without sacrificing comprehension.
            I also intend to diversify the genres of texts I read in my free time to continue challenging my critical thinking skills.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Conclusion</h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            This portfolio represents not just assignments completed, but a genuine shift in how I interact with information.
            The skills I have honed in this class will undoubtedly serve me well throughout my academic career and beyond.
          </p>
        </section>

        <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-sm text-neutral-400">
          <span className="font-medium">{portfolioConfig.name}</span>
          <span>{portfolioConfig.subject} &middot; {portfolioConfig.academicYear}</span>
        </div>
      </article>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
