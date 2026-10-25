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
    "This portfolio is one example of that mindset. I designed and coded this website myself, and honestly, it was quite a challenge! It took a lot of time, patience, and trial and error to bring my ideas to life. But through the process, I learned more than just how to build a website\u2014I also learned the value of persistence and figuring things out along the way.",
    "For me, this portfolio is more than a collection of academic work. It's a reflection of my learning journey, the effort I've put into my work, and the person I'm continuing to become.",
    "Thank you for visiting my portfolio! I hope you enjoy exploring my work and following my journey **beyond the pages.**",
  ],
} as const;
