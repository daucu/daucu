"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Information({ label }) {
  const [gettingDetails, setGettingDetails] = useState(true);
  const [siteDetails, setSiteDetails] = useState(null);
  //Get websites details
  async function getWebsiteDetails() {
    setGettingDetails(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/mysql/get-cluster/${label}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGettingDetails(false);
        setSiteDetails(res.data);
        console.log(res.data);
        // toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        setGettingDetails(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }
  useEffect(() => {
    getWebsiteDetails();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 w-full relative overflow-y-scroll h-full">
      <div className="flex w-auto h-full flex-col relative">
        <blockquote className="dark:border-gray-500 dark:bg-gray-800 inset-0 bottom-0 absolute">
          <div className="join join-vertical w-full rounded-none h-auto overflow-y-scroll">
            <div className="h-full w-full space-y-2">
              <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
                <input type="radio" name="my-accordion-1" checked="checked" />
                <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                  Basic Information
                </div>
                <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                  {gettingDetails ? (
                    <div>
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="skeleton h-4 bg-slate-400 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="skeleton h-4 bg-slate-400 rounded"></div>
                            <div className="skeleton h-4 bg-slate-400 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Name:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.name || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Hight Availability:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.hight_availability + "" || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Service Name:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.namespace || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">MySQL Version:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.mysql_version || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Plan:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.plan || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Updated At:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.updatedAt || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Created At:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.createdAt || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Connection information */}
              <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
                <input type="radio" name="my-accordion-2" checked="checked" />
                <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                  Connection Information
                </div>
                <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                  {gettingDetails ? (
                    <div>
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="skeleton h-4 bg-slate-400 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="skeleton h-4 bg-slate-400 rounded"></div>
                            <div className="skeleton h-4 bg-slate-400 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Private URL:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.private_networking || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Public URL:</span> Comming
                        Soon
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Port:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.mysql_port || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Root Username:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.username || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Root Password:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.password || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Delete Cluster */}
              <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
                <input type="radio" name="my-accordion-3" checked="checked" />
                <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                  Delete Cluster
                </div>
                <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                  <div className="mt-2">
                    {gettingDetails ? (
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-slate-400 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-slate-400 rounded"></div>
                            <div className="h-4 bg-slate-400 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="">
                        {/* Delete account */}
                        <button className="btn rounded-none btn-sm btn-wide btn-error outline-dashed outline-black dark:outline-white outline-[2px] no-animation disabled:bg-slate-500 disabled:text-white">
                          <span className="font-bold">Delete Account</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
