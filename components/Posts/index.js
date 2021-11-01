import { useState } from 'react'
import { Post } from '..'

const mockPosts = [
  {
    id: '123',
    username: 'john.dee',
    avatar: 'https://avatars.githubusercontent.com/u/46598333?v=4',
    img: 'https://avatars.githubusercontent.com/u/46598333?v=4',
    caption: 'This is DOPE!',
  },
  {
    id: '123',
    username: 'john.dee',
    avatar: 'https://avatars.githubusercontent.com/u/46598333?v=4',
    img: 'https://avatars.githubusercontent.com/u/46598333?v=4',
    caption: 'This is DOPE!',
  },
]

export default function Posts() {
  const [posts] = useState(mockPosts)

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
