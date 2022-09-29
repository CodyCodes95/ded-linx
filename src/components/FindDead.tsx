import React from 'react'
import Results from './Results';

const FindDead = ({setResults}: any) => {

  const [newUrl, setNewUrl] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("Invalid subdomains")
  const [allowedSubdomains, setAllowedSubdomains] = React.useState("");
  const [specificSubdomain, setSpecificSubdomain] = React.useState(true);

  const toggleSearchMethod = () => {
    setSpecificSubdomain(!specificSubdomain)
    specificSubdomain ? setPlaceholder("Valid Subdomains") : setPlaceholder("Invalid subdomains")
  }

  const getDeadLinks = async () => {
      const path = specificSubdomain ? "getDeadLinks" : "bannedSubdomains"
    const allowedSubdomainsArr = allowedSubdomains.split(",")
    allowedSubdomainsArr.unshift(newUrl)
    const res = await fetch(`/api/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newUrl,
        allowedSubdomains: allowedSubdomainsArr,
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
            <p className=" mt-4 p-4">Simply enter the new website on the right (https://www.website.com/web) and any additionally allowed subdomains (https://www.website.com/documentsfolder) and hit the button below to find the dead links!</p>
          </div>
          <div className="flex flex-col justify-center">
             <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="mb-10 g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="New website" />
              <input value={allowedSubdomains} onChange={(e) => setAllowedSubdomains(e.target.value)} className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={placeholder} />
              <label for="small-toggle" class="inline-flex relative items-center mt-5 cursor-pointer">
  <input onClick={toggleSearchMethod} type="checkbox" value="" id="small-toggle" class="sr-only peer"></input>
  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Change search method</span>
</label>
             </div>
            </div>
            <button onClick={() => getDeadLinks()} type="button" className="mb-[15rem] w-[10rem] text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 transition-ease-in duration-200">find em</button>
            </div>
            </>
            
  )
}

export default FindDead