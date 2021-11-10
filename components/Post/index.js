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

export default function Post({ post: { id, username, profileImg, image, caption } }) {
  const { data: session } = useSession()
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

      {session && (
        <form className={styles.commentSection}>
          <EmojiHappyIcon className={styles.emojiIcon} />
          <input type="text" placeholder="Add a comment..." className={styles.commentInput} />
          <button className={styles.postBtn}>Post</button>
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
