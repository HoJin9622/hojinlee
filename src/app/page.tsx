import CategoryList from './components/CategoryList'
import PostList from './components/PostList'
import Profile from './components/Profile'

export default function Home() {
  return (
    <main className='px-6'>
      <Profile />
      <CategoryList path='/' />
      <PostList />
    </main>
  )
}
