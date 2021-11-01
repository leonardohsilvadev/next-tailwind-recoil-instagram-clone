import { useEffect, useState } from 'react'
import faker from 'faker'
import { Story } from '..'

export default function Stories() {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fakerUsers = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))

    setProfiles(fakerUsers)
  }, [])

  console.log(profiles)

  return (
    <div className={styles.container}>
      {profiles.map(({ id, avatar, username }) => (
        <Story key={id} avatar={avatar} username={username} />
      ))}
    </div>
  )
}

const styles = {
  container:
    'flex space-x-2 p-6 bg-white mt-8 border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black',
}
