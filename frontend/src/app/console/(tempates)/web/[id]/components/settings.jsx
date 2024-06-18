"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Settings({ label }) {
  const [alldomains, setAllDomains] = useState([]); //['domain1', 'domain2'
  const [gettingDomains, setGettingDomains] = useState(false); //['domain1', 'domain2'

  //Get domains
  async function getDomains() {
    setGettingDomains(true);
    axios
      .get(`/api/site/get-domains/${label}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setGettingDomains(false);
        setAllDomains(res?.data);
      })
      .catch((err) => {
        console.log(err);
        setGettingDomains(false);
        // toast.error(err?.message);
        toast.error(err.response?.data?.message);
      });
  }

  //Add New Domain
  const [domain, setDomain] = useState("");
  const [adding, setAdding] = useState(false);

  async function addDomain() {
    setAdding(true);
    axios
      .post(
        `/api/site/add-domain`,
        {
          domain: domain,
          label: label,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setAdding(false);
        getDomains();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
        setAdding(false);
        // toast.error(err?.message);
        toast.error(err.response?.data?.message);
      });
  }

  const [deleting, setDeleting] = useState(""); //['domain1', 'domain2'
  //Delete Domain
  async function deleteDomain(domain) {
    setDeleting(domain);
    axios
      .delete(`/api/site/remove-domain`, {
        data: {
          domain: domain,
          label: label, // Assuming 'label' is defined elsewhere in your code.
        },
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setDeleting("");
        getDomains();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
        setDeleting("");
        // toast.error(err?.message);
        toast.error(err.response?.data?.message);
      });
  }

  useEffect(() => {
    getDomains();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-auto w-auto relative overflow-y-scroll">
      {/* <TemplateLayout /> */}
      <div className="h-auto inset-0 relative max-h-[78vh]">
        <div className="w-full relative h-full max-h-[78vh]">
          {/* <pre>{JSON.stringify(siteDetails, null, 2)}</pre> */}

          <div className="join join-vertical w-full rounded-none space-y-2">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Manage Domains
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className="font-bold flex justify-start items-center">
                  <span>Endpoint: </span>
                  <span className="text-green-600 font-normal ml-2">
                    south-sp-server.dauqu.com
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="bi bi-copy ml-2 cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"
                      />
                    </svg>
                  </span>
                </div>
                {/* Input Field */}
                <input
                  type="text"
                  className="input input-bordered input-sm mb-2 rounded-none dark:bg-slate-800 bg-slate-100 mt-5"
                  placeholder="Enter Domain Name"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
                <button
                  onClick={addDomain}
                  className="btn mt-2 btn-sm rounded-md no-animation w-48 dark:btn-primary disabled:text-slate-600 capitalize"
                  type="button"
                  disabled={adding}
                >
                  {adding ? "Adding..." : "Add Domain"}
                </button>

                <div className="mt-5">
                  <span className="text-base pb-1 dark:text-gray-400 text-black">
                    All Domains
                  </span>
                  <div className="mt-1">
                    {gettingDomains ? (
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
                      <div className="overflow-y-scroll">
                        {alldomains?.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center dark:border-blue-600 border-l-2 border-blue-600 bg-slate-100 mt-2 dark:bg-transparent pl-2 pr-2"
                          >
                            {/* SSL status */}
                            <div className="space-x-4 flex items-center">
                              <div className="flex justify-start items-center space-x-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  class="bi bi-lock-fill fill-green-600"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                                </svg>
                                <span className="text-green-600 text-xs">
                                  Secure Connection
                                </span>
                              </div>
                              <span className="text-xs text-gray-400">|</span>
                              {item.domain ? (
                                <a
                                  className="p-2 cursor-pointer hover:underline text-sm"
                                  href={`http://${item.domain}`}
                                  target="_blank"
                                >
                                  https://{item.domain}
                                </a>
                              ) : null}
                            </div>
                            <button
                              className="btn btn-xs rounded-md no-animation w-48 dark:btn-error disabled:text-slate-600 capitalize"
                              onClick={() => deleteDomain(item.domain)}
                              disabled={deleting === item.domain ? true : false}
                            >
                              {deleting === item.domain
                                ? "Deleting..."
                                : "Delete Domain"}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Deployment Region */}
            <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Automatic Deployments
              </div>
              <div className="collapse-content">
                <div className="form-control">
                  <label className="cursor-pointer label flex justify-start">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="checkbox mr-2 checkbox-success rounded-full"
                    />
                    <span className="label-text text-black dark:text-white">
                      Enable Auto Deployment
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {/* Restart Policy */}
            <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Restart Policy
              </div>
              <div className="collapse-content">
                <div className="flex flex-col justify-start items-start">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-green-400"
                        checked
                      />
                      <span className="label-text ml-5 text-slate-600 dark:text-slate-200">
                        On Failure{" "}
                      </span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-green-400"
                        checked
                      />
                      <span className="label-text ml-5 text-slate-600 dark:text-slate-200">
                        Always
                      </span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-green-400"
                        checked
                      />
                      <span className="label-text ml-5 text-slate-600 dark:text-slate-200">
                        Never
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Collaborators */}
            <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Collaborators
              </div>
              <div className="collapse-content">
                <span>Manage access</span>
                <div className="w-full flex flex-col mt-2">
                  <input
                    className="input input-bordered input-sm mb-2 rounded-none dark:bg-slate-800 bg-slate-100 mt-5"
                    placeholder="info@example.com"
                  />
                  <button className="btn btn-sm rounded-md no-animation w-48 dark:btn-primary disabled:text-slate-600 capitalize mt-2">
                    Add People
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
