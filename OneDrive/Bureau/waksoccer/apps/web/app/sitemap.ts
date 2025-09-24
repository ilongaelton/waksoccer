import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://waksoccer.com',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: 'https://waksoccer.com/premier-league',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: 'https://waksoccer.com/la-liga',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: 'https://waksoccer.com/serie-a',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: 'https://waksoccer.com/bundesliga',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: 'https://waksoccer.com/ligue-1',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: 'https://waksoccer.com/live-scores',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.95,
    },
    {
      url: 'https://waksoccer.com/predictions',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://waksoccer.com/fan-chat',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.7,
    }
  ]
}