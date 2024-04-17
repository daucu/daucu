import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Settings({ id }) {
  const [getting, setGetting] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);

  async function getInformation() {
    setGetting(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/cr/details/${id}`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setGetting(false);
        })
        .catch((error) => {
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
    <div className="">
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
          Settings
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
                {getting ? "Loading..." : data?.name || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Username:</span>{" "}
                {getting ? "Loading..." : data?.label || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Password:</span>{" "}
                {getting ? "Loading..." : data?.password || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Size:</span>{" "}
                {getting ? "Loading..." : data?.size || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Domain:</span>{" "}
                {getting ? "Loading..." : `${data?.label}.daucu.site` || "N/A"}
              </p>
              <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                <span className="font-bold">Creation time:</span>{" "}
                {getting ? "Loading..." : data?.createdAt || "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
