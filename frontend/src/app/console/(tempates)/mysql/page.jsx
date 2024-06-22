"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatTimeAgo } from "@/app/utils/formatTimeAgo";

export default function Page(params) {
  const router = useRouter();

  const [gettingClusters, setGettingClusters] = useState(false);
  const [clusters, setClusters] = useState([]);

  const cluster_size = [
    {
      ID: "1",
      Environment: "Minimal Development or Testing",
      CPU: "1 vCPU",
      RAM: "1 GB",
    },
    {
      ID: "2",
      Environment: "Small Development Environment",
      CPU: "1 vCPU",
      RAM: "2 GB",
    },
    {
      ID: "3",
      Environment: "Lightweight Production Environment",
      CPU: "2 vCPUs",
      RAM: "4 GB",
    },
    {
      ID: "4",
      Environment: "Moderate Development or Testing",
      CPU: "2 vCPUs",
      RAM: "6 GB",
    },
    {
      ID: "5",
      Environment: "Small Production Environment",
      CPU: "3 vCPUs",
      RAM: "6 GB",
    },
  ];

  async function getDisk() {
    setGettingClusters(true);
    try {
      await axios
        .get(`/api/mysql/get-clusters`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setClusters(response.data.clusters);
          setGettingClusters(false);
        })
        .catch((error) => {
          console.log(error);
          setGettingClusters(false);
          toast(error.response.data.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setGettingClusters(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("20");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hight_availability, setHight_availability] = useState(false);

  //Create Disk
  const [creatingDisk, setCreatingDisk] = useState(false);
  async function createCluster() {
    setCreatingDisk(true);
    await axios
      .post(
        `/api/mysql/new-cluster`,
        {
          name: name,
          mysql_version: "8.3.0",
          size: size,
          username: username,
          password: password,
          hight_availability: hight_availability,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCreatingDisk(false);
        toast(res.data.message, { type: "success" });
        setShowModal(false);
        getDisk();
      })
      .catch((err) => {
        console.log(err);
        setCreatingDisk(false);
        toast(err.response.data.message, { type: "error" });
        getDisk();
      });
  }

  //Delete mysql
  async function deleteCluster(id) {
    await axios
      .delete(`/api/mysql/delete-cluster/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast(res.data.message, { type: "success" });
        getDisk();
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data.message, { type: "error" });
        getDisk();
      });
  }

  useEffect(() => {
    getDisk();
  }, []);

  return (
    <div>
      <div className="flex w-auto h-full flex-col">
        <div className="bg-gray-100 border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-slate-900 p-2 grid grid-cols-10">
          {/* Heading */}
          <div className="flex flex-col justify-between items-start col-span-8">
            <h1 className="text-xl font-bold dark:text-gray-400 text-black">
              MySQL database
            </h1>
            <span className="text dark:text-gray-400 text-black text-xs">
              A Managed MySQL Database service simplifies MySQL database hosting
              and administration, taking care of infrastructure, backups, high
              availability, security, and scaling. It enables businesses to
              focus on their applications and data rather than the complexities
              of database management.
            </span>
          </div>

          <div className="col-span-2 flex items-center justify-end">
            <button
              className="btn btn-sm btn-wide no-animation btn-neutral dark:btn-neutral btn-glass capitalize"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Create Cluster
            </button>
          </div>
        </div>
        <blockquote className="bg-gray-100 border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-800">
          <div className="h-auto dark:bg-slate-900 p-2 space-y-3">
            <div className="max-h-[75vh] mt-2 overflow-y-scroll">
              {/* Table */}
              {gettingClusters ? (
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
                  {clusters === null || clusters?.length === 0 ? (
                    <div className="h-[20vh] w-full flex justify-center items-center">
                      <p className="text-md font-bold dark:text-gray-400 text-black">
                        No Database Cluster Found !
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-2 grid-cols-2 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 select-none">
                      {clusters &&
                        clusters.map((item, index) => (
                          <div
                            key={index}
                            // whileTap={{ scale: 0.9 }}
                            // style={{ x, opacity }}
                            className="inline-flex border-blue-600 justify-between items-center p-3 w-full text-gray-500 cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 border-l-4 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-slate-700 dark:hover:bg-gray-700 bg-slate-200 rounded-sm container z-40"
                            onClick={() => {
                              router.push(
                                `/console/mysql/details?tab=information&label=${item.namespace}`,
                                {
                                  scroll: false,
                                }
                              );
                            }}
                          >
                            <div className="cursor-pointer flex justify-between text-center items-center overflow-hidden w-full">
                              <div className="h-[40px] w-[40px] rounded-md image-full bg-slate-200 p-1 mr-2 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="currentColor"
                                  class="bi bi-database fill-slate-800"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313M13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A5 5 0 0 0 13 5.698M14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A5 5 0 0 0 13 8.698m0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525" />
                                </svg>
                              </div>
                              <div className="flex flex-col justify-start w-full items-start text-left">
                                <div className="flex items-center justify-center"></div>
                                <div
                                  className="w-[100%] relative text-lg truncate dark:text-gray-400 text-black"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item?.name}
                                </div>
                                <div
                                  className="w-full text-xs overflow-ellipsis dark:text-gray-400 text-black"
                                  style={{
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    display: "-webkit-box",
                                    overflow: "hidden",
                                  }}
                                >
                                  {formatTimeAgo(item?.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </blockquote>
      </div>

      {/* Models */}
      {/* You can open the modal using ID.showModal() method */}
      <dialog
        id="my_modal_4"
        className={`modal rounded-none ${showModal ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-5xl rounded-none dark:bg-slate-700 bg-slate-100"
        >
          <h3 className="font-bold text-lg dark:text-gray-400 text-black">
            Create a new cluster
          </h3>
          <div className="py-4">
            {/* Name */}
            <label className="block">
              <span className="text-gray-700 dark:text-slate-400">Name*</span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                placeholder="Enter cluster name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {/* Select Size */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400 text-sm">
                Select Cluster Size* (GB)
              </span>
              <ul class="grid w-full gap-2 md:grid-cols-5 mt-1">
                {cluster_size &&
                  cluster_size.map((item, index) => {
                    return (
                      <li>
                        <input
                          type="radio"
                          id={index}
                          name="time"
                          value={index}
                          class="hidden peer"
                          required
                          onChange={(e) => {
                            setSize(index);
                          }}
                        />
                        <label
                          for={index}
                          class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                        >
                          <div class="block">
                            <div class="w-full text-base flex flex-col">
                              <div className="flex items-center justify-start space-x-1">
                                <span className="text-[8px] truncate">
                                  {item.Environment}{" "}
                                </span>
                              </div>
                              {/* Ram and CPU */}
                              <div className="flex items-center justify-start space-x-1">
                                <span>{item.RAM} </span>
                              </div>

                              <div className="flex items-center justify-start space-x-1">
                                <span>{item.CPU} </span>
                              </div>
                            </div>
                          </div>
                        </label>
                      </li>
                    );
                  })}
              </ul>
            </label>
            {/* Size */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">
                Size (GB)*
              </span>
              <input
                type="number"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </label>
            {/* Username */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">
                Username*
              </span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                placeholder="MySQL Root Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            {/* Password */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">
                Password*
              </span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                placeholder="MySQL Root Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {/* Hight availability */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">
                Enable Hight Availability ?
              </span>
              <input
                type="checkbox"
                className="checkbox mt-1 block rounded-sm bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                checked={hight_availability}
                onChange={() => setHight_availability(!hight_availability)}
              />
            </label>
          </div>
          <div className="modal-action space-x-1">
            <button
              className="btn btn-sm rounded-none capitalize"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="btn btn-sm rounded-none btn-success capitalize"
              onClick={() => {
                createCluster();
              }}
              disabled={creatingDisk}
            >
              {creatingDisk ? "Creating Cluster..." : "Create Cluster"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
