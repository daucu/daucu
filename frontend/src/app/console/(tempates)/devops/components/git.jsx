import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function GitConf({ label }) {
  const [gettingAccounts, setGettingAccounts] = useState(true);
  const [accounts, setAccounts] = useState(null);

  async function getAccounts() {
    setGettingAccounts(true);
    try {
      await axios
        .get(`/api/auth/get-my-apps`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setAccounts(response?.data);
          setFirstAccount(response.data[0]?.installation_id);
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

  //Remove account
  const [removingAccount, setRemovingAccount] = useState("");

  async function removeAccount(installation_id) {
    setRemovingAccount(installation_id);
    try {
      await axios
        .delete(
          `/api/git/delete-app/${installation_id}`,
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          getAccounts();
          setRemovingAccount("");
        })
        .catch((error) => {
          setRemovingAccount("");
          toast(error?.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setRemovingAccount("");
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-full w-auto relative">
      {/* <span className="text-xl font-bold pb-2 dark:text-gray-400 text-black">
        Connect to git provider
      </span> */}
      {/* <TemplateLayout /> */}
      <div className="h-auto overflow-y-scroll inset-0 relative max-h-[73vh]">
        <div className="w-auto relative h-full overflow-y-scroll max-h-[73vh]">
          {/* <pre>{JSON.stringify(siteDetails, null, 2)}</pre> */}

          <div className="join join-vertical w-full rounded-none">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Connect to git provider
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className="flex space-x-4">
                  <button
                    className="btn btn-wide btn-info mt-5 no-animation rounded-md capitalize dark:text-slate-800 text-slate-800 disabled:text-white"
                    onClick={() => {
                    }}
                  >
                    Connect To Github
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-github ml-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-wide mt-5 no-animation disabled:bg-slate-800 rounded-md capitalize dark:btn-info disabled:text-slate-400"
                    disabled
                  >
                    Connect To GitLab
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-gitlab ml-5"
                      viewBox="0 0 16 16"
                    >
                      <path d="m15.734 6.1-.022-.058L13.534.358a.568.568 0 0 0-.563-.356.583.583 0 0 0-.328.122.582.582 0 0 0-.193.294l-1.47 4.499H5.025l-1.47-4.5A.572.572 0 0 0 2.47.358L.289 6.04l-.022.057A4.044 4.044 0 0 0 1.61 10.77l.007.006.02.014 3.318 2.485 1.64 1.242 1 .755a.673.673 0 0 0 .814 0l1-.755 1.64-1.242 3.338-2.5.009-.007a4.046 4.046 0 0 0 1.34-4.668Z" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-wide mt-5 no-animation disabled:bg-slate-800 rounded-md capitalize dark:btn-info disabled:text-slate-400"
                    disabled
                  >
                    Connect To BitBucket
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Bitbucket"
                      role="img"
                      className="w-6 h-6"
                      viewBox="0 0 512 512"
                    >
                      <rect width="512" height="512" rx="15%" fill="#ffffff" />
                      <path
                        fill="#2684ff"
                        d="M422 130a10 10 0 00-9.9-11.7H100.5a10 10 0 00-10 11.7L136 409a10 10 0 009.9 8.4h221c5 0 9.2-3.5 10 -8.4L422 130zM291 316.8h-69.3l-18.7-98h104.8z"
                      />
                      <path
                        fill="url(#a)"
                        d="M59.632 25.2H40.94l-3.1 18.3h-13v18.9H52c1 0 1.7-.7 1.8-1.6l5.8-35.6z"
                        transform="translate(89.8 85) scale(5.3285)"
                      />
                      <linearGradient
                        id="a"
                        x2="1"
                        gradientTransform="rotate(141 22.239 22.239) scale(31.4)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stop-color="#0052cc" />
                        <stop offset="1" stop-color="#2684ff" />
                      </linearGradient>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Connected Accounts
              </div>
              <div className="collapse-content">
                {gettingAccounts !== false ? (
                  <div>
                    <div className="">
                      Getting accounts...{" "}
                      <span className="loading loading-spinner no-animation w-4 h-4"></span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full ">
                    {accounts?.map((account, index) => (
                      <div
                        className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1 flex items-center text-center justify-between"
                        key={index}
                      >
                        <div className="space-x-2 flex ">
                          <img
                            src={account?.response?.account?.avatar_url}
                            className="w-5 h-5 rounded-full mr-1"
                          />
                          <span className="text-md ml-5">
                            {account?.response?.account?.login}
                          </span>
                        </div>
                        <button
                          className="btn-xs btn capitalize btn-link no-animation text-slate-800 dark:text-slate-200"
                          onClick={() => {
                            removeAccount(account?.installation_id);
                          }}
                        >
                          {removingAccount === account?.installation_id ? (
                            <span>
                              Removing...{" "}
                              <span className="loading loading-spinner no-animation w-2 h-2"></span>
                            </span>
                          ) : (
                            <span>Remove</span>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
