import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Security() {
  const [getting, setGetting] = useState(false);
  const [datas, setDatas] = useState([]);

  async function getFiles() {
    setGetting(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/devops/get-files`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setDatas(response.data);
          console.log(response.data);
          setShowModal(false);
          setGetting(false);
        })
        .catch((error) => {
          setGetting(false);
          toast(error.response.data.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setGetting(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  const [showModal, setShowModal] = useState(false);

  const [creatingProject, setCreatingProject] = useState(false);

  async function createProject(id) {
    setCreatingProject(true);
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/devops/create-project-from-file`,
          {
            id: id,
          },
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setCreatingProject(false);
          //show toast
          toast("Project created successfully", {
            type: "success",
          });
        })
        .catch((error) => {
          setCreatingProject(false);
          toast(error?.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setCreatingProject(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 w-auto relative h-[80vh] overflow-y-scroll space-y-2">
      {/* Email Verification */}
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black flex flex-col">
          Two-factor authentication
          <span className="text-sm mt-2">
            Use an authentication app to get a verification code to log into
            your Railway account safely.
          </span>
        </div>
        <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
          <div className="flex space-x-2">
            <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1 w-full justify-between flex">
              <span className="font-bold">Authenticator App</span>{" "}
              <button className="btn btn-sm btn-success rounded-sm">Set up two-factor authentication</button>
            </p>
          </div>
        </div>
      </div>
      {/* Login activity */}
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black flex flex-col">
          Login Activity
          <span className="text-sm mt-2">
            View everything that has access to your account
          </span>
        </div>
        <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
          {getting ? (
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
            <table className="table table-sm">
              <thead>
                <tr className="dark:bg-slate-900 rounded-sm bg-white dark:text-gray-400 text-black">
                  <th>Name</th>
                  <th>Last Active</th>
                  <th>Location</th>
                  <th>IP Address</th>
                  <th>Login AT</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="mt-5 dark:text-gray-400 text-black">
                {datas &&
                  datas?.map((item, index) => (
                    <tr
                      key={index}
                      className="dark:bg-slate-900 rounded-sm bg-white"
                    >
                      <td className="text-blue-500 hover:underline cursor-pointer font-bold">
                        Windows (Chrome )
                      </td>
                      <td>{item?.updatedAt}</td>
                      <td>
                        {/* Country and City */}
                        India <span className="text-gray-400">, </span> Mumbai
                      </td>
                      <td>47.15.212.180</td>
                      <td>{item?.createdAt}</td>
                      <td className="flex space-x-1">
                        <button
                          className="btn btn-xs rounded-[5px] capitalize btn-error"
                          disabled={creatingProject}
                          onClick={() => {
                            createProject(item._id);
                          }}
                        >
                          Terminate Session
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
