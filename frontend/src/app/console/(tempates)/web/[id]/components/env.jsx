"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Env({ label }) {
  const [gettingDetails, setGettingDetails] = useState(true);
  const [envDetails, setEnvDetails] = useState(null);

  //Add env variable
  const [env, setEnv] = useState([]);

  //Get websites details
  async function getWebenvDetails() {
    setGettingDetails(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/kube/get-env/${label}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGettingDetails(false);
        setEnvDetails(res.data);
        console.log(res.data);
        // toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        setGettingDetails(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  //Convert to variable array like [SOME_KEY=SOME_VALUE, SOME_KEY2=SOME_VALUE2]
  function makeEnvArray() {
    let env_array = [];
    env.forEach((item) => {
      if (item.key !== "" && item.value !== "") {
        env_array.push(`${item.key}=${item.value}`);
      }
    });
    return env_array;
  }

  const [addingEnv, setAddingEnv] = useState(false);
  //Add env variable
  async function addEnvVariable() {
    setAddingEnv(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/kube/add-env`,
        {
          Label: label,
          Variables: makeEnvArray(),
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setAddingEnv(false);
        toast(res.data.message, { type: "success" });
        getWebenvDetails();
      })
      .catch((err) => {
        setAddingEnv(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  const [deletingEnv, setDeletingEnv] = useState("");
  //Delete env variable
  async function deleteEnvVariable(key) {
    setDeletingEnv(key);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/kube/delete-env`,
        {
          Label: label,
          Variable: key,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setDeletingEnv("");
        toast(res.data.message, { type: "success" });
        getWebenvDetails();
      })
      .catch((err) => {
        setDeletingEnv("");
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  useEffect(() => {
    getWebenvDetails();
  }, []);

  return (
    <div className="dark:bg-slate-800 h-full w-auto max-h-[80vh] overflow-y-scroll">
      <div className="w-full space-y-2">
        <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
          <input type="radio" name="my-accordion-1" checked="checked" />
          <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
            Environment variables
          </div>
          <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
            {/* Buttond */}
            <div className="flex">
              <button
                className="btn btn-sm rounded-none capitalize text-slate-200 dark:text-slate-200"
                onClick={() => {
                  setEnv([...env, { key: "", value: "" }]);
                }}
              >
                Add Environment Variable
              </button>
              <button
                className="btn btn-sm rounded-none capitalize text-slate-200 dark:text-slate-200 ml-2"
                disabled={addingEnv}
                onClick={() => {
                  addEnvVariable();
                }}
              >
                {addingEnv ? "Update..." : "Update"}
              </button>
            </div>

            {/*  */}
            {env.map((value, index) => {
              return (
                <div className="flex mt-2 w-auto" key={index}>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full rounded-sm input-sm dark:bg-slate-900 bg-slate-200 mr-1 placeholder:dark:text-slate-200 placeholder:text-slate-600 dark:text-slate-200 text-slate-600"
                    value={value.key}
                    onChange={(e) => {
                      const list = [...env];
                      list[index].key = e.target.value;
                      setEnv(list);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="input input-bordered w-full rounded-sm input-sm dark:bg-slate-900 bg-slate-200 ml-1 placeholder:dark:text-slate-200 placeholder:text-slate-600 dark:text-slate-200 text-slate-600"
                    value={value.value}
                    onChange={(e) => {
                      const list = [...env];
                      list[index].value = e.target.value;
                      setEnv(list);
                    }}
                  />
                  {/* Remove */}
                  <button
                    className="btn btn-sm rounded-sm no-animation"
                    onClick={() => {
                      const list = [...env];
                      list.splice(index, 1);
                      setEnv(list);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        sstrokelinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
          <input type="radio" name="my-accordion-2" checked="checked" />
          <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
            All Environment Variables
          </div>
          <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
            {/* Harsha */}
            {/* <TemplateLayout /> */}
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
              <div className="w-auto overflow-y-scroll max-h-[65vh] mt-5 hide-scrollbar">
                <div className="overflow-x-auto">
                  <div className="w-full items-start flex max-h-[65vh]">
                    {envDetails && envDetails !== null ? (
                      <table className="table table-sm">
                        {/* head */}
                        <thead>
                          <tr className="dark:bg-slate-900 rounded-sm dark:text-gray-400 text-black bg-white">
                            <th></th>
                            <th>Key Name</th>
                            <th>Value</th>
                            <th>Actions </th>
                          </tr>
                        </thead>
                        <tbody className="mt-5">
                          {envDetails &&
                            envDetails?.map((value, index) => (
                              <tr
                                key={index}
                                className="dark:bg-slate-900 rounded-sm dark:text-gray-400 text-black bg-white"
                              >
                                <th>{index + 1}</th>
                                <td>{value.key}</td>
                                <td>{value.value}</td>
                                <td>
                                  <button
                                    className="btn btn-xs rounded-sm no-animation"
                                    onClick={() => {
                                      deleteEnvVariable(value.key);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-red-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        sstrokelinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="flex justify-center items-center w-full h-[30vh] inset-0">
                        <span className="text-xl">No env variables found</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
