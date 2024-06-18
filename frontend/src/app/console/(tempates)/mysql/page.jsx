"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
        <blockquote className="bg-gray-100 border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-800">
          <div className="h-auto dark:bg-slate-900 p-2 space-y-3">
            {/* Heading */}
            <div className="flex flex-col justify-between items-start">
              <h1 className="text-xl font-bold dark:text-gray-400 text-black">
                MySQL database Cluster
              </h1>
              <span className="text dark:text-gray-400 text-black text-xs">
                A Managed MySQL Database service simplifies MySQL database
                hosting and administration, taking care of infrastructure,
                backups, high availability, security, and scaling. It enables
                businesses to focus on their applications and data rather than
                the complexities of database management.
              </span>
            </div>

            <div>
              <button
                className="btn btn-sm rounded-none no-animation dark:btn-info btn-glass capitalize"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Create Cluster
              </button>
            </div>
            <div className="max-h-[75vh] mt-5 overflow-y-scroll">
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
                    <div>
                      <div className="overflow-x-auto">
                        <table className="table table-sm">
                          {/* head */}
                          <thead>
                            <tr className="dark:bg-slate-700 bg-slate-200 dark:text-gray-400 text-black">
                              <th></th>
                              <th>Cluster Name</th>
                              <th>MySQL Version</th>
                              <th>Hight Availability</th>
                              <th>Created AT</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Map Disk */}
                            {clusters &&
                              clusters !== null &&
                              clusters?.map((cluster, index) => (
                                <tr
                                  key={index}
                                  className="dark:bg-slate-700 bg-slate-200 dark:text-gray-400 text-black"
                                >
                                  <th>1</th>
                                  <td>{cluster?.name}</td>
                                  <td>{cluster?.mysql_version}</td>
                                  <td>
                                    {cluster?.hight_availability ? (
                                      <span className="text-green-500">
                                        Enabled
                                      </span>
                                    ) : (
                                      <span className="text-red-500">
                                        Disabled
                                      </span>
                                    )}
                                  </td>
                                  <td>{cluster?.createdAt}</td>
                                  <td className="space-x-1">
                                    <button
                                      className="btn btn-xs rounded-none btn-error no-animation"
                                      onClick={() => {
                                        deleteCluster(cluster?._id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="btn btn-xs rounded-none no-animation"
                                      onClick={() => {
                                        router.push(
                                          `/console/mysql/details?tab=information&label=${cluster.namespace}`
                                        );
                                      }}
                                    >
                                      View &rarr;
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
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
