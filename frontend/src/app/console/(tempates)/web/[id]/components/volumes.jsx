import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Volumes({ label }) {
  const [selected, setSelected] = useState("");
  const [selectedVolumeName, setSelectedVolumeName] = useState("");

  //Read Replica
  const [gettingVolumes, setGettingVolumes] = useState(true);
  const [volumes, setVolumes] = useState(null);

  //Get websites details
  async function getVolumes() {
    setGettingVolumes(true);
    await axios
      .get(`/api/site/get-volumes`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGettingVolumes(false);
        setSelected(res.data[0]?._id ?? "");
        setSelectedVolumeName(res.data[0]?.name ?? "");
        setVolumes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setGettingVolumes(false);
       // toast(err.response?.data?.message, { type: "error" });
      });
  }

  const [creatingVolume, setCreatingVolume] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("10");

  //Make Post request to create new volume
  const createVolume = async () => {
    setCreatingVolume(true);
    try {
      await axios
        .post(
          `/api/site/create-volume`,
          {
            name: name,
            label: label,
            size: size,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          getVolumes();
          document.getElementById("new_volume_modal").close();
          //Show tostify
          toast(res.data?.message, { type: "success" });
        })
        .catch((err) => {
          console.log(err);
          toast(err.response?.data?.message, { type: "error" });
        })
        .finally(() => {
          setCreatingVolume(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //Delete
  //Delete Jobs
  const [deleting, setDeleting] = useState(false);

  async function deleteVolume() {
    setDeleting(true);
    await axios
      .delete(
        `/api/site/delete-volume/${selected}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setDeleting(false);
        getVolumes();
        toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setDeleting(false);
        toast(err.response.data.message, { type: "error" });
      });
  }

  //Datas
  const [gettingMountedPath, setGettingMountedPath] = useState(true);
  const [paths, setPaths] = useState(null);

  //Get websites details
  async function getPaths() {
    setGettingMountedPath(true);
    await axios
      .get(
        `/api/site/get-mounted-paths/${label}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setGettingMountedPath(false);
        setPaths(res.data);
      })
      .catch((err) => {
        setGettingMountedPath(false);
        // toast(err.response?.data?.message, { type: "error" });
      });
  }

  //Make Post request to mount path
  const [path, setPath] = useState("");
  const [mountingPath, setMountingPath] = useState(false);

  const mountPath = async () => {
    setMountingPath(true);
    try {
      await axios
        .post(
          `/api/site/mount-path`,
          {
            volume: selected,
            volume_name: selectedVolumeName,
            path: path,
            label: label,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          getPaths();
          //Show tostify
          toast(res.data?.message, { type: "success" });
        })
        .catch((err) => {
          console.log(err);
          toast(err.response?.data?.message, { type: "error" });
        })
        .finally(() => {
          setMountingPath(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //Delete Mounted Path
  const [deletingpath, setDeletingPath] = useState("");

  async function deletePath(id) {
    setDeletingPath(id);
    await axios
      .delete(
        `/api/site/unmount-volume/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setDeletingPath("");
        getPaths();
        toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setDeletingPath("");
        toast(err.response.data.message, { type: "error" });
      });
  }

  // Onresize
  useEffect(() => {
    getVolumes();
    getPaths();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-auto w-auto relative">
      {/* <TemplateLayout /> */}
      <div className="h-auto inset-0 relative max-h-[73vh]">
        <div className="w-auto relative h-full max-h-[73vh]">
          <div className="join join-vertical w-full rounded-none space-y-2">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Create or bind new volume
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className="flex justify-between">
                  {/* Disk List */}
                  <div className="form-control w-full max-w-xs">
                    <select
                      className="select select-sm rounded-sm select-bordered input input-sm dark:bg-slate-800 bg-slate-100"
                      onChange={(e) => {
                        setSelected(e.target.value);
                      }}
                      value={selected}
                      defaultValue=""
                    >
                      <option disabled value="">
                        Select Volume
                      </option>
                      {volumes &&
                        volumes.map((item, index) => (
                          <option
                            key={index}
                            value={item._id}
                            onClick={() => setSelectedVolumeName(item.name)}
                          >
                            {item.name} ({item.size}GB)
                          </option>
                        ))}
                    </select>

                    <label className="label space-x-5 justify-start flex">
                      <span
                        className="label-text-alt underline cursor-pointer text-slate-800 dark:text-slate-200"
                        onClick={() => {
                          document
                            .getElementById("new_volume_modal")
                            .showModal();
                        }}
                      >
                        Create New
                      </span>
                      {/* Delete selected volume */}
                      <span
                        className="label-text-alt underline cursor-pointer text-red-500"
                        onClick={deleteVolume}
                        disabled={deleting}
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </span>
                    </label>
                  </div>
                  {/* Bind Path */}
                  <div className="form-control w-full mx-5">
                    <input
                      placeholder="/var/www/html"
                      value={path}
                      onChange={(e) => setPath(e.target.value)}
                      className="input input-bordered input-sm rounded-none dark:bg-slate-800 bg-slate-100"
                    />
                  </div>
                  {/* Button */}
                  <button
                    className="btn btn-sm rounded-sm capitalize"
                    onClick={mountPath}
                  >
                    {mountingPath === true ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-2" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Mounted Paths
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                {gettingMountedPath === true ? (
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
                    {paths &&
                      paths.map((item, index) => (
                        <p
                          key={index}
                          className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1 font-light flex justify-between"
                        >
                          <div>
                            <span className="font-bold">
                              {item?.volume_name ?? "NoN"}:
                            </span>{" "}
                            {item?.path ?? "NoN"}
                          </div>
                          <button
                            className="btn btn-xs btn-error rounded-none no-animation capitalize"
                            onClick={() => {
                              deletePath(item?._id);
                            }}
                            disabled={deletingpath === item?._id ? true : false}
                          >
                            {deletingpath === item?._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Volume Popup */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="new_volume_modal" className="modal">
        <div className="modal-box rounded-none bg-white dark:bg-slate-800">
          <h3 className="font-bold text-lg dark:text-gray-400 text-black">
            Create New Volume
          </h3>
          <label className="label">
            <span className="label-text-alt">Volume Name</span>
          </label>
          <input
            type="text"
            className="input w-full input-sm rounded-none bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="Volume Name"
          />
          <label className="label mt-2">
            <span className="label-text-alt">Size</span>
          </label>
          <input
            type="text"
            className="input w-full input-sm rounded-none bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
            onChange={(e) => {
              setSize(e.target.value);
            }}
            value={size}
            placeholder="Size in GB"
          />
          <div className="modal-action">
            <form method="dialog" className="flex items-center space-x-1">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn rounded-none btn-sm no-animation btn-info justify-start capitalize">
                Close
              </button>
              <button
                className="btn rounded-none btn-sm no-animation btn-sucess justify-start disabled:bg-slate-600 capitalize"
                onClick={() => {
                  createVolume();
                }}
                disabled={creatingVolume ? true : false}
              >
                {creatingVolume ? "Creating..." : "Create"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
