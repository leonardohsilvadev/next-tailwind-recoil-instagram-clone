import Image from "next/image";
import {
  HeartIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.largeImg}>
          <Image src="https://links.papareact.com/ocw" layout="fill" objectFit="contain" />
        </div>
        <div className={styles.smallImg}>
          <Image src="https://links.papareact.com/jjm" layout="fill" objectFit="contain" />
        </div>

        <div className={styles.middleSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchIconContainer}>
              <SearchIcon className={styles.searchIcon} />
            </div>
            <input className={styles.searchInput} type="text" placeholder="Search" />
          </div>
        </div>

        <div className={styles.rightSection}>
          <HomeIcon className="navBtn" />
          <MenuIcon className={styles.menuIcon} />
          <div className="relative navBtn">
            <PaperAirplaneIcon className="navBtn rotate-45" />
            <div className={styles.notificationCircle}>3</div>
          </div>
          <PlusCircleIcon className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />

          <img
            src="https://avatars.githubusercontent.com/u/46598333?v=4"
            alt="my smilling photo from github"
            className={styles.userPhoto}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: "shadow-sm border-b bg-white sticky top-0 z-50",
  headerContainer: "flex justify-between max-w-6xl mx-5 xl:mx-auto",
  largeImg: "relative hidden lg:inline-grid w-24 cursor-pointer",
  smallImg: "relative lg:hidden w-10 flex-shrink-0 cursor-pointer",
  middleSection: "max-w-xs",
  searchContainer: "relative mt-1 p-3 rounded-md",
  searchIconContainer: "absolute inset-y-0 pl-3 flex items-center pointer-events-none",
  searchIcon: "h-5 w-5 text-gray-500",
  searchInput:
    "bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md",
  rightSection: "flex items-center justify-end space-x-4",
  menuIcon: "h-6 md:hidden cursor-pointer",
  notificationCircle:
    "absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white",
  userPhoto: "h-10 rounded-full cursor-pointer",
};
