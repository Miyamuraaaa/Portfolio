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
  // Written only from facts supplied by the owner. Edit freely.
  bio: [
    "I'm Clif, a BSCE student from block TV05. I like building practical digital tools that help students solve problems.",
    "One of them is EngineerX, a website of engineering calculators I made on my own. This portfolio is where I keep my GED0001 reading work together: the worksheets, the responses, the iCARE activities and my reflections.",
  ],
} as const;
