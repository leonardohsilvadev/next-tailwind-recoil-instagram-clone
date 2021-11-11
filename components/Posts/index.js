import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { Post } from '..'
import { db } from '../../firebase'

export default function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot =>
        setPosts(snapshot.docs)
      ),
    [db]
  )

  console.log('posts: ', posts)

  return (
    <div>
      {posts &&
        posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            profileImg={post.data().profileImg}
            image={post.data().image}
            caption={post.data().caption}
          />
        ))}
    </div>
  )
}
