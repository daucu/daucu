"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function Repositories() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState(null);
  const [totalRepos, setTotalRepos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedtAccount, setSelectedAccount] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  async function getAllRepo(id) {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/get-my-repo`,
          {
            installation_id: id,
            page_number: currentPage.toString(),
          },
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setTotalRepos(response.data?.data?.total_count);
          setRepos(response.data?.data?.repositories);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast(error.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  // Get Accounts
  const [gettingAccounts, setGettingAccounts] = useState(true);
  const [accounts, setAccounts] = useState(null);

  async function getAccounts() {
    setGettingAccounts(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/get-my-apps`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          // getAllRepo(response.data[0]?.installation_id);
          setAccounts(response?.data);
          setSelectedUser(response.data[0]?.response?.account?.login);
          setSelectedAccount(response?.data[0]?.installation_id);
          setGettingAccounts(false);
        })
        .catch((error) => {
          setGettingAccounts(false);
          toast(error?.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setGettingAccounts(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  //Search Repo

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    getAllRepo(selectedtAccount);
  }, [selectedtAccount]);

  const [git_deploying, setGitDeploying] = useState("");
  //
  async function gitDeployment(clone_url, id, name) {
    setGitDeploying(id);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/devops/create-project`,
        {
          name: name,
          context: {
            type: "git",
            context: clone_url,
            username: selectedUser,
            installation_id: selectedtAccount.toString(),
          },
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setGitDeploying("");
        //Navigate to deploy page with ImportedID
        router.push(
          `/console/devops/deploy?ProjectID=${res.data?.ImportedID}`
        );
        toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        setGitDeploying("");
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  async function pagination(page_number) {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/get-my-repo`,
          {
            installation_id: selectedtAccount,
            page_number: page_number.toString(),
          },
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setTotalRepos(response.data?.data?.total_count);
          setRepos(response.data?.data?.repositories);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast(error.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-full w-auto relative">
      {/* <span className="text-xl font-bold pb-2 dark:text-gray-400 text-black">
        Cluster Information
      </span> */}
      {/* <TemplateLayout /> */}
      <div className="h-auto overflow-y-scroll inset-0 relative max-h-full">
        <div className="w-auto relative h-full overflow-y-scroll max-h-full">
          <div className="join join-vertical w-full rounded-none">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Accounts and Repositories
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className="flex justify-between">
                  <div className="w-[50%] flex items-center space-x-2">
                    <input
                      className="input input-sm text-white"
                      placeholder="Search"
                    />
                    <div className="join grid grid-cols-2">
                      <select
                        className="btn btn-sm rounded-md no-animation disabled:bg-slate-400 disabled:text-slate-200"
                        onChange={(e) => {
                          setCurrentPage(e.target.value);
                          pagination(e.target.value);
                        }}
                        value={currentPage}
                      >
                        {/* Show option according to total repo and current page */}
                        {Array.from(
                          { length: Math.ceil(totalRepos / 50) },
                          (_, i) => (
                            <option key={i} value={i + 1}>
                              {/* Showing 0-100 */}
                              {i * 50 + 1} - {/* Showing 100 or total repo */}
                              {i * 50 + 50 > totalRepos
                                ? totalRepos
                                : i * 50 + 50}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col mb-2 w-auto justify-end items-end">
                    {gettingAccounts !== false ? (
                      <div>
                        <button className="btn btn-sm rounded-md no-animation">
                          Getting accounts...{" "}
                          <span className="loading loading-spinner no-animation w-4 h-4"></span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex rounded-xs dark:bg-slate-800 dark:text-gray-400 text-black space-x-2 justify-end items-end">
                        {accounts?.map((account, index) => (
                          <button
                            key={index}
                            value={account?.response?.id}
                            onClick={() => {
                              setCurrentPage(1); // Reset Page
                              setSelectedAccount(account?.installation_id); // Select Account
                            }}
                            className={`btn btn-sm rounded-md flex capitalize justify-start items-center text-left no-animation ${
                              selectedtAccount === account?.installation_id
                                ? "btn-active outline outline-4 outline-green-600"
                                : ""
                            }`}
                          >
                            <img
                              src={account?.response?.account?.avatar_url}
                              className="w-5 h-5 rounded-full mr-1"
                            />
                            {account?.response?.account?.login}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full h-full overflow-x-auto hide-scrollbar mt-5 rounded-sm">
                  {loading !== false ? (
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
                    <div className="w-full items-start flex max-h-[65vh] h-full">
                      {loading !== true && repos?.length !== 0 ? (
                        <table className="table table-sm">
                          <thead>
                            <tr className="dark:bg-slate-900 rounded-sm bg-white dark:text-gray-400 text-black">
                              <th>Name</th>
                              <th>Language</th>
                              <th>Date</th>
                              <th>Visibility</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="mt-5 dark:text-gray-400 text-black">
                            {repos &&
                              repos?.map((repo, index) => (
                                <tr
                                  key={index}
                                  className="dark:bg-slate-900 rounded-sm bg-white"
                                >
                                  <td>
                                    <div className="flex items-center">
                                      <div>
                                        <div className="font-bold">
                                          {repo?.full_name}
                                          <span className="ml-1 rounded-full btn btn-ghost border border-black btn-xs no-animation text-xs capitalize">
                                            {repo?.default_branch}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    {repo?.language ?? "-----"}
                                    <br />
                                  </td>
                                  <td>{moment(repo?.created_at).fromNow()}</td>
                                  <td>
                                    {repo?.private !== false
                                      ? "Private"
                                      : "Public"}
                                  </td>
                                  <th>
                                    <button
                                      className={`btn btn-xs rounded-[5px] no-animation disabled:bg-slate-700 disabled:text-white dark:btn-info capitalize`}
                                      disabled={git_deploying !== ""}
                                      onClick={() => {
                                        gitDeployment(
                                          repo?.clone_url,
                                          repo?.id,
                                          repo?.name
                                        );
                                      }}
                                    >
                                      {git_deploying === repo?.id ? (
                                        <span className="loading loading-spinner no-animation w-4 h-4"></span>
                                      ) : (
                                        <div>
                                          {git_deploying === repo?.id
                                            ? "Creating..."
                                            : "Create Project"}
                                        </div>
                                      )}
                                    </button>
                                  </th>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="flex justify-center items-center w-full h-[50vh] flex-col">
                          <div className=" font-bold text-lg dark:text-gray-400 text-black">
                            No repository found
                          </div>
                          {/* Information */}
                          <div>
                            <div className="text-sm dark:text-gray-400 text-black">
                              You have no repository in this account
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="w-full flex justify-start">
                  {/* pagination */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
