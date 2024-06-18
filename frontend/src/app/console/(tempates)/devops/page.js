"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Projects from "./components/projects";
import GitConf from "./components/git";
import Repositories from "./components/repositories";
import UploadProject from "./components/files";
import Dockerfile from "./components/docker-file";
import ThirdParty from "./components/third-party";
// import Information from "./components/information";

export default function Page(id) {
  const label = id.params.id;

  const router = useRouter();

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState(currentTab || "projects");

  let content;

  switch (selectedTab) {
    case "git":
      content = <GitConf />;
      break;
    case "repositories":
      content = <Repositories />;
      break;
    case "upload":
      content = <UploadProject />;
      break;
    case "projects":
      content = <Projects />;
      break;
    case "dockerfile":
      content = <Dockerfile />;
      break;
    case "third-party":
      content = <ThirdParty />;
      break;
    default:
      content = <Projects />;
      break;
  }

  useEffect(() => {
    if (currentTab) {
      setSelectedTab(currentTab);
    }
  }, [currentTab]);

  useEffect(() => {
    if (currentTab === undefined || currentTab === null || currentTab === "") {
      router.push(`/console/devops/?tab=projects`, undefined, {
        shallow: true,
      });
    }
  }, []);

  return (
    <div className="flex w-auto flex-col h-auto absolute inset-0 bottom-2 top-2 ml-2 mr-2 dark:bg-slate-900">
      <blockquote className="bg-white border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-900 relative h-full">
        <div className="h-full relative dark:bg-slate-900 p-2 flex flex-col justify-between">
          {/* Heading */}
          <div className="flex flex-col justify-between items-start h-[50px]">
            <h1 className="text-xl font-bold dark:text-gray-400 text-black">
              Daucu Devops
            </h1>
            <span className="text dark:text-gray-400 text-black text-xs">
              Daucu DevOps as a Service (DaaS) streamlines software development
              and operations, promoting collaboration, automation, and faster,
              more reliable releases.
            </span>
          </div>
          <div className="h-full mt-5 flex">
            {/* Left */}
            <div className="row-span-9 col-span-10 dark:bg-slate-800 border-t-[5px] border-blue-600 dark:border-gray-500 mr-2 min-w-[300px] bg-slate-200">
              <ul className="menu rounded-sm dark:text-gray-400 text-black">
                <li className="menu-title dark:text-gray-400 text-black">
                  Projects
                </li>{" "}
                <button
                  className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                    selectedTab == "projects"
                      ? "border-l-4 border-blue-600 border"
                      : "border-l-4 border-transparent border"
                  }`}
                  onClick={() => {
                    // setSelectedMenu("settings");
                    router.push(`/console/devops/?tab=projects`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-collection mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
                  </svg>
                  All Projects
                </button>
                <li className="menu-title dark:text-gray-400 text-black">
                  Create Project
                </li>{" "}
                <button
                  className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                    selectedTab == "upload"
                      ? "border-l-4 border-blue-600 border"
                      : "border-l-4 border-transparent border"
                  }`}
                  onClick={() => {
                    // setSelectedMenu("settings");
                    router.push(`/console/devops/?tab=upload`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-upload mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>
                  Upload File
                </button>
                <button
                  className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                    selectedTab == "dockerfile"
                      ? "border-l-4 border-blue-600 border"
                      : "border-l-4 border-transparent border"
                  }`}
                  onClick={() => {
                    // setSelectedMenu("settings");
                    router.push(`/console/devops/?tab=dockerfile`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-file-earmark-binary mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.05 11.885c0 1.415-.548 2.206-1.524 2.206C4.548 14.09 4 13.3 4 11.885c0-1.412.548-2.203 1.526-2.203.976 0 1.524.79 1.524 2.203zm-1.524-1.612c-.542 0-.832.563-.832 1.612 0 .088.003.173.006.252l1.559-1.143c-.126-.474-.375-.72-.733-.72zm-.732 2.508c.126.472.372.718.732.718.54 0 .83-.563.83-1.614 0-.085-.003-.17-.006-.25l-1.556 1.146zm6.061.624V14h-3v-.595h1.181V10.5h-.05l-1.136.747v-.688l1.19-.786h.69v3.633h1.125z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                  </svg>
                  Dockerfile
                </button>
                <button
                  className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                    selectedTab == "third-party"
                      ? "border-l-4 border-blue-600 border"
                      : "border-l-4 border-transparent border"
                  }`}
                  onClick={() => {
                    // setSelectedMenu("settings");
                    router.push(`/console/devops/?tab=third-party`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-git mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.698 7.287 8.712.302a1.03 1.03 0 0 0-1.457 0l-1.45 1.45 1.84 1.84a1.223 1.223 0 0 1 1.55 1.56l1.773 1.774a1.224 1.224 0 0 1 1.267 2.025 1.226 1.226 0 0 1-2.002-1.334L8.58 5.963v4.353a1.226 1.226 0 1 1-1.008-.036V5.887a1.226 1.226 0 0 1-.666-1.608L5.093 2.465l-4.79 4.79a1.03 1.03 0 0 0 0 1.457l6.986 6.986a1.03 1.03 0 0 0 1.457 0l6.953-6.953a1.031 1.031 0 0 0 0-1.457" />
                  </svg>
                  Third Party Git
                </button>
                <button
                  className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                    selectedTab == "repositories"
                      ? "border-l-4 border-blue-600 border"
                      : "border-l-4 border-transparent border"
                  }`}
                  onClick={() => {
                    // setSelectedMenu("settings");
                    router.push(`/console/devops/?tab=repositories`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-diagram-3 mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                    />
                  </svg>
                  Repositories
                </button>
                <li className="menu-title dark:text-gray-400 text-black">
                  Settings
                </li>{" "}
                <button
                  className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                    selectedTab == "git"
                      ? "border-l-4 border-blue-600 border"
                      : "border-l-4 border-transparent border"
                  }`}
                  onClick={() => {
                    router.push(`/console/devops/?tab=git`);
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
                    <path d="m11.42 2 3.428 6-3.428 6H4.58L1.152 8 4.58 2zM4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1z" />
                    <path d="M6.848 5.933a2.5 2.5 0 1 0 2.5 4.33 2.5 2.5 0 0 0-2.5-4.33zm-1.78 3.915a3.5 3.5 0 1 1 6.061-3.5 3.5 3.5 0 0 1-6.062 3.5z" />
                  </svg>
                  Settings
                </button>
              </ul>
            </div>
            {/* Information Area */}
            <div className="dark:bg-slate-800 bg-slate-200 border-blue-600 w-full h-auto p-2 rounded-sm border-t-[5px] dark:border-gray-500">
              {content}
            </div>
          </div>
        </div>
      </blockquote>
    </div>
  );
}
