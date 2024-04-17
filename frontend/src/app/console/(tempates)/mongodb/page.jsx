"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page(params) {
  const router = useRouter();

  const web_tech = [
    {
      id: 1,
      name: "MySQL",
      slug: "mysql",
      description:
        "MySQL is an open-source relational database management system (RDBMS). Its name is a combination of 'My', the name of co-founder Michael Widenius's daughter, and 'SQL', the abbreviation for Structured Query Language.",
      icon: "https://cdn.worldvectorlogo.com/logos/mysql-6.svg",
      link: "https://www.mysql.com/",
    },
    {
      id: 2,
      name: "MongoDB",
      slug: "mongo-db",
      description:
        "MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.",
      icon: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
      link: "https://www.mongodb.com/",
    },
  ];

  const [gettingDisk, setGettingDisk] = useState(false);
  const [disk, setDisk] = useState([]);

  async function getDisk() {
    setGettingDisk(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/disk/get-my-disk`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setDisk(response.data);
          setGettingDisk(false);
        })
        .catch((error) => {
          console.log(error);
          setGettingDisk(false);
          toast(error.response.data.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setGettingDisk(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("ap-south-1");
  const [size, setSize] = useState("20");

  //Create Disk
  const [creatingDisk, setCreatingDisk] = useState(false);
  async function createDisk() {
    setCreatingDisk(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/disk/create-disk`,
        {
          label: name,
          region: region,
          size: size,
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

  useEffect(() => {
    getDisk();
  }, []);

  return (
    <div>
      <div className="flex w-auto h-full flex-col">
        <blockquote className="bg-gray-100 border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-800">
          <div className="h-auto dark:bg-slate-900 p-3">
            <div className="flex flex-col justify-between items-start h-[50px]">
              <h1 className="text-xl font-bold dark:text-gray-400 text-black">
                MongoDB Cluster
              </h1>
              <span className="text dark:text-gray-400 text-black text-xs">
                A Managed MongoDB Database service offers hassle-free,
                cloud-based MongoDB hosting and administration. It handles
                infrastructure provisioning, backups, high availability,
                security, and scaling, allowing businesses to focus on their
                applications and data rather than database management.
              </span>
            </div>
            <div>
              <button
                className="btn btn-sm mt-2 rounded-none no-animation capitalize dark:btn-info"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                New Cluster
              </button>
            </div>
            <div className="max-h-[75vh] mt-5 overflow-y-scroll">
              {/* Table */}
              {gettingDisk ? (
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
                  {disk === null || disk?.length === 0 ? (
                    <div className="h-[20vh] w-full flex justify-center items-center">
                      <p className="text-md font-bold dark:text-gray-400 text-black">
                        No Disk found. Create a new disk to get started.{" "}
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
                              <th>Region</th>
                              <th>Size</th>
                              <th>Created AT</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Map Disk */}
                            {disk &&
                              disk !== null &&
                              disk?.map((disk, index) => (
                                <tr
                                  key={index}
                                  className="dark:bg-slate-700 dark:text-gray-400 text-black bg-slate-200"
                                >
                                  <th>1</th>
                                  <td>{disk?.label}</td>
                                  <td>{disk?.region}</td>
                                  <td>
                                    {disk?.size} GB SSD <br />
                                  </td>
                                  <td>{disk?.created_at}</td>
                                  <td>
                                    <button className="btn btn-xs rounded-none btn-error no-animation">
                                      Delete
                                    </button>
                                    <button
                                      className="btn btn-xs rounded-none no-animation"
                                      onClick={() => {
                                        router.push(
                                          `/console/postgresql/${disk?.label}`
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
            Create a new disk
          </h3>
          <div className="py-4">
            {/* Name */}
            <label className="block">
              <span className="text-gray-700 dark:text-slate-400">Name*</span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none"
                placeholder="Enter disk name"
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
                className="input input-sm input-bordered mt-1 block w-full rounded-none"
                placeholder="Enter disk name"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </label>
            {/* Region */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">Region*</span>
              <select
                className="select select-bordered select-sm w-full rounded-none"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="ap-south-1">Mumbai (India)</option>
              </select>
            </label>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-sm rounded-none"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="btn btn-sm rounded-none btn-success"
              onClick={() => {
                createDisk();
              }}
              disabled={creatingDisk}
            >
              {creatingDisk ? "Creating Disk..." : "Create Disk"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
