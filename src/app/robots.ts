import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/*', '/employe/*'],
    },
    sitemap: 'https://gericotransport.fr/sitemap.xml',
  };
}
