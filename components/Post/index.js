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
import {
  addDoc,
  deleteDoc,
  setDoc,
  doc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../firebase'
import Moment from 'react-moment'

export default function Post({ id, username, profileImg, image, caption }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
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

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uuid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uuid), {
        username: session.user.username,
      })
    }
  }

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
        snapshot => setComments(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () => onSnapshot(collection(db, 'posts', id, 'likes'), snapshot => setLikes(snapshot.docs)),
    [db, id]
  )

  useEffect(
    () => setHasLiked(likes.findIndex(like => like.id === session?.user?.uuid) !== -1),
    [likes]
  )

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
            {hasLiked ? (
              <HeartIconFilled onClick={likePost} className={styles.likedIcon} />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      <p className={styles.captionSection}>
        {likes.length > 0 && <p className={styles.likesText}>{likes.length} likes</p>}
        <span className={styles.usernameCaptionSection}>{username} </span> {caption}
      </p>

      {comments.length > 0 && (
        <div className={styles.commentsContainer}>
          {comments.map(comment => (
            <div key={comment.id} className={styles.commentContainer}>
              <img
                className={styles.commentUserImage}
                src={comment.data().userImage}
                alt="user image from comment"
              />
              <p className={styles.commentText}>
                <span className="font-bold">{comment.data().username}</span>{' '}
                {comment.data().comment}
              </p>

              <Moment className={styles.commentTimeStampText} fromNow>
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
  likedIcon: 'btn text-red-500',
  likesText: 'font-bold mb-1',
  commentsContainer: 'ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin',
  commentContainer: 'flex items-center space-x-2 mb-3',
  commentUserImage: 'h-7 rounded-full',
  commentText: 'text-sm flex-1',
  commentTimeStampText: 'pr-5 text-xs',
}
