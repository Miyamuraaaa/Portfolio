/**
 * Owner details shown in the About section and footer.
 * Edit this file to change the text, links or photo — no component changes needed.
 */
export const profile = {
  name: "Cliford V. Balce",
  nickname: "Clif",
  program: "BSCE",
  block: "TV05",
  course: "GED0001",
  photo: {
    src: "/images/about/clif-balce.jpg",
    alt: "Portrait of Cliford V. Balce in a black suit and tie",
    width: 960,
    height: 960,
  },
  instagram: {
    url: "https://www.instagram.com/b_clxf/",
    handle: "@b_clxf",
  },
  email: "clifordbalce5@gmail.com",
  independentWork: {
    label: "EngineerX",
    url: "https://engineerx.clif0.workers.dev/",
  },
  // The owner's own words. Wrap a phrase in **double asterisks** to show it emphasised.
  bio: [
    "Hello! I'm Cliford V. Balce, a Bachelor of Science in Civil Engineering (BSCE) student.",
    "If I had to describe myself in three words, I'd say **persistent, curious, and always willing to learn.** I enjoy exploring new ideas, figuring out how things work, and finding solutions when challenges come my way. I might learn something quickly but forget it just as fast sometimes (my memory has its own plans, TT ). Still, I believe that there's always something new to learn, and I try my best to keep improving.",
    "I designed and coded this portfolio myself, and it definitely tested my patience! After plenty of trial and error, I learned that creating something meaningful takes time, effort, and a little stubbornness.",
    "More than just a collection of academic work, this portfolio reflects my growth, experiences, and the person I'm becoming.",
    "Thanks for stopping by! I hope you enjoy exploring my journey **beyond the pages.**",
  ],
} as const;
