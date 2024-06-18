"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Terminal({ label }) {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState(null);

  async function getAllRepo(id) {
    setLoading(true);
    try {
      await axios
        .get(`/api/site/import-projects`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
          setRepos(response?.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast(error.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast(error?.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  useEffect(() => {
    getAllRepo();
  }, []);

  return (
    <div className="dark:bg-slate-800 h-auto w-full">
      {/* <TemplateLayout /> */}
      <span className="text-xl font-bold pb-2 dark:text-gray-400 text-black">
        Terminal
      </span>
      <div className="mt-5 h-[70vh] overflow-y-scroll hide-scrollbar">
        {/* <TemplateLayout /> */}
        {loading ? (
          <div className="flex justify-center items-center w-auto h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="w-full items-start flex max-h-[70vh]">
              <table className="table table-sm dark:text-gray-400 text-black">
                {/* head */}
                <thead>
                  <tr className="dark:bg-slate-900 rounded-sm dark:text-gray-400 text-black bg-white">
                    <th>Database Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="mt-5">
                  {repos &&
                    repos?.map((repo, index) => (
                      <tr
                        key={index}
                        className="dark:bg-slate-900 rounded-sm bg-white"
                      >
                        <td>
                          <div className="flex items-center">
                            <div>
                              <div className="font-light">
                                {repo?.label ?? "NoN"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-light">
                            {repo?.label ?? "NoN"}
                          </div>
                        </td>
                        <td className="">
                          <div className="font-light">
                            {repo?.label ?? "NoN"}
                          </div>
                        </td>
                        <td>
                          <div className="font-light">
                            {repo?.created_at ?? "NoN"}
                          </div>
                        </td>
                        <th>
                          <button
                            className="btn btn-xs btn-error rounded-none capitalize"
                            onClick={(e) => {
                              router.push(
                                `/console/devops/deploy?ImportedID=${repo?._id}`
                              );
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-xs rounded-none capitalize ml-2"
                            onClick={(e) => {
                              router.push(
                                `/console/devops/deploy?ImportedID=${repo?._id}`
                              );
                            }}
                          >
                            Chnage Password
                          </button>
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
