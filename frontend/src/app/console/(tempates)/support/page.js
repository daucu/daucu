"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Information from "../profile/components/general";

export default function Page(params) {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState("information");

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState(currentTab || "github");

  let content;

  switch (selectedTab) {
    case "information":
      content = <Information />;
      break;
    case "billing":
      content = <Information />;
      break;
    case "login-activity":
      content = <Information />;
      break;
    case "notifications":
      content = <Information />;
      break;
    case "users":
      content = <Information />;
      break;
    case "settings":
      content = <Information />;
      break;
    default:
      content = <Information />;
      break;
  }

  useEffect(() => {
    if (currentTab) {
      setSelectedTab(currentTab);
    }
  }, [currentTab]);

  useEffect(() => {
    if (!currentTab) {
      router.push("/console/support", undefined, {
        shallow: true,
      });
    }
  }, []);

  const [gettingAccounts, setGettingAccounts] = useState(false);
  const [accounts, setAccounts] = useState(null);
  async function getAccounts() {
    setGettingAccounts(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/profile`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setAccounts(response.data);
        })
        .catch((error) => {
          console.log(error);
          setGettingAccounts(false);
          toast(error.response.data.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setGettingAccounts(false);
        toast(error.response.data.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  // useEffect(() => {
  //   getAccounts();
  // }, []);

  return (
    <div>
      <div className="flex w-auto flex-col h-auto absolute inset-0 bottom-3 top-3 ml-3 mr-3 dark:bg-slate-900">
        <blockquote className="bg-white border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-900 relative h-full">
          <div className="h-full relative dark:bg-slate-900 p-2 flex flex-col justify-between">
            {/* Heading */}
            <div className="">
              <h1 className="text-xl font-bold capitalize dark:text-gray-400 text-black">
                Support Center
              </h1>
              <h2 className="text dark:text-gray-400 text-black text-md truncate">
                Get help from our support team or community experts.
              </h2>
            </div>
            {/* Main */}
            <div className="h-full mt-5 flex">
              {/* Left */}
              <div className="row-span-9 col-span-10 dark:bg-slate-800 border-t-[5px] border-blue-600 dark:border-gray-500 mr-2 min-w-[300px] bg-slate-200">
                <div className="row-span-2 col-span-2">
                  <ul className="menu rounded-md">
                    <li className="menu-title dark:text-gray-400 text-black">
                      All Tickets (10)
                    </li>{" "}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-ghost hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "information" || !selectedTab
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/support/?tab=information`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-right-short mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                      </svg>
                      I want to change my email address
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "billing"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/support/?tab=billing`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-right-short mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                      </svg>
                      Related to billing and payments
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "login-activity"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/support/?tab=login-activity`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-right-short mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                      </svg>
                      Related to login activity
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "notifications"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/support/?tab=notifications`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-right-short mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                      </svg>
                      Deployment related questions
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "users"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/support/?tab=users`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-right-short mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                      </svg>
                      Users & Grands related questions
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "settings"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/support/?tab=settings`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-right-short mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                      </svg>
                      Settings related questions
                    </button>
                  </ul>
                </div>
              </div>

              {/* Right Area */}
              <div className="row-span-3 col-span-9 dark:bg-slate-800 w-full h-full p-3 border-t-[5px] border-blue-600 dark:border-gray-500 bg-slate-200">
                {content}
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
