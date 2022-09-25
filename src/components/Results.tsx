import React from 'react'

const Results = ({type, results }: any) => {
  return 
        {results && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
          <h1 className="text-5xl text-white">Results</h1>
          {Object.entries(results).map(([key, value]) => (
            <div>
              <h2 className="text-2xl text-white">{key}</h2>
              {value.map((link) => (
                <p className="text-white">{link}</p>
              ))
              }</div>
              ))}
          </div>)}
  
}

export default Results