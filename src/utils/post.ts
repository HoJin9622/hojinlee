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

export const getPosts = () => {
  const names = getAllFileNames()
  const posts = names.map((name) => {
    const {
      data: { title, subtitle, date, category, coverImage, draft },
    } = getFileMatterResult(name)
    return {
      title,
      subtitle,
      date,
      category,
      coverImage,
      draft,
      slug: name.replace('.mdx', ''),
    }
  })
  return posts
}

export const getCategories = () => {
  const posts = getPosts()
  const categories = posts.map((post) => post.category)
  return [...new Set(categories)]
}
