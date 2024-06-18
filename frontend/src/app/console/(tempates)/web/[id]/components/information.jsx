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
      .get(`/api/kube/get-sites/${label}`, {
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
      {/* <TemplateLayout /> */}
      <div className="h-auto relative w-full">
        <div className="w-full relative h-auto">
          <div className="join join-vertical w-full rounded-none h-auto">
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
                          : siteDetails?.site?.name || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Label:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.site?.label || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Description:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.site?.description || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Image Name:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.site?.image || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Target Port:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.site?.target_port || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">DNS:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.site?.label + ".daucu.site" ||
                            "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Updated At:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.site?.updatedAt || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Created At:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.site?.createdAt || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                  Deployment Information
                </div>
                <div className="collapse-content">
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
                          : siteDetails?.deployment?.name || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Namespace:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.deployment?.namespace || "N/A"}
                      </p>
                      <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                        <span className="font-bold">Replicas:</span>{" "}
                        {gettingDetails
                          ? "Loading..."
                          : siteDetails?.deployment?.replicas || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Pods */}
              <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                  Pods Status
                </div>
                <div className="collapse-content">
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
                    <table className="table w-full">
                      <tbody className="w-full">
                        {siteDetails?.pod?.map((pod, index) => {
                          return (
                            <div key={index} className="flex mt-2 w-full">
                              <tr className="bg-blue-100 rounded-none w-full justify-between flex border-blue-600 border-b-transparent dark:bg-slate-900 border-l-2">
                                <th className="flex items-center text-slate-800 dark:text-gray-400">
                                  {index + 1}{" "}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-arrow-right ml-5 mr-5"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                    />
                                  </svg>{" "}
                                  {pod?.Name || "N/A"}
                                </th>
                                <td></td>
                                <td className="text-slate-800 dark:text-gray-400">
                                  {pod?.Status || "N/A"}
                                </td>
                              </tr>
                            </div>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
