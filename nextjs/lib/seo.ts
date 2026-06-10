import type { Metadata } from "next";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  path: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aihub.example.com";

export function buildMetadata({ title, description, keywords, ogImage, path }: SeoProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: "AI Learning Hub",
      type: "article",
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}
