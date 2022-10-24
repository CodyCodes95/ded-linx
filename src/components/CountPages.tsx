import React from "react";

const CountPages = ({ setResults, setIsLoading }: any) => {
    const [searchUrl, setSearchUrl] = React.useState("");
    const [pageCount, setPageCount] = React.useState(0);

  const getPageCount = async () => {
    setIsLoading(true);
    const res = await fetch("https://ded-linx-api-production.up.railway.app/api/v1/countPages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchUrl,
      }),
    });
    const data = await res.json();
    setPageCount(data.count);
    setIsLoading(false);
  };

    return pageCount ? (
    <>
      <div className="w-[75%] items-center flex flex-col justify-center mb-[20rem]">
                <p className="text-white text-6xl">Found {pageCount} pages</p>
      </div>
    </>
    ) : (
               <>
      <div className="w-[75%] items-center flex flex-col">
        <div className="flex justify-between w-[33%]">
          <input
            value={searchUrl}
            onChange={(e) => setSearchUrl(e.target.value)}
            className="mb-10 g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Website to Search"
          />
        </div>
      </div>
      <button
        onClick={() => getPageCount()}
        type="button"
        className="mb-[15rem] w-[10rem] text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 transition-ease-in duration-200"
      >
        find em
      </button>
    </>
    )
};

export default CountPages;
