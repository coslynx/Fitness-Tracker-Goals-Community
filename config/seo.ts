import { NextSeo } from 'next-seo';

const SEO = {
  title: 'Fitness Tracker MVP',
  description:
    'Track your fitness goals, monitor progress, and connect with a supportive community.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.your-fitness-tracker.com',
    title: 'Fitness Tracker MVP',
    description:
      'Track your fitness goals, monitor progress, and connect with a supportive community.',
    site_name: 'Fitness Tracker MVP',
    images: [
      {
        url: 'https://www.your-fitness-tracker.com/images/og-image.jpg',
        alt: 'Fitness Tracker MVP',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    handle: '@your_twitter_handle',
    site: '@your_twitter_handle',
    cardType: 'summary_large_image',
  },
};

export default function Seo({
  title,
  description,
  image,
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  const seo = {
    ...SEO,
    title: title ? `${title} | Fitness Tracker MVP` : SEO.title,
    description: description || SEO.description,
    openGraph: {
      ...SEO.openGraph,
      title: title ? `${title} | Fitness Tracker MVP` : SEO.openGraph.title,
      description: description || SEO.openGraph.description,
      images: [
        ...(image
          ? [
              {
                url: image,
                alt: 'Fitness Tracker MVP',
                width: 1200,
                height: 630,
              },
            ]
          : SEO.openGraph.images),
      ],
    },
  };

  return <NextSeo {...seo} />;
}