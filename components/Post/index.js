import { useEffect, useState } from 'react'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import Moment from 'react-moment'

export default function Post({ id, username, profileImg, image, caption }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const { data: session } = useSession()

  const addComment = async e => {
    e.preventDefault()

    const commentToSend = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    })
  }

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
        snapshot => setComments(snapshot.docs)
      ),
    [db]
  )

  console.log('comments: ', comments)

  return (
    <div className={styles.container}>
      <div className={styles.userInfoSection}>
        <img className={styles.avatar} src={profileImg} alt={`${username} avatar photo`} />
        <p className={styles.username}>{username}</p>
        <DotsHorizontalIcon className={styles.dotsIcon} />
      </div>

      <img className={styles.image} src={image} alt="post image" />

      {session && (
        <div className={styles.buttonsSection}>
          <div className={styles.leftButtonsSection}>
            <HeartIcon className="btn" />
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      <p className={styles.captionSection}>
        <span className={styles.usernameCaptionSection}>{username} </span> {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map(comment => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img className="h-7 rounded-full" src={comment.data().userImage} alt="" />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{' '}
                {comment.data().comment}
              </p>

              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className={styles.commentSection}>
          <EmojiHappyIcon className={styles.emojiIcon} />
          <input
            className={styles.commentInput}
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={({ target: { value } }) => setComment(value)}
          />
          <button
            className={styles.postBtn}
            type="submit"
            disabled={!comment.trim()}
            onClick={addComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

const styles = {
  container: 'bg-white my-7 border rounded-sm',
  userInfoSection: 'flex items-center p-5',
  avatar: 'rounded-full h-12 w-12 object-contain border p-1 mr-3',
  username: 'flex-1 font-bold',
  dotsIcon: 'h-5',
  image: 'object-cover w-full',
  buttonsSection: 'flex justify-between px-4 pt-4',
  leftButtonsSection: 'flex space-x-4',
  captionSection: 'p-5 truncate',
  usernameCaptionSection: 'font-bold mr-1',
  commentSection: 'flex items-center p-4',
  emojiIcon: 'h-7',
  commentInput: 'border-none flex-1 focus:ring-0 outline-none',
  postBtn: 'font-semibold text-blue-400',
}
