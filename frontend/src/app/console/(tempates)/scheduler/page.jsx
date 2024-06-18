"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page(params) {
  const router = useRouter();

  const [gettingDisk, setGettingDisk] = useState(false);
  const [disk, setDisk] = useState([]);

  async function getDisk() {
    setGettingDisk(true);
    try {
      await axios
        .get(`/api/scheduler/get-jobs`, {
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
  const [schedule, setSchedule] = useState("*/5 * * * *");
  const [image, setImage] = useState("dauqu/date");

  //Create Disk
  const [creatingDisk, setCreatingDisk] = useState(false);
  async function createJob() {
    setCreatingDisk(true);
    await axios
      .post(
        `/api/scheduler/new-job`,
        {
          name: name,
          schedule: "*/5 * * * *",
          image: image,
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

  //Delete Jobs
  const [deleteingJob, setDeleteingJob] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);

  async function deleteJob(id) {
    await axios
      .delete(
        `/api/scheduler/delete-job/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
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
          <div className="h-auto dark:bg-slate-900 p-2 space-y-2">
            {/* Heading */}
            <div className="flex flex-col justify-between items-start">
              <h1 className="text-xl font-bold dark:text-gray-400 text-black">
                Daucu Scheduler
              </h1>
              <span className="text dark:text-gray-400 text-black text-xs">
                Daucu Scheduler is a powerful task scheduling and automation
                tool designed to streamline and optimize business processes.
                With Daucu Scheduler, organizations can efficiently manage their
                workflows, ensuring tasks are executed at the right time and
                with precision.
              </span>
            </div>
            <div className="">
              <button
                className="btn btn-sm rounded-sm no-animation dark:btn-info capitalize"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                New Jobs
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-scroll">
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
                        No cron jobs found. Create a new cron job to get
                        started.{" "}
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
                              <th>Images</th>
                              <th>Schedule</th>
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
                                  <td>{disk?.name}</td>
                                  <td>{disk?.image}</td>
                                  <td>
                                    {disk?.schedule}
                                    <br />
                                  </td>
                                  <td>{disk?.created_at}</td>
                                  <td className="space-x-1">
                                    <button
                                      className="btn btn-xs rounded-none btn-error no-animation"
                                      disabled={deleteingJob === disk?.label}
                                      onClick={() => {
                                        setDeleteJobId(disk?.label);
                                        deleteJob(disk?.label);
                                      }}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="btn btn-xs rounded-none no-animation"
                                      onClick={() => {
                                        router.push(
                                          `/console/scheduler/${disk?.label}`
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
            Daucu Scheduler
          </h3>
          <div className="py-4">
            {/* Name */}
            <label className="block">
              <span className="text-gray-700 dark:text-slate-400 text-sm">
                Name
              </span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-white dark:bg-slate-800 dark:text-white text-black"
                placeholder="Job Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {/* Size */}
            <label className="block mt-2">
              <span className="text-gray-700 dark:text-slate-400 text-sm">
                Select Time Interval
              </span>
              <ul class="grid w-full gap-2 md:grid-cols-5 mt-1">
                <li>
                  <input
                    type="radio"
                    id="1-minute"
                    name="time"
                    value="*/1 * * * *"
                    class="hidden peer"
                    required
                    onChange={(e) => {
                      setSchedule(e.target.value);
                    }}
                  />
                  <label
                    for="1-minute"
                    class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                  >
                    <div class="block">
                      <div class="w-full text-base">1 minute</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="5-minute"
                    name="time"
                    value="*/5 * * * *"
                    class="hidden peer"
                    onChange={(e) => {
                      setSchedule(e.target.value);
                    }}
                  />
                  <label
                    for="5-minute"
                    class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                  >
                    <div class="block">
                      <div class="w-full text-base">5 minutes</div>
                      {/* <div class="w-full">Good for large websites</div> */}
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="10-minute"
                    name="time"
                    value="*/10 * * * *"
                    class="hidden peer"
                    onChange={(e) => {
                      setSchedule(e.target.value);
                    }}
                  />
                  <label
                    for="10-minute"
                    class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                  >
                    <div class="block">
                      <div class="w-full text-base">10 minutes</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="15-minute"
                    name="time"
                    value="*/15 * * * *"
                    class="hidden peer"
                    onChange={(e) => {
                      setSchedule(e.target.value);
                    }}
                  />
                  <label
                    for="15-minute"
                    class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                  >
                    <div class="block">
                      <div class="w-full text-base">15 minutes</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="30-minute"
                    name="time"
                    value="*/30 * * * *"
                    class="hidden peer"
                    onChange={(e) => {
                      setSchedule(e.target.value);
                    }}
                  />
                  <label
                    for="30-minute"
                    class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                  >
                    <div class="block">
                      <div class="w-full text-base">30 minutes</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="1-hour"
                    name="time"
                    value="0 * * * *"
                    class="hidden peer"
                    onChange={(e) => {
                      setSchedule(e.target.value);
                    }}
                  />
                  <label
                    for="1-hour"
                    class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                  >
                    <div class="block">
                      <div class="w-full text-base">1 hour</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="1-day"
                    name="time"
                    value="0 0 * * *"
                    class="hidden peer"
                    onChange={(e) => {
                      setSchedule(e.target.value);
                    }}
                  />
                  <label
                    for="1-day"
                    class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                  >
                    <div class="block">
                      <div class="w-full text-base">1 day</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="1-week"
                    name="time"
                    value="0 0 * * 0"
                    class="hidden peer"
                    onChange={(e) => {
                      setSchedule(e.target.value);
                    }}
                  />
                  <label
                    for="1-week"
                    class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                  >
                    <div class="block">
                      <div class="w-full text-base">1 week</div>
                    </div>
                  </label>
                </li>
              </ul>
            </label>
            <label className="block mt-2">
              <span className="text-gray-700 dark:text-slate-400 text-sm">
                Schedule
              </span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-white dark:bg-slate-800 dark:text-white text-black"
                placeholder="*/5 * * * *"
                value={schedule}
                onChange={(e) => {
                  setSchedule(e.target.value);
                }}
              />
            </label>
            {/* Region */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400 text-sm">
                Public Image Link
              </span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-white dark:bg-slate-800 dark:text-white text-black"
                placeholder="https://www.google.com/"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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
                createJob();
              }}
              disabled={creatingDisk}
            >
              {creatingDisk ? "Creating Job..." : "Create Job"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
