import React from "react";
import Results from "./Results";

const FindTarget = ({setResults, setIsLoading}: any) => {

    const [searchUrl, setSearchUrl] = React.useState("");
  const [targetUrls, setTargetUrls] = React.useState("");
    

    const findTargetLinks = async () => {
    const targetUrlsArr = targetUrls.split(",")
    const res = await fetch("/api/findTargetLinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchUrl,
        targetUrls: targetUrlsArr,
      }),
    })
      const data = await res.json();
    setResults(data) ;
  }

  return (
    <>
    <div className="w-[75%] items-center flex flex-col">
          <div className="flex justify-between w-full">
          <div className="flex flex-col text-white w-[50%]">
            <h2 className="text-2xl text-center">How to Use</h2>
            <p className=" mt-4 p-4">Simply enter the website to search in the top field and the unique portion of the links you wish to find in the bottom field, if searching for more than one, separate with a comma (recommended not to paste the entire link as href's may be different) and hit find! We will return a list of all pages containing your link</p>
          </div>
          <div className="flex flex-col justify-center">
             <input value={searchUrl} onChange={(e) => setSearchUrl(e.target.value)} className="mb-10 g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Website to Search" />
             <input value={targetUrls} onChange={(e) => setTargetUrls(e.target.value)} className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Links to Find" />
             </div>
            </div>
            <button onClick={() => findTargetLinks()} type="button" className="mb-[15rem] w-[10rem] text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 transition-ease-in duration-200">find em</button>
      </div>
    </>
  )
}

export default FindTarget