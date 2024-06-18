import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Events({ label }) {
  const [getting, setGetting] = useState(false);
  const [data, setData] = useState([]);

  async function getEvents() {
    setGetting(true);
    try {
      await axios
        .get(
          `/api/scheduler/job-events/${label}`,
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data?.data?.items);
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
    getEvents();
  }, []);

  return (
    <div className="p-2 relative h-auto">
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none relative h-auto">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
          Events
        </div>
        <div className="collapse-content flex flex-col dark:text-gray-400 text-black overflow-y-scroll relative h-[70vh]">
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
            <table className="table table-sm">
              <thead>
                <tr className="dark:bg-slate-900 rounded-sm bg-white dark:text-gray-400 text-black">
                  <th>Message</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Source</th>
                  <th>Count</th>
                  <th>Last Seen</th>
                </tr>
              </thead>
              <tbody className="mt-5 dark:text-gray-400 text-black">
                {data &&
                  data?.items?.map((item, index) => (
                    <tr
                      key={index}
                      className="dark:bg-slate-900 rounded-sm bg-white"
                    >
                      <td>{item?.message ?? "NoN"}</td>
                      <td>{item?.type ?? "NoN"}</td>
                      <td>{item?.reason ?? "NoN"}</td>
                      <td>{item?.source.component ?? "NoN"}</td>
                      <td>{item?.count ?? "NoN"}</td>
                      <td>{item?.lastTimestamp ?? "NoN"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
