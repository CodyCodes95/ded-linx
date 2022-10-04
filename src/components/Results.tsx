import React from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'



const Results = ({ results, setResults }: any) => {
  
  const [parent] = useAutoAnimate()
  
  const removeItem = (i: number, iKey: number) => {
    const newResults = results
    newResults[iKey].links.splice(i, 1)
    setResults([...newResults])
    if (newResults[iKey].links.length === 0) {
      newResults.splice(iKey, 1)
      setResults([...newResults])
    }
  }

  return (
    <>
          <h1 className="text-5xl text-white">Results</h1>
        <div ref={parent as any} className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
          {results.map((obj:any, iKey:any) => (
            <div key={iKey} className="flex w-full flex-col items-center justify-center border-b-4 border-gray-500 p-4">
              <div className='flex w-full items-center justify-center'>
              <a href={obj.url} className="text-2xl text-red-500 mb-6 text-center">{obj.url.substr(0, obj.url.lastIndexOf(".aspx"))}</a>
              </div>
              <ul ref={parent as any} className='flex flex-col w-full'>
                {obj.links.map((link: string, i: number) => (
                <div key={i} className='flex w-full justify-between p-2 bg-slate-800 m-2'>
                <li className="text-white p-4">{link}</li>
                <button onClick={() => removeItem(i, iKey)} className=' text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-green-400 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-900 transition-ease-in duration-200'>Complete</button>
                </div>
              ))
                }
                </ul>
            </div>
              ))}
      </div>
    </>
  )
}

export default Results

// https://www.qnmu.org.au/Web