"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function UsersAndGrands(params) {
  const router = useRouter();

  const [gettingDisk, setGettingDisk] = useState(false);
  const [disk, setDisk] = useState([]);

  async function getDisk() {
    setGettingDisk(true);
    try {
      await axios
        .get(`/api/disk/get-my-disk`, {
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
        `/api/disk/create-disk`,
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
        <blockquote className="bg-gray-100 border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-800 mt-2">
          <div className="h-auto dark:bg-slate-900 p-3">
            <h1 className="text-2xl font-bold dark:text-gray-400 text-black">
              Users And Grands
            </h1>
            <h2 className="text dark:text-gray-400 text-black text-sm">
              Users and Grands are the people who can access your disk. You can
              add
            </h2>
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
                                    <button className="btn btn-xs rounded-none btn-info no-animation">
                                      Mark as Read
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
    </div>
  );
}
