import faker from 'faker'
import { useEffect, useState } from 'react'

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({ ...faker.helpers.contextualCard(), id: i }))

    setSuggestions(suggestions)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.suggestionsTitle}>
        <h3 className={styles.suggestionsForYouText}>Suggestions for you</h3>
        <button className={styles.seeAllBtn}>See All</button>
      </div>

      {suggestions.map(({ id, avatar, username, company }) => (
        <div key={id} className={styles.suggestedUserContainer}>
          <img
            className={styles.suggestedUserAvatar}
            src={avatar}
            alt={`${username} profile avatar`}
          />

          <div className={styles.suggestedUserInfo}>
            <h2 className={styles.suggestedUsername}>{username}</h2>
            <h3 className={styles.suggestedUserCompanyName}>Works at {company.name}</h3>
          </div>

          <button className={styles.suggestionFollowBtn}>Follow</button>
        </div>
      ))}
    </div>
  )
}

const styles = {
  container: 'mt-4 ml-10',
  suggestionsTitle: 'flex justify-between text-sm mb-5',
  suggestionsForYouText: 'text-sm font-bold text-gray-400',
  seeAllBtn: 'text-gray-600 font-semibold',
  suggestedUserContainer: 'flex items-center justify-between mt-3',
  suggestedUserAvatar: 'w-10 h-10 rounded-full border p-[2px]',
  suggestedUserInfo: 'flex-1 ml-4',
  suggestedUsername: 'font-semibold text-sm',
  suggestedUserCompanyName: 'text-sm text-gray-400',
  suggestionFollowBtn: 'text-blue-400 text-sm font-semibold',
}
