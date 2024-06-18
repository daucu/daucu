import VSEditor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dockerfile() {
  //Get Dockerfile
  const [getting, setGetting] = useState(false);
  const [dockerfiles, setDockerfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function getDockerfile() {
    setGetting(true);
    try {
      await axios
        .get(`/api/devops/get-dockerfiles`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setDockerfiles(response.data);
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

  //Create Dockerfile
  const [data, setData] = useState(`# Use the official NGINX base image
  FROM nginx:latest
  
  # Set the default HTML content
  RUN echo '<!DOCTYPE html>' > /usr/share/nginx/html/index.html && \
      echo '<html lang="en">' >> /usr/share/nginx/html/index.html && \
      echo '  <head>' >> /usr/share/nginx/html/index.html && \
      echo '    <meta charset="UTF-8">' >> /usr/share/nginx/html/index.html && \
      echo '    <meta name="viewport" content="width=device-width, initial-scale=1.0">' >> /usr/share/nginx/html/index.html && \
      echo '    <title>Welcome to My Dockerized NGINX Server</title>' >> /usr/share/nginx/html/index.html && \
      echo '  </head>' >> /usr/share/nginx/html/index.html && \
      echo '  <body>' >> /usr/share/nginx/html/index.html && \
      echo '    <h1>Hello from NGINX Docker Container!</h1>' >> /usr/share/nginx/html/index.html && \
      echo '    <p>This is a simple HTML page served by NGINX in a Docker container.</p>' >> /usr/share/nginx/html/index.html && \
      echo '  </body>' >> /usr/share/nginx/html/index.html && \
      echo '</html>' >> /usr/share/nginx/html/index.html
  
  # Expose port 80
  EXPOSE 80
  
  # Start NGINX when the container runs
  CMD ["nginx", "-g", "daemon off;"]  
  `);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  async function createDockerfile() {
    setCreating(true);
    try {
      await axios
        .post(
          `/api/devops/create-dockerfile`,
          {
            name: name,
            value: data,
          },
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getDockerfile();
          setShowModal(false);
          setCreating(false);
          //show toast
          toast(response.data, {
            type: "success",
          });
        })
        .catch((error) => {
          setCreating(false);
          toast(error?.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setCreating(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  //Delete Dockerfile
  const [deleting, setDeleting] = useState("");

  async function deleteDockerfile(id) {
    setDeleting(id);
    try {
      await axios
        .delete(`/api/devops/delete-dockerfile/${id}`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setDeleting("");
          getDockerfile();
          toast(response?.data?.message, {
            type: "success",
          });
        })
        .catch((error) => {
          setDeleting("");
          toast(error.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setDeleting("");
        toast(error?.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  const [creatingProject, setCreatingProject] = useState("");

  async function createProject(id) {
    setCreatingProject(id);
    try {
      await axios
        .post(
          `/api/devops/create-project-from-dockerfile`,
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
          setCreatingProject("");
          //show toast
          toast("Project created successfully", {
            type: "success",
          });
        })
        .catch((error) => {
          setCreatingProject("");
          toast(error?.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setCreatingProject("");
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  //Show update project dilog
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [updatedValue, setUpdatedValue] = useState(updateData?.value);

  async function updateDockerfile() {
    setUpdating(true);
    try {
      await axios
        .patch(
          `/api/devops/update-dockerfile`,
          {
            id: updateData._id,
            name: updateData?.name,
            value: updatedValue,
          },
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setUpdating(false);
          setShowUpdateModal(false);
          getDockerfile();
          toast(response?.data?.message, {
            type: "success",
          });
        })
        .catch((error) => {
          setUpdating(false);
          toast(error?.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setUpdating(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  useEffect(() => {
    setData(localStorage.getItem("dockerfile_date"));
    getDockerfile();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 w-auto relative h-[80vh] overflow-y-scroll">
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
          Dockerfile
        </div>
        <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
          <div className="flex justify-end">
            <button
              className="btn btn-sm rounded-md no-animation"
              onClick={() => setShowModal(true)}
            >
              Create Dockerfile
            </button>
          </div>
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
            <div>
              {dockerfiles === undefined ||
              dockerfiles?.length === 0 ||
              dockerfiles === null ? (
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-4 underline">
                      No Dockerfile Found
                    </h1>
                    <p className="text-gray-600 mb-4">
                      It looks like you haven't created any dockerfile yet.
                    </p>
                    <button className="btn btn-sm no-animation rounded-sm flex items-center bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
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
                      Create New Dockerfile
                    </button>
                  </div>
                </div>
              ) : (
                <table className="table table-sm">
                  <thead>
                    <tr className="dark:bg-slate-900 rounded-sm bg-white dark:text-gray-400 text-black">
                      <th>Version</th>
                      <th>Name</th>
                      <th>Label</th>
                      <th>Updated AT</th>
                      <th>Created AT</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="mt-5 dark:text-gray-400 text-black">
                    {dockerfiles &&
                      dockerfiles?.map((item, index) => (
                        <tr
                          key={index}
                          className="dark:bg-slate-900 rounded-sm bg-white"
                        >
                          <td className="text-blue-500 hover:underline cursor-pointer font-bold">
                            #{item?.version}
                          </td>
                          <td>{item?.name}</td>
                          <td>{item?.label}</td>
                          <td> {item?.updatedAt}</td>
                          <td> {item?.createdAt}</td>
                          <td className="flex space-x-1">
                            <button
                              className="btn btn-xs rounded-[5px] capitalize"
                              onClick={() => {
                                setUpdateData(item);
                                setShowUpdateModal(true);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-xs rounded-[5px] capitalize"
                              onClick={() => {
                                createProject(item._id);
                              }}
                              disabled={creatingProject === item._id}
                            >
                              {creatingProject === item._id
                                ? "Creating..."
                                : "Create Project"}
                            </button>
                            <button
                              className="btn btn-xs rounded-[5px] capitalize btn-error"
                              disabled={deleting === item?._id}
                              onClick={() => {
                                deleteDockerfile(item?._id);
                              }}
                            >
                              {deleting === item._id ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modle */}
      <dialog
        id="my_modal_2"
        className={`modal rounded-none ${showModal ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-7xl rounded-none dark:bg-slate-700 bg-slate-100"
        >
          <h3 className="font-bold text-lg dark:text-gray-400 text-black">
            Create a new Dockerfile
          </h3>
          <div className="py-4">
            {/* Name */}
            <label className="block">
              <span className="text-gray-700 dark:text-slate-400">Name*</span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-white dark:bg-slate-800 text-black dark:text-white"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {/* Editor */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">Editor*</span>
              <VSEditor
                className="w-auto h-[40vh] rounded-md "
                language="dockerfile"
                defaultValue={data}
                onChange={(e) => {
                  localStorage.setItem("dockerfile_date", e);
                  setData(e);
                }}
                value={data}
              />
            </label>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-sm rounded-[5px] capitalize"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="btn btn-sm rounded-[5px] btn-success capitalize"
              onClick={() => createDockerfile()}
              disabled={creating}
            >
              {"Create Dockerfile"}
            </button>
          </div>
        </form>
      </dialog>

      {/* Update Dockerfile Dilog */}
      <dialog
        id="my_modal_4"
        className={`modal rounded-none ${showUpdateModal ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-7xl rounded-none dark:bg-slate-700 bg-slate-100"
        >
          <h3 className="font-bold text-lg dark:text-gray-400 text-black">
            Update Dockerfile
          </h3>
          <div className="py-4">
            {/* Name */}
            <label className="block">
              <span className="text-gray-700 dark:text-slate-400">Name*</span>
              <input
                type="text"
                className="input input-sm input-bordered mt-1 block w-full rounded-none bg-white dark:bg-slate-800 text-black dark:text-white"
                placeholder="Enter name"
                value={updateData?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {/* Editor */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">Editor*</span>
              <VSEditor
                className="w-auto h-[40vh] rounded-md "
                language="dockerfile"
                defaultValue={updateData?.value}
                onChange={(e) => {
                  setUpdatedValue(e);
                }}
                value={updateData?.value}
              />
            </label>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-sm rounded-[5px] capitalize"
              onClick={() => setShowUpdateModal(false)}
            >
              Close
            </button>
            <button
              className="btn btn-sm rounded-[5px] btn-success capitalize"
              onClick={() => updateDockerfile()}
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Dockerfile"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
