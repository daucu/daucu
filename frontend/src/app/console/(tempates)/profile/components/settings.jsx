import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Settings() {
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
      {/* Chnage Password */}
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black flex flex-col">
          Chnage Password
          <span className="text-sm mt-2">
            When you will chnage password we will send a email to verify your account
            details
          </span>
        </div>
        <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
          <div className="flex space-x-2">
            <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1 w-full justify-between flex">
              <span className="font-bold text-center items-center flex justify-center">
                ******
              </span>{" "}
              <button className="btn btn-sm btn-success rounded-sm">
                Chnage Password{" "}
              </button>
            </p>
          </div>
        </div>
      </div>
      {/* Chnage Email */}
      <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black flex flex-col">
          Chnage Email
          <span className="text-sm mt-2">
            When you will chnage email we will send a email to verify your account
            details
          </span>
        </div>
        <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
          <div className="flex space-x-2">
            <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1 w-full justify-between flex">
              <span className="font-bold text-center items-center flex justify-center">
                info@daucu.com
              </span>{" "}
              <button className="btn btn-sm btn-success rounded-sm">
                Chnage Email{" "}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
