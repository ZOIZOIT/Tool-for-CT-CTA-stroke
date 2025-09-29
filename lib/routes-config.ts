// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  { title: 'Introduction', href: '/introduction' },
  {
    title: 'Stroke',
    href: '/chapter-1',
    noLink: true,
    items: [
      {
        title: 'Definition and Types',
        href: '/definition-and-types',
      },
      {
        title: 'Etiology and Risk Factors',
        href: '/etiology-and-risk-factors',
      },
    ],
  },
  {
    title: 'Physical Principles of Operation of CT and CTA',
    href: '/chapter-2',
    noLink: true,
    items: [
      {
        title: 'Definition and History',
        href: '/definition-and-history',
      },
      {
        title: 'Physical Principles of Operation',
        href: '/principles-of-ct-cta',
      },
      {
        title: 'The Image System',
        href: '/the-image-system',
      },
      {
        title: 'Image Reconstruction, Processing and Acquisition',
        href: '/image-reconstruction-processing-and-acquisition',
      },
      {
        title: 'Image Quality',
        href: '/image-quality',
      },
      {
        title: 'Contrast Agents',
        href: '/contrast-agents',
      },
      {
        title: 'Radiation Protection',
        href: '/radiation-protection',
      },
    ],
  },
  {
    title: 'Hemorrhage',
    href: '/chapter-3',
    noLink: true,
    items: [
      {
        title: 'Introduction',
        href: '/introduction',
      },
      {
        title: 'Intracerebral Hemorrhage',
        href: '/intracerebral-hemorrhage',
      },
      {
        title: 'Subarachnoid Hemorrhage',
        href: '/subarachnoid-hemorrhage',
      },
      {
        title: 'Subdural or Epidural Hemorrhage',
        href: '/subdural-or-epidural-hemorrhage',
      },
    ],
  },
  {
    title: 'Ischemia',
    href: '/chapter-4',
    noLink: true,
    items: [
      {
        title: 'Introduction',
        href: '/introduction',
      },
      {
        title: 'Cerebral Arteries Distribution',
        href: '/cerebral-arteries-distribution',
      },
      {
        title: 'Imaging of Acute Ischemic Stroke (AIS)',
        href: '/imaging-of-acute-ischemic-stroke',
      },
    ],
  },
  {
    title: 'The development of the educational application',
    href: '/chapter-6',
    noLink: true,
    items: [
      {
        title: 'Methods and technologies used',
        href: '/methods-and-technologies-used',
      },
      {
        title: 'Theoretical Content and Self Assessment Quiz',
        href: '/theoretical-content-and-self-assessment-quiz',
      },
      { title: 'Vercel Application & Github Code', href: '/vercel' },
      { title: 'Limitations and future work', href: '/limitations' },
    ],
  },
  {
    title: 'Acronyms',
    href: '/acronyms',
  },
  {
    title: 'References',
    href: '/references',
  },
  // { title: 'Quick Start Guide', href: '/quick-start-guide' },
  // {
  //   title: 'Project Structure',
  //   href: '/project-structure',
  // },
  // {
  //   title: 'Components',
  //   href: '/components',
  //   items: [
  //     { title: 'Stepper', href: '/stepper' },
  //     { title: 'Tabs', href: '/tabs' },
  //     { title: 'Note', href: '/note' },
  //     { title: 'Code Block', href: '/code-block' },
  //     { title: 'Image & Link', href: '/image-link' },
  //     { title: 'Custom', href: '/custom' },
  //   ],
  // },
  // { title: 'Themes', href: '/themes' },
  // {
  //   title: 'Customize',
  //   href: '/customize',
  // },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
