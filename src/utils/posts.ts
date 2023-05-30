import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

const FOLDER = path.join(process.cwd(), 'src/posts');

function getAllPostPaths() {
  const postPaths = sync(`${FOLDER}/**/*.mdx`);
  return postPaths;
}

function getFileMatterResult(postPath: string) {
  const fileContents = fs.readFileSync(postPath);
  const matterResult = matter(fileContents);
  return matterResult;
}

function sortByDate(posts: Post[]) {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * 게시물 목록을 불러옵니다.
 * @returns
 */
export function getPosts() {
  const postPaths = getAllPostPaths();
  const posts = postPaths
    .map((postPath) => {
      const {
        data: { title, date, subtitle, category, coverImage, draft },
        content,
      } = getFileMatterResult(postPath);
      return {
        title,
        date,
        subtitle,
        category,
        slug: postPath
          .substring(postPath.lastIndexOf('/') + 1)
          .replace('.mdx', ''),
        coverImage,
        draft,
        content,
      };
    })
    .filter((post) => !post.draft);

  return sortByDate(posts);
}

/**
 * 카테고리에 맞는 게시글 목록을 불러옵니다.
 * @param category
 * @returns
 */
export function getPostFilteredByCategory(category: string) {
  const posts = getPosts();
  return posts.filter((post) => post.category === category);
}

/**
 * 카테고리 목록을 불러옵니다.
 * @returns
 */
export function getCategories(): { [key: string]: number } {
  const files = fs.readdirSync(FOLDER);
  const directoris = files.filter((file) => {
    const filePath = `${FOLDER}/${file}`;
    return fs.statSync(filePath).isDirectory();
  });
  const categories: { [key: string]: number } = {};
  directoris.forEach((directory) => {
    const categoryFiles = fs.readdirSync(`${FOLDER}/${directory}`);
    categories[directory] = categoryFiles.length;
  });
  return Object.entries(categories)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
}

/**
 * 게시물 내용을 가져옵니다.
 * @param slug
 * @returns
 */
export function getPost(slug: string) {
  const posts = getPosts();
  return posts.find((post) => post.slug === slug);
}
