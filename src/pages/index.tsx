import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import CountPages from "../components/CountPages";
import FindDead from "../components/FindDead";
import FindTarget from "../components/FindTarget";
import Results from "../components/Results";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  const [tab, setTab] = React.useState([true, false, false]);
  const [results, setResults] = React.useState(null);
  const activeClasses = "text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white"
  const inactiveClasses = "hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white bg-gray-800 dark:hover:bg-gray-700"
const [isLoading, setIsLoading] = React.useState(false)


  if (isLoading) {
    return (
          <>
      <Head>
        <title>ded linx</title>
        <meta name="Find Old Links" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
        <img src="/ball-triangle.svg" alt="" />
        </div>
            </>
    )
  }

  return (
    <>
      <Head>
        <title>ded linx</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
          <h1 className="mt-[10rem] text-5xl text-white">ded linx</h1>
          <nav className="mt-[2rem] mb-[3rem] w-[50%] items-center flex flex-col">
<ul className="text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
    <li className="w-full">
        <a onClick={() =>setTab([true, false, false])} className={`inline-block p-4 w-full focus:outline-none rounded-l-lg min-w-[10rem] cursor-pointer ${tab[0] && activeClasses} ${!tab[0] && inactiveClasses}`} aria-current="page">Old Links</a>
    </li>
    <li className="w-full">
              <a onClick={() =>setTab([false, true, false])} className={`inline-block p-4 w-full focus:outline-none min-w-[10rem] cursor-pointer ${tab[1] && activeClasses} ${!tab[1] && inactiveClasses}`}>Specific Links</a>
    </li>
    <li className="w-full">
              <a onClick={() =>setTab([false, false, true])} className={`inline-block p-4 w-full focus:outline-none rounded-r-lg min-w-[10rem] cursor-pointer ${tab[2] && activeClasses} ${(!tab[1] || !tab[2]) && inactiveClasses}`}>Count Pages</a>
    </li>
</ul>
        </nav>
        {tab[0] && <FindDead setResults={setResults} setIsLoading={setIsLoading} />}
        {tab[1] && <FindTarget setResults={setResults} setIsLoading={setIsLoading} />}
        {tab[2] && <CountPages setResults={setResults} setIsLoading={setIsLoading} />}

      </div>
      {results && (<div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <Results setResults={setResults} results={results} type={tab[0] ? "dead" : "target"} /> 
      </div>)}
    <div className="absolute bottom-0 p-2 text-white text-lg flex justify-center w-full">
            <a className="p-2">Github</a>
            <a className="p-2">Twitter</a>
        </div>
    </>
  );
};

export default Home;

// type TechnologyCardProps = {
//   name: string;
//   description: string;
//   documentation: string;
// };

// const TechnologyCard = ({
//   name,
//   description,
//   documentation,
// }: TechnologyCardProps) => {
//   return (
//     <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
//       <h2 className="text-lg text-gray-700">{name}</h2>
//       <p className="text-sm text-gray-600">{description}</p>
//       <a
//         className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
//         href={documentation}
//         target="_blank"
//         rel="noreferrer"
//       >
//         Documentation
//       </a>
//     </section>
//   );
// };