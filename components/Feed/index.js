import { Posts, Stories } from '..'

export default function Feed() {
  return (
    <main className={styles.container}>
      <section className={styles.storiesSection}>
        <Stories />
        <Posts />
      </section>

      <section></section>
    </main>
  )
}

const styles = {
  container: 'grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto',
  storiesSection: 'col-span-2',
}
