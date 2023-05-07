import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export type PostMetadata = {
  title: string;
  date: string;
  subtitle: string;
  category: string;
  slug: string;
  coverImage?: string;
};

const folder = path.join(process.cwd(), 'posts');

function getMarkdownPosts() {
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));
  return markdownPosts;
}

function getFileMatterResult(fileName: string) {
  const fileContents = fs.readFileSync(`${folder}/${fileName}`);
  const matterResult = matter(fileContents);
  return matterResult;
}

function sortByDate(posts: PostMetadata[]) {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostMetadata() {
  const markdownPosts = getMarkdownPosts();
  const posts = markdownPosts
    .map((fileName) => {
      const matterResult = getFileMatterResult(fileName);
      return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        subtitle: matterResult.data.subtitle,
        category: matterResult.data.category,
        slug: fileName.replace('.md', ''),
        coverImage: matterResult.data.coverImage,
        draft: matterResult.data.draft,
      };
    })
    .filter((post) => !post.draft);

  return sortByDate(posts);
}

export function getCategoryPostMetadata(category: string) {
  const posts = getPostMetadata();
  return posts.filter((post) => post.category === category);
}

export function getCategories(): { [key: string]: number } {
  const posts = getPostMetadata();
  const categories: { [key: string]: number } = {};
  posts.forEach((post) => {
    if (categories[post.category]) {
      categories[post.category] += 1;
    } else {
      categories[post.category] = 1;
    }
  });
  return Object.entries(categories)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
}

export function getPostContent(slug: string) {
  const file = `${folder}/${slug}.md`;
  const content = fs.readFileSync(file, 'utf8');
  const matterResult = matter(content);
  return {
    ...(matterResult.data as PostMetadata),
    content: matterResult.content,
  };
}
