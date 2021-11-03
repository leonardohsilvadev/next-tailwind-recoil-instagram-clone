// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCymFrwGxXqtCMMIRQtsAqATkoKfJloGdc',
  authDomain: 'next-tailwind-instagram-clone.firebaseapp.com',
  projectId: 'next-tailwind-instagram-clone',
  storageBucket: 'next-tailwind-instagram-clone.appspot.com',
  messagingSenderId: '442226230411',
  appId: '1:442226230411:web:2355f22b96c6ffae36c08e',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
