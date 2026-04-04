import { getCollection } from 'astro:content'

export async function get() {
	const posts = await getCollection('blog') // your blog collection

	const postUrls = posts
		.map(
			(post) => `
    <url>
      <loc>https://uthman-blog.onrender.com/blog/${post.slug}/</loc>
      <lastmod>${post.data.pubDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `
		)
		.join('')

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://uthman-blog.onrender.com/</loc>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://uthman-blog.onrender.com/blog/</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    ${postUrls}
  </urlset>`

	return new Response(sitemap, {
		headers: { 'Content-Type': 'application/xml' },
	})
}
