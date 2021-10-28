import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";

export default function Header() {
  return (
    <div>
      <div className={styles.leftContainer}>
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
        <div className={styles.middleContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.searchIconContainer}>
              <SearchIcon className={styles.searchIcon} />
            </div>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  leftContainer: "flex justify-between max-w-6xl",
  largeImg: "relative hidden lg:inline-grid w-24 cursor-pointer",
  smallImg: "relative lg:hidden w-10 flex-shrink-0 cursor-pointer",
  middleContainer: "max-w-xs",
  searchContainer: "relative mt-1 p-3 rounded-md",
  searchIconContainer:
    "absolute inset-y-0 pl-3 flex items-center pointer-events-none",
  searchIcon: "h-5 w-5 text-gray-500",
  searchInput:
    "bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md",
};
