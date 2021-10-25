import Image from 'next/image'
export default function Header() {
  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.largeImg}>
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className={styles.smallImg}>
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
}

const styles = {
  headerContainer: 'flex justify-between max-w-6xl',
  largeImg: 'relative hidden lg:inline-grid h-24 w-24 cursor-pointer',
  smallImg: 'relative lg:hidden h-10 w-10 flex-shrink-0 cursor-pointer'
}