import React from 'react'

const Results = ({type, results }: any) => {
  return (
    <>
  <div className='bg-slate-900 min-h-screen'>
        {results && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
          <h1 className="text-5xl text-white">Results</h1>
          {Object.entries(results).map(([key, value]) => (
            <div className="w-[75%] flex flex-col items-center justify-center border-b-4 p-4">
              <a href={key} className="text-2xl text-white mb-6">{key.substr(0, key.lastIndexOf(".aspx"))}</a>
              {value.map((link) => (
                <p className="text-white">{link}</p>
              ))
              }</div>
              ))}
      </div>)}
    </div>
    </>
  )
}

export default Results