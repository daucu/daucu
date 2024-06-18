"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ThirdParty() {
  const router = useRouter();

  const [git_deploying, setGitDeploying] = useState(false);
  const [clone_url, setClone_url] = useState("");

  async function gitDeployment() {
    setGitDeploying(true);
    await axios
      .post(
        `/api/devops/create-project`,
        {
          context: {
            type: "public_git",
            context: clone_url,
          },
          name: "Text",
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setGitDeploying(false);
        //Navigate to deploy page with ImportedID
        router.push(
          `/console/devops/deploy?ProjectID=${res.data?.ImportedID}`
        );
        toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setGitDeploying(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-full w-full relative">
      <div className="h-auto overflow-y-scroll inset-0 relative max-h-[73vh]">
        <div className="w-auto relative h-full overflow-y-scroll max-h-[73vh]">
          <div className="join join-vertical w-full rounded-none">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Import third-party git repository
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className="flex flex-col items-start justify-start pt-5 pb-6 w-full bg-slate-50 dark:bg-transparent p-5 rounded-md">
                  {/* Icon Area */}
                  <div className="w-full mt-2">
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-offset-base-100 ring-offset-2 p-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
                      </div>
                    </div>
                    <div className="avatar ml-5">
                      <div className="w-10 rounded-full ring ring-offset-base-100 ring-offset-2 p-2">
                        <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/gitlab_original_logo_icon_146503.png" />
                      </div>
                    </div>
                    <div className="avatar ml-5">
                      <div className="w-10 rounded-full ring ring-offset-base-100 ring-offset-2 p-2">
                        <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/44_Bitbucket_logo_logos-512.png" />
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 w-full justify-start mt-5">
                    Enter the URL of a public Git repository to deploy it:
                  </p>
                  <input
                    type="text"
                    value={clone_url}
                    onChange={(e) => {
                      setClone_url(e.target.value);
                    }}
                    placeholder="https://github.com/dauqu/news_backend.git"
                    className="input w-full rounded-sm bg-slate-50 dark:bg-transparent input-bordered border-blue-600"
                  />
                  <button
                    className="mt-5 btn rounded-md btn-wide btn-md dark:btn-info disabled:bg-slate-500 disabled:text-slate-200 no-animation capitalize"
                    disabled={git_deploying}
                    onClick={() => {
                      gitDeployment();
                    }}
                  >
                    {git_deploying !== true ? "Create Project" : "Creating..."}
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
