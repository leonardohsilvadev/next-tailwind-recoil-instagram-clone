import { MiniProfile, Posts, Stories } from '..'
import Suggestions from '../Suggestions'

export default function Feed() {
  return (
    <main className={styles.container}>
      <section className={styles.storiesSection}>
        <Stories />
        <Posts />
      </section>

      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  )
}

const styles = {
  container: 'grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto',
  storiesSection: 'col-span-2',
}
