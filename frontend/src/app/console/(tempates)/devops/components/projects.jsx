import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Projects(params) {
  const router = useRouter();

  const handleDrop = async (event) => {
    event.preventDefault();
    const items = event.dataTransfer.items;

    // Initialize an array to store file paths
    const filePaths = [];

    // Iterate through the items
    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry();
      if (item) {
        await processItem(item, filePaths);
      }
    }

    // Print the file paths
    console.log("File paths:", filePaths);
  };

  const processItem = async (item, filePaths) => {
    if (item.isFile) {
      filePaths.push(item.fullPath);
    } else if (item.isDirectory) {
      const directoryReader = item.createReader();
      const entries = await readEntries(directoryReader);

      // Recursively process each entry in the directory
      for (const entry of entries) {
        await processItem(entry, filePaths);
      }
    }
  };

  const readEntries = (directoryReader) => {
    return new Promise((resolve, reject) => {
      directoryReader.readEntries(
        (entries) => resolve(entries),
        (error) => reject(error)
      );
    });
  };

  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState(null);

  async function getAllRepo(id) {
    setLoading(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/devops/my-projects`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);

          // Reverse the response data array
          const reversedData = response?.data;

          setRepos(reversedData);
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

  //Delete project
  async function deleteProject(id) {
    console.log(id);
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/devops/delete-project/${id}`,
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getAllRepo();
          setLoading(false);
          toast(response?.data?.message, {
            type: "success",
          });
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

  return (
    <div className="h-full w-full relative">
      <div className="flex w-auto h-full flex-col relative">
        <div className="h-full relative">
          <div className="collapse rounded-none collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 h-full relative">
            <input type="radio" name="my-accordion-1" checked="checked" />
            <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
              Projects
            </div>
            <div className="collapse-content flex flex-col dark:text-gray-400 text-black w-full relative">
              <div className="w-full h-full relative overflow-y-scroll">
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
                  <div className="w-full absolute items-start flex">
                    <table className="table table-sm">
                      {/* head */}
                      <thead>
                        <tr className="dark:bg-slate-900 dark:text-gray-400 text-black bg-white">
                          <th>Name & Version</th>
                          <th>Runtime</th>
                          <th>Target Port</th>
                          <th>Framework</th>
                          <th>Created AT</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="mt-5 dark:text-gray-400 text-black">
                        {repos &&
                          repos?.map((repo, index) => (
                            <tr
                              key={index}
                              className="dark:bg-slate-900 rounded-sm bg-white"
                            >
                              {/* <td>
                                <div className="flex items-center">
                                  <div>
                                    <div className="font-light">
                                      {repo?.label ?? "NoN"}
                                    </div>
                                  </div>
                                </div>
                              </td> */}
                              <td>
                                <div className="flex items-center space-x-3">
                                  <div className="avatar">
                                    <div className="mask mask-square rounded-md bg-slate-300 flex justify-center items-center p-0">
                                      <div className="w-[50px] h-[50px] flex justify-center items-center relative">
                                        <img src={repo?.icon} alt="icon" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="font-bold truncate w-36">
                                      {repo?.name ?? "NoN"}
                                    </div>
                                    <span>
                                      Version:{" "}
                                      <span className="text-blue-500 hover:underline cursor-pointer font-bold">
                                        #{repo?.project_version ?? "NoN"}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="">
                                <div className="font-light text-xs uppercase">
                                  {repo?.runtime ?? "NoN"}
                                </div>
                              </td>
                              <td>
                                <div className="font-light">
                                  {repo?.target_port ?? "NoN"}
                                </div>
                              </td>
                              <td className="">
                                <div className="font-light text-xs uppercase">
                                  {repo?.framework === ""
                                    ? "------------"
                                    : repo?.framework}
                                </div>
                              </td>
                              <td>{repo?.createdAt ?? "NoN"}</td>
                              <td className="">
                                <div className="font-light text-xs uppercase">
                                  {repo?.status ?? "NoN"}
                                </div>
                              </td>
                              <th className="space-x-2">
                                <button
                                  className="btn rounded-none btn-xs mt-5 outline-dashed outline-black dark:outline-white outline-[1px] btn-error no-animation disabled:bg-slate-500 disabled:text-white"
                                  onClick={(e) => {
                                    deleteProject(repo?._id);
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  className="btn rounded-none btn-xs mt-5 outline-dashed outline-black dark:outline-white outline-[1px] no-animation disabled:bg-slate-500 disabled:text-white"
                                  onClick={(e) => {
                                    router.push(
                                      `/console/devops/deploy?ProjectID=${repo?._id}`
                                    );
                                  }}
                                >
                                  View
                                </button>
                              </th>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}