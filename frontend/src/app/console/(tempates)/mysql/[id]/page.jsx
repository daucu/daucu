"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Information from "./components/information";
import Databases from "./components/databases";
import BackupAndStorage from "./components/backup_restore";
import Networking from "./components/networking";
import ComputeStorage from "./components/compute_storage";
import Logs from "./components/logs";
import Terminal from "./components/terminal";
import Metrics from "./components/metrics";
import Replication from "./components/replication";
import Settings from "./components/settings";
import Query from "./components/query";

export default function Page(id) {
  const label = id.params.id;

  const router = useRouter();

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState(currentTab || "information");

  const search_label = searchParams.get("label");

  let content;

  switch (selectedTab) {
    case "information":
      content = <Information label={label} />;
      break;
    case "databases":
      content = <Databases />;
      break;
    case "query":
      content = <Query />;
      break;
    case "backup-stroage":
      content = <BackupAndStorage />;
      break;
    case "networking":
      content = <Networking />;
      break;
    case "compute-storage":
      content = <ComputeStorage />;
      break;
    case "logs":
      content = <Logs label={label} />;
      break;
    case "terminal":
      content = <Terminal />;
      break;
    case "metrics":
      content = <Metrics />;
      break;
    case "replication":
      content = <Replication />;
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
      router.push(
        `/console/mysql/details?tab=information&label=${search_label}`,
        undefined,
        {
          shallow: true,
        }
      );
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
              <div className="row-span-9 col-span-10 dark:bg-slate-800 border-t-[5px] border-blue-600 dark:border-gray-500 mr-2 min-w-[300px] bg-slate-100">
                <div className="row-span-2 col-span-2">
                  <ul className="menu rounded-sm dark:text-gray-400 text-black h-full">
                    <li className="menu-title dark:text-gray-400 text-black">
                      Options
                    </li>{" "}
                    {/* Information */}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex items-center justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "information"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(
                          `/console/mysql/details?tab=information&label=${search_label}`
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
                      className={`rounded-sm dark:text-gray-400 text-black flex items-center justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "databases"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/mysql/details?tab=databases&label=${search_label}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-database mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z" />
                      </svg>
                      Databases
                    </button>
                    {/* Query */}
                    {/* <button
                    className={`rounded-sm dark:text-gray-400 text-black flex justify-start items-center btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                      selectedTab == "query"
                        ? "border-l-4 border-blue-300 border"
                        : "border-l-4 border-transparent border"
                    }`}
                    onClick={() => {
                      router.push(`/console/mysql/${label}?tab=query`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-card-list mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                      <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>
                    Query Executor
                  </button> */}
                    {/* Backup and Restore */}
                    {/* <button
                      className={`rounded-sm dark:text-gray-400 text-black flex items-center justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "backup-stroage"
                          ? "border-l-4 border-blue-300 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(
                          `/console/mysql/${label}?tab=backup-stroage`
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-database-down mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm.354 5.854 1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V10.5a.5.5 0 0 0-1 0v2.793l-.646-.647a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0Z" />
                        <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z" />
                      </svg>
                      Backup and Restore
                    </button> */}
                    {/* Networking */}
                    {/* <button
                    className={`rounded-sm dark:text-gray-400 text-black flex items-center justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                      selectedTab == "networking"
                        ? "border-l-4 border-blue-300 border"
                        : "border-l-4 border-transparent border"
                    }`}
                    onClick={() => {
                      router.push(`/console/mysql/${label}?tab=networking`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-globe mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                    </svg>
                    Networking
                  </button> */}
                    {/* Compute + storage */}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex items-center justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "compute-storage"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(
                          `/console/mysql/details?tab=compute-storage&label=${search_label}`
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-hdd-stack mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h12zM2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2z" />
                        <path d="M5 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM14 3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" />
                        <path d="M5 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                      </svg>
                      Storage
                    </button>
                    {/* Activity log */}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black items-center flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "logs"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/mysql/details?tab=logs&label=${search_label}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-card-list mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                      </svg>
                      Logs
                    </button>
                    {/* Terminal */}
                    {/* <button
                    className={`rounded-sm dark:text-gray-400 text-black items-center flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                      selectedTab == "terminal"
                        ? "border-l-4 border-blue-300 border"
                        : "border-l-4 border-transparent border"
                    }`}
                    onClick={() => {
                      router.push(`/console/mysql/${label}?tab=terminal`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-terminal-plus mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v4a.5.5 0 0 1-1 0V4a1 1 0 0 0-1-1H2Z" />
                      <path d="M3.146 5.146a.5.5 0 0 1 .708 0L5.177 6.47a.75.75 0 0 1 0 1.06L3.854 8.854a.5.5 0 1 1-.708-.708L4.293 7 3.146 5.854a.5.5 0 0 1 0-.708ZM5.5 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5ZM16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                    Terminal (SSH)
                  </button> */}
                    {/* Metrics */}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex items-center justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "metrics"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/mysql/details?tab=metrics&label=${search_label}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-bar-chart-line mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                      </svg>
                      Metrics
                    </button>
                    {/* Replication */}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex items-center justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "replication"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/mysql/details?tab=replication&label=${search_label}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-boxes mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />
                      </svg>
                      Replication
                    </button>
                    {/* Settings */}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex items-center justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "settings"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        router.push(`/console/mysql/details?tab=settings&label=${search_label}`);
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
              </div>

              {/* Right Area */}
              <div className="row-span-3 col-span-9 dark:bg-slate-800 w-full h-auto p-3 border-t-[5px] border-blue-600 dark:border-gray-500 bg-slate-100 relative">
                {content}
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
