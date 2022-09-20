import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  const [newUrl, setNewUrl] = React.useState("");
  const [allowedSubdomains, setAllowedSubdomains] = React.useState("");
  const [results, setResults] = React.useState([]);

  const resTemp = {
    "https://www.qnmu.org.au/Web/Web/Membership/Member-Benefits.aspx": [
        "https://www.qnmu.org.au/QNMU/PUBLIC/MEDIA_AND_PUBLICATIONS/Our_Journal.aspx",
        "https://www.qnmu.org.au/awards",
        "https://www.qnmu.org.au/EventDetailNoDiet?EventKey=22_GEN_03",
        "https://www.qnmu.org.au/conference"
    ],
    "https://www.qnmu.org.au/Web/Web/Membership/Membership_Fees/Pay_Online.aspx": [
        "https://www.qnmu.org.au/DocumentsFolder/QNMU%20DOCUMENTS/General/QNMU_Membership_update_form.pdf",
        "https://www.qnmu.org.au/DocumentsFolder/QNMU%20DOCUMENTS/General/QNMU%20Direct%20Debit%20Service%20Agreement%201117%20WEB.pdf"
    ],
    "https://www.qnmu.org.au/Web/Web/Membership/Membership_and_Fees.aspx": [
        "http://www.qnmu.org.au/join"
    ],
    "https://www.qnmu.org.au/Web/Web/Membership/Membership.aspx": [
        "http://www.qnmu.org.au/join"
    ],
    "https://www.qnmu.org.au/Web/Web/Campaigns/EB11.aspx": [
        "https://www.qnmu.org.au/QNMU/PUBLIC/MEDIA_AND_PUBLICATIONS/News_items/2022/QLD_Health_Offer_In_Principle_010722.aspx"
    ],
    "https://www.qnmu.org.au/Web/Web/Campaigns/Ratios_Save_Lives_FAQ.aspx": [
        "https://www.qnmu.org.au/workloads"
    ],
    "https://www.qnmu.org.au/Web/Campaigns/EB11/Web/Campaigns/EB11.aspx?hkey=37ca49ae-09d6-40b8-a50b-c0cd6a0210ac": [
        "https://www.qnmu.org.au/QNMU/PUBLIC/MEDIA_AND_PUBLICATIONS/News_items/2022/QLD_Health_Offer_In_Principle_010722.aspx"
    ],
    "https://www.qnmu.org.au/Web/QNMU/PUBLIC/CAMPAIGNS/Standards.aspx": [
        "https://www.qnmu.org.au/Awards/Finalists/PPAwards2020/Awards_finalists/Award-finalists.aspx?"
    ],
    "https://www.qnmu.org.au/Web/Membership/Membership_Fees/Web/Membership/Membership_and_Fees.aspx?hkey=e06722a6-0e90-4958-ab27-85b13c2c29ec": [
        "http://www.qnmu.org.au/join"
    ],
    "https://www.qnmu.org.au/Web/Membership/Member-Benefits/Web/Membership/Member-Benefits.aspx?hkey=5e15c899-41c3-40e9-92b1-6784efd4bbc5": [
        "https://www.qnmu.org.au/QNMU/PUBLIC/MEDIA_AND_PUBLICATIONS/Our_Journal.aspx",
        "https://www.qnmu.org.au/awards",
        "https://www.qnmu.org.au/EventDetailNoDiet?EventKey=22_GEN_03",
        "https://www.qnmu.org.au/conference"
    ],
    "https://www.qnmu.org.au/Web/Membership/QNMU-Membership/Web/Membership/Membership.aspx?hkey=920f13fe-7a15-4de5-9636-1cfef8a1b574": [
        "http://www.qnmu.org.au/join"
    ]
}

  const getDeadLinks = async () => {
    const allowedSubdomainsArr = allowedSubdomains.split(",")
    allowedSubdomainsArr.unshift(newUrl)
    const res = await fetch("/api/getDeadLinks", {
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

  const isLoading = false

  if (isLoading) {
    return (
          <>
      <Head>
        <title>ded linx</title>
        <meta name="description" content="Generated by create-t3-app" />
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

        <main className="w-[50%] items-center flex flex-col">
          <h1 className="mb-[10rem] text-5xl text-white">ded linx</h1>
          <div className="flex justify-between w-full">
          <div className="flex flex-col text-white w-[50%]">
            <h2 className="text-2xl text-center">How to Use</h2>
            <p className=" mt-4 p-4">Simply enter the new website on the right (https://www.website.com/web) and any additionally allowed subdomains (https://www.website.com/documentsfolder) and hit the button below to find the dead links!</p>
          </div>
          <div className="flex flex-col">
             <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="mb-10 g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="New website" />
             <input value={allowedSubdomains} onChange={(e) => setAllowedSubdomains(e.target.value)} className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Allowed subdomains" />
             </div>
            </div>
            <button onClick={() => getDeadLinks()} type="button" className=" mt-[10rem] w-[10rem] text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 transition-ease-in duration-200">find em</button>
            </main>
            <div className="absolute bottom-0 p-2 text-white text-lg">
            <a className="">Github</a>
            <a className="">Twitter</a>
            </div>
      </div>
      {resTemp && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
          <h1 className="text-5xl text-white">Results</h1>
          {Object.entries(resTemp).map(([key, value]) => (
            <div>
              <h2 className="text-2xl text-white">{key}</h2>
              {value.map((link) => (
                <p className="text-white">{link}</p>
              ))
              }</div>
              ))}
          </div>)}
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
