"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Replication({ label }) {
  const [range, setRnge] = useState(1);

  //Convert range to number
  const rangeToNumber = parseInt(range);
  // Scale Replica
  const [scalling, setScalling] = useState(false);

  async function scaleReplica() {
    setScalling(true);
    await axios
      .post(
        `/api/site/update-replica`,
        {
          label: label,
          replicaCount: rangeToNumber,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setScalling(false);
        toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setScalling(false);
        console.log(err);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  const [selected, setSelected] = useState("xs");
  const [selectedArray, setSelectedArray] = useState({
    name: "xs",
    price: 5 + 5,
    ram: "0.5",
    ramUnit: "GB",
    cpu: "0.25",
    storage: "5",
  });

  var general_purpose = [
    {
      name: "free",
      price: 0,
      ram: "0.25",
      ramUnit: "GB",
      cpu: "0.1",
    },
    {
      name: "xs",
      price: 5 + 2.5,
      ram: "0.5",
      ramUnit: "GB",
      cpu: "0.125",
    },
    {
      name: "sm",
      price: 10 + 5,
      ram: "1",
      ramUnit: "GB",
      cpu: "0.25",
    },
    {
      name: "base",
      price: 20 + 10,
      ram: "2",
      ramUnit: "GB",
      cpu: "0.5",
    },
    {
      name: "lg",
      price: 40 + 20,
      ram: "4",
      ramUnit: "GB",
      cpu: "1",
    },
    {
      name: "xl",
      price: 80 + 40,
      ram: "8",
      ramUnit: "GB",
      cpu: "2",
    },
    {
      name: "2xl",
      price: 160 + 80,
      ram: "16",
      ramUnit: "GB",
      cpu: "4",
    },
    {
      name: "3xl",
      price: 320 + 160,
      ram: "32",
      ramUnit: "GB",
      cpu: "8",
    },
    {
      name: "4xl",
      price: 640 + 320,
      ram: "64",
      ramUnit: "GB",
      cpu: "16",
    },
    {
      name: "5xl",
      price: 2560 + 1280,
      ram: "128",
      ramUnit: "GB",
      cpu: "32",
    },
  ];

  //Read Replica
  const [gettingDetails, setGettingDetails] = useState(true);
  const [replicaDetails, setReplicaDetails] = useState([]);

  //Get websites details
  async function getReplicaDetails() {
    setGettingDetails(true);
    await axios
      .get(`/api/site/read-replica/${label}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGettingDetails(false);
        setReplicaDetails(res.data);
        setRnge(res.data?.replica_count);
        setSelected(res.data?.plan);
        console.log(res.data);
      })
      .catch((err) => {
        setGettingDetails(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  //Update Replica
  const [updating, setUpdating] = useState(false);

  async function updateReplica() {
    setUpdating(true);
    await axios
      .patch(
        `/api/site/update-replica`,
        {
          label: label,
          plan: selected,
          replica_count: rangeToNumber,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setUpdating(false);
        toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        setUpdating(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  // Onresize
  useEffect(() => {
    getReplicaDetails();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-full w-auto relative">
      {/* <span className="text-xl font-bold pb-2 dark:text-gray-400 text-black">
        Cluster Information
      </span> */}
      {/* <TemplateLayout /> */}
      <div className="h-auto overflow-y-scroll inset-0 relative max-h-[80vh]">
        <div className="w-auto relative h-full max-h-[80vh]">
          <div className="join join-vertical w-full rounded-none space-y-2">
            {/* Plan */}
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Choose Plan
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                {" "}
                {gettingDetails ? (
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
                  <div>
                    <ul className="grid gap-2 grid-cols-3 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 select-none">
                      {/* Loop */}

                      {general_purpose &&
                        general_purpose.map((item, index) => (
                          <div
                            key={index}
                            className={` ${
                              selected !== item?.name
                                ? "dark:border-gray-500 border-l-8 border border-slate-400"
                                : "dark:border-green-500 border-l-8 border-green-500 border"
                            } inline-flex justify-start items-start p-2 w-full text-gray-500 cursor-pointer hover:text-gray-600 dark:text-gray-400 dark:bg-slate-800  bg-slate-200 container z-40 rounded-sm`}
                          >
                            <label className="cursor-pointer w-full">
                              <input
                                type="checkbox"
                                id={item._id}
                                value=""
                                className="hidden peer"
                                required=""
                                onClick={() => {
                                  setSelected(item?.name);
                                  setSelectedArray(item);
                                }}
                              />
                              <div className="flex flex-col w-full">
                                <div className="flex w-full justify-between">
                                  {/* Pricing */}
                                  <div className="flex justify-between w-full">
                                    <div className="flex items-center justify-between dark:text-white text- uppercase w-full dark:bg-transparent pl-2 pr-2">
                                      <div className="flex items-center dark:text-gray-400 text-black">
                                        {item?.name}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14"
                                          height="14"
                                          // fill="currentColor"
                                          className="bi bi-arrow-right-short fill-black"
                                          viewBox="0 0 16 16"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                                          />
                                        </svg>
                                      </div>
                                      <span className="ml-3 text-base dark:text-gray-400 text-black">
                                        ${item?.price}{" "}
                                        <span className="text-xs capitalize">
                                          /month
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full text-xs overflow-ellipsis dark:text-gray-400 text-black mt-1 flex justify-start items-center pl-2 pr-2">
                                  RAM
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-arrow-right-short"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                                    />
                                  </svg>
                                  <span className="ml-2">
                                    {" "}
                                    {item?.ram} {item?.ramUnit}
                                  </span>
                                </div>
                                <div className="w-full text-xs overflow-ellipsis dark:text-gray-400 text-black mt-1 flex justify-start items-center pl-2 pr-2">
                                  vCPU
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-arrow-right-short"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                                    />
                                  </svg>{" "}
                                  <span className="ml-2">{item?.cpu}</span>
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                    </ul>{" "}
                  </div>
                )}
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Replica Count
              </div>
              <div className="collapse-content">
                {gettingDetails ? (
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
                  <div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={range}
                      onChange={(e) => {
                        setRnge(e.target.value);
                      }}
                      className="range mt-3 range-xs"
                      step="1"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">Pricing</div>
              <div className="collapse-content">
                {gettingDetails ? (
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
                  <div className="alert border-blue-600 rounded-none dark:bg-slate-800 border-l-8 border dark:border-slate-500 bg-slate-100 mt-3 flex justify-between">
                    <div>
                      {/* Details */}
                      <div className="text-xs">
                        <div className="items-center dark:text-gray-400 text-black">
                          <div>
                            <span className="font-bold">RAM:</span>{" "}
                            {selectedArray?.ram}{" "}
                            {selectedArray?.ramUnit === "GB" ? "GB" : "MB"}
                          </div>
                          <div>
                            <span className="font-bold">vCPU:</span>{" "}
                            <span className="">{selectedArray?.cpu}</span>
                          </div>
                        </div>
                      </div>

                      {/* Replica Count */}
                      <div className="mt-2 flex items-center dark:text-gray-400 text-black">
                        <span>Replica Count</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-arrow-right-short"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                          />
                        </svg>{" "}
                        <span className="ml-2 dark:text-gray-400 text-black">
                          {range}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="text-xl mt-2 flex items-center dark:text-gray-400 text-black">
                        <span>Price</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-arrow-right-short"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                          />
                        </svg>
                        <span className="text-xl ml-2">
                          {selectedArray?.price * rangeToNumber} USD/Month
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-arrow-right-short ml-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                          />
                        </svg>
                        {/* Hour Price */}
                        <span className="text-sm ml-2">
                          {(
                            (selectedArray?.price * rangeToNumber) /
                            30 /
                            24
                          ).toFixed(3)}{" "}
                          USD/Hour
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn rounded-none btn-sm btn-wide mt-5 outline-dashed outline-black outline-[2px] no-animation disabled:bg-slate-500 disabled:text-white"
                      onClick={updateReplica}
                      disabled={updating}
                    >
                      {updating ? (
                        <span className="loading loading-spinner w-3 h-3"></span>
                      ) : (
                        ""
                      )}
                      {updating ? "Updating..." : "Update"}
                    </button>
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
