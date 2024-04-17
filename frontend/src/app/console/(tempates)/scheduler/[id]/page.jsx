"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Information from "./components/information";
import Events from "./components/events";

export default function Page(id) {
  const label = id.params.id;

  const router = useRouter();

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState(currentTab || "information");

  let content;

  switch (selectedTab) {
    case "information":
      content = <Information label={label} />;
      break;
    case "events":
      content = <Events label={label} />;
      break;
    default:
      content = <Information label={label} />;
      break;
  }

  useEffect(() => {
    if (currentTab) {
      setSelectedTab(currentTab);
    }
  }, [currentTab]);

  useEffect(() => {
    if (!currentTab) {
      router.push(`/console/scheduler/${label}?tab=information`, undefined, {
        shallow: true,
      });
    }
  }, []);

  return (
    <div>
      <div className="flex w-auto flex-col h-auto absolute inset-0 bottom-2 top-2 ml-2 mr-2 dark:bg-slate-900">
        <blockquote className="bg-white border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-900 relative h-full">
          <div className="h-full relative dark:bg-slate-900 p-2 flex flex-col justify-between">
            {/* Heading */}
            <h1 className="text-xl font-bold capitalize dark:text-gray-400 text-black">
              Cron Job: {label}
            </h1>
            <h2 className="text text-md dark:text-gray-400 text-black truncate">
              All the information about the scheduler that will provide powerful
              cron job
            </h2>

            <div className="h-full mt-5 flex">
              {/* Menu  */}
              <div className="row-span-9 col-span-10 dark:bg-slate-800 border-t-[5px] border-blue-600 dark:border-gray-500 mr-2 min-w-[300px] bg-slate-200">
                <ul className="menu rounded-sm dark:text-gray-400 text-black h-full">
                  <li className="menu-title dark:text-gray-400 text-black">
                    Options
                  </li>{" "}
                  {/* Information */}
                  <button
                    className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                      selectedTab == "information"
                        ? "border-l-4 border-blue-600 border"
                        : "border-l-4 border-transparent border"
                    }`}
                    onClick={() => {
                      router.push(
                        `/console/scheduler/${label}?tab=information`
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-info-circle mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    Information
                  </button>
                  {/* Databases */}
                  <button
                    className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                      selectedTab == "events"
                        ? "border-l-4 border-blue-600 border"
                        : "border-l-4 border-transparent border"
                    }`}
                    onClick={() => {
                      router.push(`/console/scheduler/${label}?tab=events`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-activity mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"
                      />
                    </svg>
                    Events
                  </button>
                  {/* Settings */}
                  <button
                    className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                      selectedTab == "settings"
                        ? "border-l-4 border-blue-600 border"
                        : "border-l-4 border-transparent border"
                    }`}
                    onClick={() => {
                      router.push(`/console/scheduler/${label}?tab=settings`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-nut mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="m11.42 2 3.428 6-3.428 6H4.58L1.152 8 4.58 2h6.84zM4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1H4.58z" />
                      <path d="M6.848 5.933a2.5 2.5 0 1 0 2.5 4.33 2.5 2.5 0 0 0-2.5-4.33zm-1.78 3.915a3.5 3.5 0 1 1 6.061-3.5 3.5 3.5 0 0 1-6.062 3.5z" />
                    </svg>
                    Settings
                  </button>
                </ul>
              </div>
              {/* Information Area */}
              <div className="dark:bg-slate-800 bg-slate-200 border-blue-600 w-full h-auto p-1 rounded-sm border-t-[5px] dark:border-gray-500 col-span-4">
                {content}
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
