export default function Story({ avatar, username }) {
  return (
    <div>
      <img className={styles.avatar} src={avatar} alt={`${username} avatar`} />
      <p className={styles.username}>{username}</p>
    </div>
  )
}

const styles = {
  avatar:
    'h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out',
  username: 'text-xs w-14 truncate text-center',
}
