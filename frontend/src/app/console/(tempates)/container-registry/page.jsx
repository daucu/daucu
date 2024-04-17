"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page(params) {
  const router = useRouter();

  const [gettingCr, setGettingCr] = useState(true);
  const [registries, setRegistries] = useState([]);

  async function getCR() {
    setGettingCr(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/cr/registries`, {
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
        `${process.env.NEXT_PUBLIC_API_URL}/v1/cr/create`,
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
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/v1/cr/delete/${label}`, {
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
          <div className="h-auto dark:bg-slate-900 p-3 space-y-3">
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
                className="btn btn-sm rounded-sm no-animation capitalize dark:btn-info"
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
                    <div className="h-[20vh] w-full flex justify-center items-center">
                      <p className="text-md font-bold dark:text-gray-400 text-black">
                        No container registry found. Create a new container
                        registry to get started.{" "}
                      </p>
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
