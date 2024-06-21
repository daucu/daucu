"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [gettingCr, setGettingCr] = useState(true);
  const [registries, setRegistries] = useState([]);

  async function getCR() {
    setGettingCr(true);
    try {
      await axios
        .get(`/api/cr/registries`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setRegistries(response?.data?.data);
          setGettingCr(false);
        })
        .catch((error) => {
          setGettingCr(false);
          toast(error.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setGettingCr(false);
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
  //Create Disk
  const [creatingCr, setCreatingCr] = useState(false);

  async function createCr() {
    setCreatingCr(true);
    await axios
      .post(
        `/api/cr/create`,
        {
          name: name,
          size: size,
          username: username,
          password: password,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCreatingCr(false);
        toast(res?.data?.message, { type: "success" });
        getCR();
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        setCreatingCr(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  //Delete Storage
  const [deleteCrLabel, setDeleteCrLabel] = useState(null);

  async function deleteCr(label) {
    setDeleteCrLabel(label);
    await axios
      .delete(`/api/cr/delete/${label}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast(res.data.message, { type: "success" });
        setDeleteCrLabel("");
        getCR();
      })
      .catch((err) => {
        console.log(err);
        setDeleteCrLabel("");
        toast(err.response.data.message, { type: "error" });
        getCR();
      });
  }

  useEffect(() => {
    getCR();
  }, []);

  return (
    <div>
      <div className="flex w-auto h-full flex-col">
        <blockquote className="bg-gray-100 border-blue-600 border-l-[5px] dark:border-gray-500 dark:bg-gray-800">
          <div className="h-auto dark:bg-slate-900 p-2 space-y-3">
            {/* Heading */}
            <div className="flex flex-col justify-between items-start space-y-2">
              <h1 className="text-xl font-bold dark:text-gray-400 text-black">
                Container Registery
              </h1>
              <span className="text dark:text-gray-400 text-black text-xs">
                A Container Registry service simplifies container image storage
                and distribution, supporting Docker and Kubernetes environments.
                It provides a secure, efficient way to manage container images,
                ensuring seamless deployment and scalability while focusing on
                core application development.
              </span>
            </div>
            <div>
              <button
                className="btn btn-sm no-animation btn-neutral capitalize dark:btn-neutral"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                New Container Registery
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-scroll">
              {/* Table */}
              {gettingCr ? (
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
                  {registries === null || registries?.length === 0 ? (
                    <div className="h-[50vh] w-full flex justify-center items-center">
                      {/* <p className="text-md font-bold dark:text-gray-400 text-black">
                        No container registry found. Create a new container
                        registry to get started.{" "}
                      </p> */}
                      <div className="w-full flex justify-center h-full items-center">
                        <div className="text-center flex flex-col items-center justify-center min-h-[50vh]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill="currentColor"
                            class="bi bi-info-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                          </svg>
                          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-400 mb-4 mt-4 underline">
                            No container registry found.
                          </h1>
                          <p className="text-gray-600 mb-4 dark:text-gray-400">
                            No container registry found. Create a new container
                            registry to get started.
                          </p>
                          <button className="btn btn-sm no-animation flex items-center btn-neutral text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                            <svg
                              className="w-6 h-6 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 4v16m8-8H4"
                              ></path>
                            </svg>
                            Create New Registry 
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="overflow-x-auto">
                        <table className="table table-sm">
                          {/* head */}
                          <thead>
                            <tr className="dark:bg-slate-700 dark:text-gray-400 text-black bg-slate-200">
                              <th></th>
                              <th>Name</th>
                              <th>label</th>
                              <th>Size</th>
                              <th>Created AT</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Map Disk */}
                            {registries &&
                              registries !== null &&
                              registries?.map((disk, index) => (
                                <tr
                                  key={index}
                                  className="dark:bg-slate-700 dark:text-gray-400 text-black bg-slate-200"
                                >
                                  <th>1</th>
                                  <td>{disk?.name}</td>
                                  <td>{disk?.label}</td>
                                  <td>
                                    {disk?.size} GB <br />
                                  </td>
                                  <td>{disk?.createdAt}</td>
                                  <td className="space-x-1">
                                    <button
                                      className="btn btn-xs rounded-none btn-error no-animation"
                                      disabled={deleteCrLabel === disk?.label}
                                      onClick={() => {
                                        setDeleteCrLabel(disk?.label);
                                        deleteCr(disk?.label);
                                      }}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="btn btn-xs rounded-none no-animation"
                                      onClick={() => {
                                        router.push(
                                          `/console/container-registry/${disk?._id}`
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
            Create a new registry
          </h3>
          <div className="py-4">
            {/* Name */}
            <label className="block">
              <span className="text-gray-700 dark:text-slate-400">Name*</span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                placeholder="Enter registry name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {/* Size */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">
                Size (GB)*
              </span>
              <input
                type="number"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                placeholder="Enter disk name"
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
                placeholder="Enter username"
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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-sm rounded-sm capitalize"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="btn btn-sm rounded-sm btn-success capitalize"
              onClick={() => {
                createCr();
              }}
              disabled={creatingCr}
            >
              {creatingCr ? "Creating Registry..." : "Create Registry"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
