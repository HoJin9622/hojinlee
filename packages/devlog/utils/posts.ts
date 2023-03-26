import fs from 'fs'
import matter from 'gray-matter'

type PostMetadata = {
  title: string
  date: string
  subtitle: string
  category: string
  slug: string
  coverImage?: string
}

const folder = 'posts/'

function getMarkdownPosts() {
  const files = fs.readdirSync(folder)
  const markdownPosts = files.filter((file) => file.endsWith('.md'))
  return markdownPosts
}

function getFileMatterResult(fileName: string) {
  const fileContents = fs.readFileSync(`${folder}${fileName}`)
  const matterResult = matter(fileContents)
  return matterResult
}

function sortByDate(posts: PostMetadata[]) {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostMetadata() {
  const markdownPosts = getMarkdownPosts()
  const posts = markdownPosts.map((fileName) => {
    const matterResult = getFileMatterResult(fileName)
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      category: matterResult.data.category,
      slug: fileName.replace('.md', ''),
      coverImage: matterResult.data.coverImage,
    }
  })

  return sortByDate(posts)
}

export function getPostContent(slug: string) {
  const folder = 'posts/'
  const file = `${folder}${slug}.md`
  const content = fs.readFileSync(file, 'utf8')
  const matterResult = matter(content)
  return matterResult
}
