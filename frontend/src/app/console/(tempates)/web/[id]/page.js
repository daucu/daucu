"use client";

import { useEffect, useState } from "react";
import Information from "./components/information";
import Deployment from "./components/deployment";
import Notes from "./components/notes";
import Env from "./components/env";
import Analytics from "./components/analytics";
import Logs from "./components/logs";
import Corn from "./components/corn";
import Volumes from "./components/volumes";
import Settings from "./components/settings";
import Scale from "./components/scale";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page(id) {
  const label = id.params.id;

  const router = useRouter();

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState(currentTab || "information");

  let content;

  switch (selectedTab) {
    case "information":
      content = <Information label={label} />;
      break;
    case "deployment":
      content = <Deployment label={label} />;
      break;
    case "notes":
      content = <Notes label={label} />;
      break;
    case "env":
      content = <Env label={label} />;
      break;
    case "analytics":
      content = <Analytics label={label} />;
      break;
    case "scale":
      content = <Scale label={label} />;
      break;
    case "logs":
      content = <Logs label={label} />;
      break;
    case "corn":
      content = <Corn label={label} />;
      break;
    case "volumes":
      content = <Volumes label={label} />;
      break;
    case "settings":
      content = <Settings label={label} />;
      break;
    default:
      content = <Information label={label} />;
      break;
  }

  const [pause, setPause] = useState(false);

  const [gettingDetails, setGettingDetails] = useState(true);
  const [siteDetails, setSiteDetails] = useState(null);
  //Get websites details
  async function getWebsiteDetails() {
    setGettingDetails(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/kube/get-sites/${label}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGettingDetails(false);
        setSiteDetails(res.data);
        console.log(res.data);
        // toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        setGettingDetails(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  const [deleting, setDeleting] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  //Delete site function
  async function deleteSiteFunction() {
    setDeleting(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/kube/delete-site`,
        {
          label: label,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setDeleting(false);
        console.log(res.data);
        router.push(`/console/web`, {
          scroll: true,
        });
        toast(res.data.message, { type: "success" });
        document.getElementById("my_modal_delete").close();
      })
      .catch((err) => {
        console.log(err);
        setDeleting(false);
        console.log(err);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  //Redeploy
  const [redeployModal, setRedeployModal] = useState(false);
  const [redeploying, setRedeploying] = useState(false);

  useEffect(() => {
    getWebsiteDetails();
  }, []);

  useEffect(() => {
    if (currentTab) {
      setSelectedTab(currentTab);
    }
  }, [currentTab]);

  useEffect(() => {
    if (!currentTab) {
      router.push(`/console/web/${label}?tab=information`);
    }
  }, []);

  return (
    <div className="flex w-auto flex-col h-auto absolute inset-0 bottom-2 top-2 ml-2 mr-2 dark:bg-slate-900">
      <blockquote className="bg-white border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-900 relative h-full">
        {gettingDetails !== true ? (
          <div className="relative dark:bg-slate-900 p-2 h-full flex flex-col">
            {/* Heading */}
            <div className="flex flex-col justify-between items-start h-[50px]">
              <h1 className="text-xl font-bold dark:text-gray-400 text-black capitalize">
                {siteDetails && siteDetails?.site?.name}
              </h1>
              <span className="text dark:text-gray-400 text-black text-xs">
                {siteDetails && siteDetails?.site?.description}
              </span>
            </div>
            <div className="w-full relative mt-3 justify-between flex h-full space-x-2 overflow-x-scroll">
              <div className="h-full col-span-1 flex flex-col">
                <div className="items-center justify-center flex w-full">
                  {/* Image of Website */}
                  <div className="dark:bg-slate-800 border-blue-600 bg-slate-200 min-w-[200px] h-full p-5 rounded-xs flex justify-center items-center border-t-[5px] dark:border-gray-500">
                    <div className="max-w-[200px] max-h-[200px] dark:bg-slate-800 bg-slate-200 p-5 rounded-xs relative overflow-hidden">
                      <img
                        src={siteDetails?.site?.icon}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  {/* Action */}
                  <div className="dark:bg-slate-800 bg-slate-200 min-w-[200px] border-blue-600 ml-2 p-5 rounded-xs h-full flex flex-col border-t-[5px] dark:border-gray-500">
                    <button
                      className=" btn rounded-[3px] btn-sm no-animation mt-1 btn-ghost justify-start capitalize dark:text-gray-400 text-black"
                      onClick={() => {
                        window.open(
                          `http://${siteDetails?.site?.label}.daucu.site`,
                          "_blank"
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="22"
                        viewBox="0 -960 960 960"
                        width="22"
                        fill="currentColor"
                        className="bi bi-box-arrow-in-up-right"
                      >
                        <path d="M376-178q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm34-240h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Zm200 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm234 0h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 10-.5 20t-1.5 20h-81q2-10 2.5-19.5t.5-20.5q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480v20.5q0 9.5-1 19.5h-80q1-10 1-19.5V-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400h134v80H404q12 44 31 83t45 75q11-16 21-32.5t19-33.5v146q-10 1-19.5 1.5T480-80Zm318-25L680-223v89h-80v-226h226v80h-90l118 118-56 57Z" />
                      </svg>
                      Visit
                    </button>
                    <button className=" btn rounded-[3px] btn-sm no-animation mt-1 btn-ghost justify-start capitalize dark:text-gray-400 text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor"
                        className="bi bi-box-arrow-in-up-right"
                      >
                        <path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z" />
                      </svg>
                      Favroute
                    </button>
                    <button
                      className=" btn rounded-[3px] btn-sm no-animation mt-1 btn-ghost justify-start capitalize dark:text-gray-400 text-black"
                      onClick={() => {
                        document
                          .getElementById("my_modal_redeploy")
                          .showModal();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor"
                        className="bi bi-box-arrow-in-up-right"
                      >
                        <path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z" />
                      </svg>
                      Redeploy
                    </button>
                    <button
                      className=" btn rounded-[3px] btn-sm no-animation mt-1 btn-ghost justify-start capitalize dark:text-gray-400 text-black"
                      onClick={() => {
                        setPause(!pause);
                      }}
                    >
                      {pause !== true ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                          fill="currentColor"
                        >
                          <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                          fill="currentColor"
                        >
                          <path d="M240-240v-480h80v480h-80Zm160 0 400-240-400-240v480Zm80-141v-198l165 99-165 99Zm0-99Z" />
                        </svg>
                      )}
                      {pause ? "Resume" : "Pause"}
                    </button>
                    <button
                      className="btn rounded-none btn-sm no-animation mt-1 btn-ghost justify-start capitalize outline-dashed outline-[2px] outline-red-600 dark:text-gray-400 text-black"
                      onClick={() => {
                        document.getElementById("my_modal_delete").showModal();
                        setShowDeletePopup(true);
                      }}
                      disabled={deleting}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                      {deleting ? "Terminating..." : "Terminate"}
                    </button>

                    {/* Delete modle */}
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id="my_modal_delete" className="modal">
                      <div className="modal-box rounded-none bg-white dark:bg-slate-800">
                        <h3 className="font-bold text-lg dark:text-gray-400 text-black">
                          Are you sure you want to delete this website?
                        </h3>
                        <p className="py-4 dark:text-gray-400 text-black">
                          This action cannot be undone. This will permanently
                        </p>
                        <input
                          type="text"
                          className="input w-full input-sm rounded-none bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                          onChange={(e) => {
                            setConfirmDelete(e.target.value);
                          }}
                          placeholder="Type delete to confirm"
                          value={confirmDelete}
                        />
                        <div className="modal-action">
                          <form
                            method="dialog"
                            className="flex items-center space-x-1"
                          >
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn rounded-none btn-sm no-animation btn-info justify-start capitalize">
                              Close
                            </button>
                            <button
                              className="btn rounded-none btn-sm no-animation btn-error justify-start disabled:bg-slate-600 capitalize"
                              onClick={() => {
                                deleteSiteFunction();
                              }}
                              disabled={deleting || confirmDelete != "delete"}
                            >
                              {deleting ? "Deleting..." : "Delete"}
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    {/* Redeploy modle */}
                    <dialog id="my_modal_redeploy" className="modal">
                      <div className="modal-box rounded-none bg-white dark:bg-slate-800">
                        <h3 className="font-bold text-lg dark:text-gray-400 text-black">
                          Are you sure you want to redeploy this website?
                        </h3>
                        <p className="py-4 dark:text-gray-400 text-black">
                          This action will pull the latest image from desired
                          repository and deploy it with existing configuration.
                          This will not affect your data.
                        </p>
                        <div className="modal-action">
                          <form
                            method="dialog"
                            className="flex items-center space-x-1"
                          >
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn rounded-none btn-sm no-animation justify-start">
                              Close
                            </button>
                            <button
                              className="btn rounded-none btn-sm no-animation btn-info justify-start"
                              onClick={() => {
                                deleteSiteFunction();
                              }}
                            >
                              Redeploy
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
                {/* Left Bottom */}
                <div className="dark:bg-slate-800 bg-slate-200 border-blue-600 mt-2 mr-2 border-t-[5px] dark:border-gray-500 rounded-xs h-full w-full">
                  <ul className="menu rounded-xs">
                    <li className="menu-title dark:text-gray-400 text-black">
                      Dashboard
                    </li>{" "}
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "information"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("information");
                        router.push(`/console/web/${label}?tab=information`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-info-circle mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                      General Information
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "deployment"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("deployment");
                        router.push(`/console/web/${label}?tab=deployment`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 -960 960 960"
                        width="20"
                        fill="currentColor"
                        className="bi bi-box-arrow-in-up-right mr-2"
                      >
                        <path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z" />
                      </svg>
                      All Deployment
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "analytics"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("analytics");
                        router.push(`/console/web/${label}?tab=analytics`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-bar-chart mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
                      </svg>
                      Analytics
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "notes"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("notes");
                        router.push(`/console/web/${label}?tab=notes`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-file-earmark-ppt mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7 5.5a1 1 0 0 0-1 1V13a.5.5 0 0 0 1 0v-2h1.188a2.75 2.75 0 0 0 0-5.5H7zM8.188 10H7V6.5h1.188a1.75 1.75 0 1 1 0 3.5z" />
                        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                      </svg>
                      Notes
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "env"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("env");
                        router.push(`/console/web/${label}?tab=env`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-filetype-key mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.21 11.85h-.87L.83 13.64H.79v-1.79H0v3.999h.791v-1.283l.41-.466 1.12 1.749h.951l-1.488-2.276 1.427-1.723Zm2.903 3.352h-1.79v-1.073h1.685v-.606H4.323v-1.025h1.79v-.648H3.538v3.999h2.575v-.647Zm2.243-.888v1.535h-.794v-1.52L6.223 11.85H7.1l.853 1.696h.032l.855-1.696h.856l-1.339 2.464Z"
                        />
                      </svg>
                      Environment variables
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "scale"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("scale");
                        router.push(`/console/web/${label}?tab=scale`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-diagram-3 mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                        />
                      </svg>
                      Plans And Replication
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "logs"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("logs");
                        router.push(`/console/web/${label}?tab=logs`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-card-text mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                      </svg>
                      Logs
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "corn"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("corn");
                        router.push(`/console/web/${label}?tab=corn`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-clock-history mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                      </svg>
                      Cron Job
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "volumes"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("volumes");
                        router.push(`/console/web/${label}?tab=volumes`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-hdd-rack mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm2 7a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                        <path d="M2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v2H2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1V7h1a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm0 7v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-3-4v2H4V7h8z" />
                      </svg>
                      Persistent Volumes
                    </button>
                    <button
                      className={`rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ${
                        selectedTab == "settings"
                          ? "border-l-4 border-blue-600 border"
                          : "border-l-4 border-transparent border"
                      }`}
                      onClick={() => {
                        // setSelectedMenu("settings");
                        router.push(`/console/web/${label}?tab=settings`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-nut mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="m11.42 2 3.428 6-3.428 6H4.58L1.152 8 4.58 2h6.84zM4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1H4.58z" />
                        <path d="M6.848 5.933a2.5 2.5 0 1 0 2.5 4.33 2.5 2.5 0 0 0-2.5-4.33zm-1.78 3.915a3.5 3.5 0 1 1 6.061-3.5 3.5 3.5 0 0 1-6.062 3.5z" />
                      </svg>
                      Settings
                    </button>
                    {/* </div> */}
                  </ul>
                </div>
              </div>

              {/* Details */}
              <div className="dark:bg-slate-800 bg-slate-200 border-blue-600 w-full h-auto relative p-2 rounded-xs border-t-[5px] dark:border-gray-500 col-span-3">
                {content}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="skeleton h-4 bg-slate-400 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="skeleton h-4 bg-slate-400 rounded"></div>
                  <div className="skeleton h-4 bg-slate-400 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </blockquote>
    </div>
  );
}
