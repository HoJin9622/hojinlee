import { PostMetadata } from '@/components/PostMetadata'
import fs from 'fs'
import matter from 'gray-matter'

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

export function getCategories() {
  const markdownPosts = getMarkdownPosts()
  const categories = markdownPosts.map((fileName) => {
    const matterResult = getFileMatterResult(fileName)
    return matterResult.data.category
  })
  return Array.from(new Set(categories))
}

export function getPostMetadata(category: string) {
  const markdownPosts = getMarkdownPosts()
  const posts = markdownPosts
    .map((fileName) => {
      const matterResult = getFileMatterResult(fileName)
      return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        subtitle: matterResult.data.subtitle,
        category: matterResult.data.category,
        slug: fileName.replace('.md', ''),
      }
    })
    .filter((post) => post.category === category)
  return posts
}
