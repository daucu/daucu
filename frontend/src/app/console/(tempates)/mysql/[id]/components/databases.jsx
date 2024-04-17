import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Databases() {
  const [getting, setGetting] = useState(false);
  const [datas, setDatas] = useState([]);

  const [selectedFilesCount, setSelectedFilesCount] = useState(0);

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

  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    // Update the state with the selected file
    setFile(event.target.files[0]);
    // Update the count of selected files
    setSelectedFilesCount(event.target.files.length);
  };

  async function uploadFile() {
    const formData = new FormData();
    formData.append("name", name); // Add JSON data
    formData.append("Files", file); // Add your file to the form data

    setCreating(true);
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/devops/upload-file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set form data content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getFiles();
          setCreating(false);
          //show toast
          toast(response?.data?.message, {
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

  const [showModal, setShowModal] = useState(false);

  //Delete Dockerfile
  const [deleting, setDeleting] = useState("");

  async function deletefile(id, label) {
    setDeleting(id);
    try {
      await axios
        .delete(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/devops/delete-file/${id}/${label}`,
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setDeleting("");
          getFiles();
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

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [updating, setUpdating] = useState(false);

  async function updateFile() {
    console.log("updatefile");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("Files", file);

    setUpdating(true);

    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/devops/update-file/${updateData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        getFiles();
        setUpdating(false);

        // Show success toast
        toast(response.data.message, {
          type: "success",
        });
      })
      .catch((error) => {
        setUpdating(false);
        toast(error.response.data.message, {
          type: "error",
        });
      });
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 w-auto relative h-[80vh] overflow-y-scroll">
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
          Databases
        </div>
        <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
          <div className="flex justify-end">
            <button
              className="btn btn-sm rounded-md no-animation"
              onClick={() => setShowModal(true)}
            >
              Create Database
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
            <table className="table table-sm">
              <thead>
                <tr className="dark:bg-slate-900 rounded-sm bg-white dark:text-gray-400 text-black">
                  <th>Count</th>
                  <th>Name</th>
                  <th>Created AT</th>
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
                        #{item?.version}
                      </td>
                      <td>{item?.name}</td>
                      <td>{item?.createdAt}</td>
                      <td className="flex space-x-1">
                        <button
                          className="btn btn-xs rounded-[5px] capitalize btn-error"
                          disabled={deleting === item._id}
                          onClick={() => {
                            deletefile(item._id, item.label);
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
      </div>

      {/* Modle */}
      <dialog
        id="my_modal_4"
        className={`modal rounded-none ${showModal ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-5xl rounded-none dark:bg-slate-700 bg-slate-100"
        >
          <h3 className="font-bold text-lg dark:text-gray-400 text-black">
            Upload new file
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
            <div className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">
                Upload File* ({selectedFilesCount} selected)
              </span>
              <div className="flex items-center border-slate-800 justify-center w-full mt-2">
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onChange={handleFileChange}
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[40vh] border-2 border-dotted border-slate-300 rounded-sm cursor-pointer bg-white dark:hover-bg-bray-800 dark:bg-slate-900 dark:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:bg-slate-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG, or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
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
              disabled={creating}
              onClick={() => {
                uploadFile();
              }}
            >
              {creating ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </dialog>

      <dialog
        id="my_modal_4"
        className={`modal rounded-none ${showUpdateModal ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-5xl rounded-none dark:bg-slate-700 bg-slate-100"
        >
          <h3 className="font-bold text-lg dark:text-gray-400 text-black">
            Upload file to update project
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
            <div className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400">
                Upload File* ({selectedFilesCount} selected)
              </span>
              <div className="flex items-center border-slate-800 justify-center w-full mt-2">
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onChange={handleFileChange}
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[40vh] border-2 border-dotted border-slate-300 rounded-sm cursor-pointer bg-white dark:hover-bg-bray-800 dark:bg-slate-900 dark:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:bg-slate-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Only zip file allowed{" "}
                      <span className="hover:underline hover:text-blue-500">
                        (check docs for more info)
                      </span>
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
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
              disabled={updating}
              onClick={() => {
                updateFile();
              }}
            >
              {creating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
