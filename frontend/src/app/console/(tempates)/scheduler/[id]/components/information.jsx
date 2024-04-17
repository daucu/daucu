import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Information({ label }) {
  const [getting, setGetting] = useState(false);
  const [data, setData] = useState([]);

  async function getInformation() {
    setGetting(true);
    try {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/scheduler/job-details/${label}`,
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data?.data);
          setData(response.data?.data);
          setGetting(false);
        })
        .catch((error) => {
          console.log(error);
          setGetting(false);
          toast(error.response.data.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setGetting(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <div className="p-2">
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
          Basic Information
        </div>
        <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
          {getting ? (
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
            <div>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Name:</span>{" "}
                {getting ? "Loading..." : data?.metadata?.name || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Successful job history limit:</span>{" "}
                {getting
                  ? "Loading..."
                  : data?.spec?.successfulJobsHistoryLimit || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Concurrency policy:</span>{" "}
                {getting
                  ? "Loading..."
                  : data?.spec?.concurrencyPolicy || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Schedule:</span>{" "}
                {getting ? "Loading..." : data?.spec?.schedule || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Suspend:</span>{" "}
                {getting ? "Loading..." : `${data?.spec?.suspend}` || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Creation time:</span>{" "}
                {getting
                  ? "Loading..."
                  : data?.metadata?.creationTimestamp || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Last Schedule Time:</span>{" "}
                {getting
                  ? "Loading..."
                  : data?.status?.lastScheduleTime || "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
