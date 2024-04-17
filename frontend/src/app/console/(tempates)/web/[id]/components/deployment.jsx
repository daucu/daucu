"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Deployment({ label }) {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([
    {
      _id: "6553aff701c57fbed1225c67",
      created_at: "2023-11-14T17:35:51.283Z",
      framework: "express",
      git_url: "",
      install_command: "npm i",
      labels: "news-backend-amqofegz",
      local_path: "/var/daucu/websites/news-backend-amqofegz",
      name: "Daucu News  Backend",
      runtime: "nodejs",
      runtime_icon: "https://logo.daucu.com/nodejs.svg",
      source: "local",
      start_command: "npm start",
      status: "pending",
      target_port: 4000,
      updated_at: "2023-11-14T17:49:16.801Z",
      user_id: "64d36cfc39ce616ee37d3714",
      version: 1,
    },
    {
      _id: "6553aff701c57fbed1225c67",
      created_at: "2023-11-14T17:35:51.283Z",
      framework: "express",
      git_url: "",
      install_command: "npm i",
      labels: "news-backend-amqofegz",
      local_path: "/var/daucu/websites/news-backend-amqofegz",
      name: "Daucu News  Backend",
      runtime: "nodejs",
      runtime_icon: "https://logo.daucu.com/nodejs.svg",
      source: "local",
      start_command: "npm start",
      status: "pending",
      target_port: 4000,
      updated_at: "2023-11-14T17:49:16.801Z",
      user_id: "64d36cfc39ce616ee37d3714",
      version: 1,
    },
    {
      _id: "6553aff701c57fbed1225c67",
      created_at: "2023-11-14T17:35:51.283Z",
      framework: "express",
      git_url: "",
      install_command: "npm i",
      labels: "news-backend-amqofegz",
      local_path: "/var/daucu/websites/news-backend-amqofegz",
      name: "Daucu News  Backend",
      runtime: "nodejs",
      runtime_icon: "https://logo.daucu.com/nodejs.svg",
      source: "local",
      start_command: "npm start",
      status: "pending",
      target_port: 4000,
      updated_at: "2023-11-14T17:49:16.801Z",
      user_id: "64d36cfc39ce616ee37d3714",
      version: 1,
    },
  ]);

  async function getAllRepo(id) {
    setLoading(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/site/import-projects`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
          // setRepos(response?.data);
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
      {/* <span className="text-xl font-bold pb-2 dark:text-gray-400 text-black">
        Deployment {label}
      </span> */}
      <div className="h-[80vh] overflow-y-scroll hide-scrollbar">
        <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
          <input type="radio" name="my-accordion-1" checked="checked" />
          <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
            Deployments
          </div>
          <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
            {loading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="skeleton h-4 bg-slate-400 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="skeleton h-4 bg-slate-400 rounded"></div>
                    <div className="skeleton h-4 bg-slate-400 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="w-full items-start flex max-h-[70vh]">
                  <table className="table table-sm dark:text-gray-400 text-black">
                    {/* head */}
                    <thead>
                      <tr className="dark:bg-slate-900 rounded-sm dark:text-gray-400 text-black bg-white">
                        <th>Comment</th>
                        <th>Image Name</th>
                        <th>Tag</th>
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
                                  <div className="font-bold">
                                    Lorem ipsum is placeholder text commonly
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="">testy-weukcwbk</td>
                            <td className="capitalize">0.{index}</td>
                            <td>{repo?.created_at ?? "NoN"}</td>
                            <th>
                              <button
                                className="btn btn-xs rounded-none capitalize"
                                onClick={(e) => {
                                  router.push(
                                    `/console/devops/deploy?ImportedID=${repo?._id}`
                                  );
                                }}
                              >
                                RollBack
                              </button>
                              <button
                                className="btn btn-xs rounded-none ml-2 capitalize"
                                // onClick={(e) => {
                                //   router.push(
                                //     `/console/devops/deploy?ImportedID=${repo?._id}`
                                //   );
                                // }}
                              >
                                View
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

        {/* <TemplateLayout /> */}
      </div>
    </div>
  );
}
