import { useEffect, useState } from "react";
import { getDocs, doc, db, query, collection } from "../utility/database";

interface BannerInterface {
  url: string;
}
function Carousel() {
  const [bannerList, setBannerList] = useState<BannerInterface[]>([]);
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  useEffect(() => {
    const bannerRef = query(collection(db, "Banner"));

    getDocs(bannerRef).then((res) => {
      setBannerList(
        res.docs.map((item) => ({
          url: item.data().url,
        }))
      );
    });
  }, []);

  const updateBannerIndex = (status: "Next" | "Previous") => {
    if (status === "Next") {
      if (bannerIndex === bannerList.length - 1) {
        setBannerIndex(0);
      } else {
        setBannerIndex((current) => current + 1);
      }
    }

    if (status === "Previous") {
      if (bannerIndex === 0) {
        setBannerIndex(bannerList.length - 1);
      } else {
        setBannerIndex((current) => current - 1);
      }
    }
  };

  return (
    <div
      id="default-carousel"
      className="relative md:my-7"
      data-carousel="static"
    >
      <div className="relative h-44 overflow-hidden rounded-lg md:h-96">
        <div
          className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20"
          data-carousel-item=""
        >
          <span className="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">
            First Slide
          </span>
          <img
            src={bannerList[bannerIndex]?.url}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
      </div>
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {bannerList.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`md:w-3 md:h-3 w-2 h-2 rounded-full ${
              index === bannerIndex
                ? "bg-gray-300 dark:bg-gray-700"
                : "bg-gray-700 dark:bg-gray-300"
            }`}
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
        ))}
      </div>
      <button
        onClick={() => updateBannerIndex("Previous")}
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev=""
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        onClick={() => updateBannerIndex("Next")}
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next=""
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default Carousel;
