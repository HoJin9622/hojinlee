import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const FOLDER = path.join(process.cwd(), 'src/posts')

const getAllFileNames = () => {
  const names = fs.readdirSync(FOLDER)
  return names
}

const getFileMatterResult = (fileName: string) => {
  const content = fs.readFileSync(`${FOLDER}/${fileName}`)
  const matterResult = matter(content)
  return matterResult
}

export const getPosts = (category?: string) => {
  const names = getAllFileNames()
  const posts = names.map((name) => {
    const {
      data: { title, subtitle, date, category, coverImage, draft },
      content,
    } = getFileMatterResult(name)
    return {
      title,
      subtitle,
      date,
      category,
      coverImage,
      draft,
      slug: name.replace('.mdx', ''),
      content,
    }
  })
  if (category) {
    return posts.filter((post) => post.category === category)
  }
  return posts
}

export const getCategories = () => {
  const posts = getPosts()
  const categories = posts.map((post) => post.category)
  return [...new Set(categories)]
}

export const getPost = (slug: string) => {
  const posts = getPosts()
  return posts.find((post) => post.slug === slug)
}
