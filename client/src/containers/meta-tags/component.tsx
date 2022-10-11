import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

export interface MetaTagsProps {
  title: string;
  description: string;
  type: string;
  imageURL?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  type = 'website',
  imageURL,
}: MetaTagsProps) => {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{title}</title>

      <meta name="viewport" content="width=device-width" />
      <meta name="description" content={description} />

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content={type} />
      <meta
        name="og:url"
        content={`${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_URL}${asPath}`}
      />
      <meta
        name="og:image"
        content={`${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_URL}/${imageURL}`}
      />
    </Head>
  );
};

export default MetaTags;
