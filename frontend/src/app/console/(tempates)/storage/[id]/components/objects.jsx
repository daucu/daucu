import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Objects({ label }) {
  const [getting, setGetting] = useState(false);
  const [data, setData] = useState([]);

  async function getEvents() {
    setGetting(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/cr/registries`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
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
    <div className="">
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
          Repositories
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
            <table className="table table-sm">
              <thead>
                <tr className="dark:bg-slate-900 rounded-sm bg-white dark:text-gray-400 text-black">
                  <th>Repository</th>
                  <th>Clone URL</th>
                  <th>Pull Command</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="mt-5 dark:text-gray-400 text-black">
                {data &&
                  data?.map((item, index) => (
                    <tr
                      key={index}
                      className="dark:bg-slate-900 rounded-sm bg-white"
                    >
                      <td>{"alpine:latest"}</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <span>{"registry-grxchhza.daucu.site/alpine"} </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-copy cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                            />
                          </svg>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <span>
                            {"docker pull registry-grxchhza.daucu.site/alpine"}{" "}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-copy cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                            />
                          </svg>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-error btn-xs rounded-[5px]">
                          Delete
                        </button>
                      </td>
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
