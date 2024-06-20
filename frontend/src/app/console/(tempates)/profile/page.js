"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Information from "./components/general";
import Billing from "./components/billing";
import Settings from "./components/settings";
import Users from "./components/users";
import Notifications from "./components/notifications";
import Security from "./components/security";

export default function Page(params) {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState("information");

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState(currentTab || "information");

  let content;

  switch (selectedTab) {
    case "information":
      content = <Information />;
      break;
    case "billing":
      content = <Billing />;
      break;
    case "security":
      content = <Security />;
      break;
    case "notifications":
      content = <Notifications />;
      break;
    case "users":
      content = <Users />;
      break;
    case "settings":
      content = <Settings />;
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
      router.push("/console/profile?tab=general", undefined, {
        shallow: true,
      });
    }
  }, []);

  return (
    <div>
      <div className="flex w-auto flex-col h-auto absolute inset-0 bottom-2 top-2 ml-2 mr-2 dark:bg-slate-900">
        <blockquote className="bg-white border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-900 relative h-full">
          <div className="h-full relative dark:bg-slate-900 p-2 flex flex-col justify-between space-y-3">
            {/* Heading */}
            <div className="flex flex-col justify-between items-start h-[50px]">
              <h1 className="text-xl font-bold dark:text-gray-400 text-black">
                Profile
              </h1>
              <span className="text dark:text-gray-400 text-black text-xs">
                Manage your profile information, billing, login activity,
                notifications, users and settings.
              </span>
            </div>
            {/* Main */}
            <div className="h-full flex">
              {/* Left */}
              <div className="row-span-9 col-span-10 dark:bg-slate-800 border-t-[5px] border-blue-600 dark:border-gray-500 mr-2 min-w-[300px] bg-slate-200">
                <div className="row-span-2 col-span-2">
                  <ul className="menu rounded-md">
                    <li className="menu-title dark:text-gray-400 text-black">
                      Options
                    </li>{" "}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "general" || !selectedTab
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/profile/?tab=general`);
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
                      General
                    </button>
                    {/* <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "billing"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/profile/?tab=billing`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-cash-stack mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                      </svg>
                      Billing
                    </button> */}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "security"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/profile/?tab=security`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-activity mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                        />
                      </svg>
                      Security
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "notifications"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/profile/?tab=notifications`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-bell mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                      </svg>
                      Notifications
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "settings"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/profile/?tab=settings`);
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
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "/"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        localStorage.removeItem("token");
                        router.push(`/`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-box-arrow-right mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                      </svg>
                      Log Out
                    </button>
                  </ul>
                </div>
              </div>

              {/* Right Area */}
              <div className="row-span-3 col-span-9 dark:bg-slate-800 w-full h-auto p-3 border-t-[5px] border-blue-600 dark:border-gray-500 bg-slate-200 relative">
                {content}
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
