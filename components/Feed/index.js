import { useSession } from 'next-auth/react'
import { MiniProfile, Posts, Stories } from '..'
import Suggestions from '../Suggestions'

export default function Feed() {
  const { data: session } = useSession()

  return (
    <main className={session ? styles.container : styles.containerWithoutSession}>
      <section className={styles.storiesSection}>
        <Stories />
        <Posts />
      </section>

      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20">
            {session && <MiniProfile />}
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}

const styles = {
  container: 'grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto',
  containerWithoutSession:
    'grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto !grid-cols-1 !max-w-3xl',
  storiesSection: 'col-span-2',
}
