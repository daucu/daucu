"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Information from "./components/information";
import Objects from "./components/objects";
import Settings from "./components/settings";

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
    case "objects":
      content = <Objects label={label} />;
      break;
    case "settings":
      content = <Settings label={label} />;
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
      router.push(`/console/storage/${label}?tab=information`, undefined, {
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
              Bucket: {label}
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
                        `/console/storage/${label}?tab=information`
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
                      selectedTab == "objects"
                        ? "border-l-4 border-blue-600 border"
                        : "border-l-4 border-transparent border"
                    }`}
                    onClick={() => {
                      router.push(`/console/storage/${label}?tab=objects`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-file-earmark-text mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                      <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                    </svg>
                    Objects
                  </button>
                  {/* Settings */}
                  <button
                    className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                      selectedTab == "settings"
                        ? "border-l-4 border-blue-600 border"
                        : "border-l-4 border-transparent border"
                    }`}
                    onClick={() => {
                      router.push(`/console/storage/${label}?tab=settings`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-nut mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="m11.42 2 3.428 6-3.428 6H4.58L1.152 8 4.58 2zM4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1z" />
                      <path d="M6.848 5.933a2.5 2.5 0 1 0 2.5 4.33 2.5 2.5 0 0 0-2.5-4.33zm-1.78 3.915a3.5 3.5 0 1 1 6.061-3.5 3.5 3.5 0 0 1-6.062 3.5z" />
                    </svg>
                    Settings
                  </button>
                </ul>
              </div>
              {/* Information Area */}
              <div className="dark:bg-slate-800 bg-slate-200 border-blue-600 w-full h-auto p-2 rounded-sm border-t-[5px] dark:border-gray-500 col-span-4">
                {content}
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
