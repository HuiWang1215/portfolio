export interface IPost {
  title: string;
  slug: string;
  description: string;
}

export interface IPostsByCategory {
  [key: string]: IPost[];
}

export const postsByCategory: IPostsByCategory = {
  react: [
    {
      title: "React Deep Dive",
      slug: "react-deep-dive-chapter-1",
      description: "How Fiber Powers Reconciliation & Rendering.",
    },
  ],
  algorithm: [
    {
      title: "Understanding Heap Data Structure",
      slug: "heap",
      description:
        "A deep dive into heap data structure, its implementation, and real-world applications.",
    },
  ],
};

export interface Series {
  series: string;
  posts: {
    slug: string;
    title: string;
  }[];
}

export const series: Series[] = [
  {
    series: "React Deep Dive",
    posts: [
      {
        slug: "react-deep-dive-chapter-1",
        title: "Chapter 1: The Problems with Pre-React 16",
      },
      {
        slug: "react-deep-dive-chapter-2",
        title: "Chapter 2: Introduction to React Fiber",
      },
      {
        slug: "react-deep-dive-chapter-3",
        title: "Chapter 3: Fiber's Reconciliation Process",
      },
      {
        slug: "react-deep-dive-chapter-4",
        title: "Chapter 4: Priority Management in Fiber",
      },
      {
        slug: "react-deep-dive-chapter-5",
        title: "Chapter 5: The Commit Phase and Effects",
      },
      {
        slug: "react-deep-dive-chapter-6",
        title: "Chapter 6: Error Boundaries and Recovery",
      },
    ],
  },
  {
    series: "Data Structures & Algorithms",
    posts: [
      {
        slug: "heap",
        title: "Understanding Heap Data Structure",
      },
    ],
  },
];
