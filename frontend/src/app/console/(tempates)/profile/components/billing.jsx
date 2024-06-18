import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Billing() {
  const [getting, setGetting] = useState(false);
  const [datas, setDatas] = useState([]);

  const [selectedFilesCount, setSelectedFilesCount] = useState(0);

  async function getFiles() {
    setGetting(true);
    try {
      await axios
        .get(`/api/devops/get-files`, {
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
          `/api/devops/upload-file`,
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
          `/api/devops/delete-file/${id}/${label}`,
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
          `/api/devops/create-project-from-file`,
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
        `/api/devops/update-file/${updateData?._id}`,
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
          Billing History
        </div>
        <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
          <div className="flex justify-end">
            <button
              className="btn btn-sm btn-success rounded-sm"
              onClick={() => {
                // Goto payment page new tab
              }}
            >
              Make Payment
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
                  <th>Version</th>
                  <th>Description</th>
                  <th>Invoice</th>
                  <th>Payment Method</th>
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
                      <td>{item?.label}</td>
                      <td>{item?.updatedAt}</td>
                      <td>{item?.createdAt}</td>
                      <td className="flex space-x-1">
                        <button
                          className="btn btn-xs rounded-[5px] capitalize"
                          disabled={creatingProject}
                          onClick={() => {
                            createProject(item._id);
                          }}
                        >
                          Print Invoice
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
