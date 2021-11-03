import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'
import { Header } from '../../components'

export default function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className={styles.signInContainer}>
        <img
          className={styles.instagramLogo}
          src="https://links.papareact.com/ocw"
          alt="Instagram lettering logo"
        />
        <p className={styles.infoText}>
          This is not a REAL app, it's built for studyin some technologies.
        </p>
        <div className={styles.providersContainer}>
          {Object.values(providers).map(provider => (
            <div key={provider.name}>
              <button
                className={styles.googleSigninBtn}
                onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

const styles = {
  signInContainer:
    'flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center',
  instagramLogo: 'w-80',
  infoText: 'font-xs italic',
  providersContainer: 'mt-40',
  googleSigninBtn: 'p-3 bg-blue-500 rounded-lg text-white',
}
