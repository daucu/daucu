"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LazyLog = dynamic(
  () => import("react-lazylog").then((mod) => mod.LazyLog),
  {
    ssr: false,
  }
);

export default function Page() {
  const searchParams = useSearchParams();

  const ProjectID = searchParams.get("ProjectID");

  const router = useRouter();

  const [name, setName] = useState("Project Name");
  const [label, setLabel] = useState("");
  const [port, setPort] = useState(80);
  const [runtime, setRuntime] = useState("static");
  const [version, setVersion] = useState("18.06");
  const [projectV, setProjectV] = useState("");
  const [framework, setFramework] = useState("");
  const [installCommand, setInstallCommand] = useState("");
  const [startCommand, setStartCommand] = useState("");
  const [buildCommand, setBuildCommand] = useState("");
  const [icon, setIcon] = useState("");

  //Convert port string to number
  const newport = parseInt(port);

  const [allversions, setAllVersions] = useState([]); // ["8.0", "7.4", "7.3", "7.2", "7.1", "7.0", "5.6"]
  const [allFrameworks, setAllFrameworks] = useState([]); // ["8.0", "7.4", "7.3", "7.2", "7.1", "7.0", "5.6"
  const [startCommands, setStartCommands] = useState([]); // ["8.0", "7.4", "7.3", "7.2", "7.1", "7.0", "5.6"

  // Get Accounts
  const [gettingProject, setGettingProject] = useState([]);
  const [project, setProject] = useState([]);
  async function getAccounts() {
    setGettingProject(true);
    try {
      await axios
        .get(
          `/api/devops/project-details/${ProjectID}`,
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setProject(response.data);
          setName(response?.data?.name);
          setLabel(response?.data?.label);
          setPort(response?.data?.target_port);
          setRuntime(response?.data?.runtime);
          setProjectV(response?.data?.project_version);
          setIcon(response?.data?.icon);
          setFramework(response?.data?.framework);
          setInstallCommand(response?.data?.install_command);
          setBuildCommand(response?.data?.build_command);
          setStartCommand(response?.data?.start_command);
          setGettingProject(false);
          toast(response?.data?.message, {
            type: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          setGettingProject(false);
          toast(error?.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setGettingProject(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  const [deployingProject, setDeployingProject] = useState(false);

  async function Deploy() {
    setDeployingProject(true);

    await axios
      .post(
        `/api/devops/build-project`,
        {
          project_id: ProjectID,
          name: name,
          label: label,
          target_port: newport,
          runtime: runtime,
          version: version,
          framework: framework,
          start_command: startCommand,
          build_command: buildCommand,
          install_command: installCommand,
          icon: icon,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setDeployingProject(false);
        toast(res?.data?.message, { type: "success" });
        // router.push(`/dashboard/web`, {
        //   scroll: true,
        // });
      })
      .catch((err) => {
        console.log(err);
        setDeployingProject(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  //Re Deploy Project
  const [redeployingProject, setReDeployingProject] = useState(false);

  async function ReDeploy() {
    setReDeployingProject(true);

    await axios
      .post(
        `/api/devops/rebuild-project`,
        {
          project_id: ProjectID,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setReDeployingProject(false);
        toast(res?.data?.message, { type: "success" });
        // router.push(`/dashboard/web`, {
        //   scroll: true,
        // });
      })
      .catch((err) => {
        console.log(err);
        setReDeployingProject(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  useEffect(() => {
    if (runtime == "static") {
      setAllVersions([]);
    } else if (runtime == "php") {
      setAllVersions(["8.0", "7.4"]);
    } else if (runtime == "nodejs") {
      setAllVersions(["16.0", "15.0", "14.0"]);
    } else if (runtime == "deno") {
      setAllVersions(["1.10", "1.9"]);
    } else if (runtime == "bun") {
      setAllVersions(["1.0"]);
    } else if (runtime == "python") {
      setAllVersions(["3.9", "3.8"]);
    } else if (runtime == "java") {
      setAllVersions(["16", "15", "14"]);
    } else if (runtime == "c-sharp") {
      setAllVersions(["5.0"]);
    } else if (runtime == "go") {
      setAllVersions(["1.16", "1.15", "1.14"]);
    } else if (runtime == "rust") {
      setAllVersions([
        "1.51",
        "1.50",
        "1.49",
        "1.48",
        "1.47",
        "1.46",
        "1.45",
        "1.44",
      ]);
    } else if (runtime == "dart") {
      setAllVersions(["2.12", "2.11", "2.10", "2.9"]);
    } else if (runtime == "kotlin") {
      setAllVersions(["1.5", "1.4"]);
    } else if (runtime == "lua") {
      setAllVersions(["5.4", "5.3"]);
    } else if (runtime == "perl") {
      setAllVersions(["5.34", "5.32", "5.30", "5.28"]);
    } else if (runtime == "cpp") {
      setAllVersions(["17", "14", "11", "10"]);
    }

    // All Frameworks
    if (runtime == "static") {
      setAllFrameworks([]);
    } else if (runtime == "php") {
      setAllFrameworks(["laravel", "symfony", "codeigniter", "cakephp"]);
    } else if (runtime == "nodejs") {
      setAllFrameworks([
        "expressjs",
        "nextjs",
        "nuxtjs",
        "gatsby",
        "svelte",
        "reactjs",
        "vue",
        "angular",
        "ember",
        "meteor",
        "preact",
        "sapper",
        "stencil",
      ]);
    } else if (runtime == "deno") {
      setAllFrameworks(["oak", "abc", "deno"]);
    } else if (runtime == "bun") {
      setAllFrameworks(["bun"]);
    } else if (runtime == "python") {
      setAllFrameworks(["django", "flask", "fastapi"]);
    } else if (runtime == "java") {
      setAllFrameworks(["spring", "struts", "play"]);
    } else if (runtime == "c-sharp") {
      setAllFrameworks(["asp.net", "blazor", "nancy"]);
    } else if (runtime == "go") {
      setAllFrameworks(["gin", "beego", "echo"]);
    } else if (runtime == "rust") {
      setAllFrameworks(["actix", "rocket", "nickel"]);
    } else if (runtime == "dart") {
      setAllFrameworks(["aqueduct", "angel", "shelf"]);
    } else if (runtime == "kotlin") {
      setAllFrameworks(["ktor", "javalin", "spark"]);
    } else if (runtime == "lua") {
      setAllFrameworks(["lapis", "sailor", "orion"]);
    } else if (runtime == "perl") {
      setAllFrameworks(["dancer", "mojolicious", "catalyst"]);
    } else if (runtime == "cpp") {
      setAllFrameworks(["poco", "cppcms", "wt"]);
    }

    // Start Commands
    if (runtime == "static") {
      setStartCommands([]);
    } else if (runtime == "php") {
      setStartCommands(["php index.php"]);
    } else if (runtime == "nodejs") {
      setStartCommands(["node index.js"]);
    } else if (runtime == "deno") {
      setStartCommands(["deno run index.js"]);
    } else if (runtime == "bun") {
      setStartCommands(["bun run"]);
    } else if (runtime == "python") {
      setStartCommands(["python main.py"]);
    } else if (runtime == "java") {
      setStartCommands(["java -jar app.jar"]);
    } else if (runtime == "c-sharp") {
      setStartCommands(["dotnet run"]);
    } else if (runtime == "go") {
      setStartCommands(["go build main.go && ./main"]);
    } else if (runtime == "rust") {
      setStartCommands(["cargo run"]);
    } else if (runtime == "dart") {
      setStartCommands(["dart run"]);
    } else if (runtime == "kotlin") {
      setStartCommands(["kotlin run"]);
    } else if (runtime == "lua") {
      setStartCommands(["lua run"]);
    } else if (runtime == "perl") {
      setStartCommands(["perl run"]);
    } else if (runtime == "cpp") {
      setStartCommands(["cpp run"]);
    }
  }, [runtime]);

  const [packagesList, setPackagesList] = useState([
    {
      id: "sqllite",
      name: "SQL lite",
      selected: false,
    },
    {
      id: "bash",
      name: "bash",
      selected: false,
    },
    {
      id: "nginx",
      name: "nginx",
      selected: false,
    },
    {
      id: "docker",
      name: "docker",
      selected: false,
    },
    {
      id: "git",
      name: "git",
      selected: false,
    },
    {
      id: "vim",
      name: "vim",
      selected: false,
    },
    {
      id: "mariadb",
      name: "mariadb",
      selected: false,
    },
    {
      id: "ffmpeg",
      name: "ffmpeg",
      selected: false,
    },
    {
      id: "openssl",
      name: "openssl",
      selected: false,
    },
    {
      id: "zip",
      name: "zip",
      selected: false,
    },
    {
      id: "nano",
      name: "nano",
      selected: false,
    },
  ]);

  const handleCheckboxChange = (index) => {
    if (index >= 0 && index < packagesList.length) {
      const updatedPackagesList = [...packagesList];
      updatedPackagesList[index].selected =
        !updatedPackagesList[index].selected;
      setPackagesList(updatedPackagesList);
    }
  };

  //Websocket connection
  const [logs, setLogs] = useState([]);

  const websocketUrl = `wss://api.daucu.com/api/site/logs-realtime/${label}/${label}`; // Replace with your specific WebSocket URL

  useEffect(() => {
    const websocket = new WebSocket(websocketUrl);

    websocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    websocket.onmessage = (event) => {
      console.log(event.data);
      // Update logs when new message is received
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, [label]); // Dependency on websocketUrl ensures reconnection when it changes

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div>
      <div className="flex w-auto flex-col h-auto absolute inset-0 p-2 dark:bg-slate-900">
        <blockquote className="bg-white border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-900 relative h-full">
          <div className="h-full relative dark:bg-slate-900 p-2 flex flex-col justify-between">
            <div className="h-full">
              {gettingProject ? (
                <div>
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
              ) : (
                <div className="flex w-auto h-full flex-col">
                  <div className="h-full dark:bg-slate-900 inset-x-0 bottom-10">
                    {/* Heading */}
                    <div className="grid grid-cols-5 gap-4 h-full">
                      {/* Menu  */}
                      <div className="dark:bg-slate-800 border-t-[5px] bg-slate-200 dark:border-gray-500 rounded-none border-blue-600 col-span-1 min-w-[100px] h-auto overflow-y-scroll relative">
                        <ul className="menu rounded-md h-auto relative">
                          {/* <li className="menu-title dark:text-gray-400 text-black">
                          Build Options
                        </li> */}
                          {/* Project Name */}
                          <span className="text-xs dark:text-gray-400 text-black mt-2">
                            Name
                          </span>
                          <input
                            type="text"
                            placeholder="Project Name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            className="input w-full rounded-none input-sm input-bordered mt-1 dark:bg-gray-900 bg-white dark:text-gray-400 text-black"
                          />
                          {/* Select Language */}
                          <span className="mt-4 text-xs dark:text-gray-400 text-black">
                            Runtime
                          </span>
                          <select
                            className="select select-sm select-bordered w-full rounded-none input-sm active mt-1 bg-white dark:bg-gray-900 dark:text-gray-400 text-black"
                            value={runtime}
                            onChange={(e) => {
                              setRuntime(e.target.value);
                            }}
                          >
                            <option value="static">Static</option>
                            <option value="php">PHP</option>
                            <option value="nodejs">Node JS</option>
                            <option value="deno">Deno</option>
                            {/* Bun JS */}
                            <option value="bun">bun JS</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                            <option value="c-sharp">C#</option>
                            <option value="go">GO</option>
                            <option value="rust">Rust</option>
                            <option value="dart">Dart</option>
                            <option value="kotlin">Kotlin</option>
                            <option value="lua">Lua</option>
                            <option value="perl">Perl</option>
                            <option value="cpp">C++</option>
                          </select>
                          <div className="flex mt-2 h-auto space-x-2">
                            <div className="w-[50%]">
                              {/* Select Version */}
                              <span className="mt-4 text-xs dark:text-gray-400 text-black">
                                Runtime Version
                              </span>
                              <select
                                className="select select-sm select-bordered w-full rounded-none input-sm active mt-1 bg-white dark:bg-slate-900 dark:text-gray-400 text-black"
                                onChange={(e) => {
                                  setVersion(e.target.value);
                                }}
                                value={version}
                                // disabled={allversions.length == 0}
                              >
                                <option>None</option>
                                {allversions.map((version) => (
                                  <option key={version} value={version}>
                                    {version}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* Expose Port */}
                            <div className="w-[50%]">
                              <span className="mt-4 text-xs dark:text-gray-400 text-black">
                                Target Port
                              </span>
                              <input
                                type="number"
                                placeholder="80"
                                value={port}
                                onChange={(e) => {
                                  setPort(e.target.value);
                                }}
                                className="input w-full rounded-none input-sm input-bordered mt-1 dark:bg-gray-900 bg-white dark:text-gray-400 text-black"
                              />
                            </div>
                          </div>

                          {/* Select Framework */}
                          <span className="mt-4 text-xs dark:text-gray-400 text-black">
                            Framework
                          </span>
                          <select
                            className="select select-sm select-bordered w-full rounded-none input-sm active mt-1 bg-white dark:bg-slate-900 dark:text-gray-400 text-black"
                            onChange={(e) => {
                              setFramework(e.target.value);
                            }}
                            value={framework}
                            // disabled={allFrameworks.length == 0}
                          >
                            <option>None</option>
                            {allFrameworks.map((framework) => (
                              <option key={framework} value={framework}>
                                {framework}
                              </option>
                            ))}
                          </select>
                          {/* Install Command */}
                          <span className="mt-4 text-xs dark:text-gray-400 text-black">
                            Install Command
                          </span>
                          <input
                            placeholder="Install Command"
                            value={installCommand}
                            onChange={(e) => {
                              setInstallCommand(e.target.value);
                            }}
                            // disabled={startCommands.length == 0}
                            className="input input-sm w-full rounded-none mt-1 dark:bg-gray-900 bg-white dark:text-gray-400 text-black"
                          />

                          {/* Install Command */}
                          <span className="mt-4 text-xs dark:text-gray-400 text-black">
                            Build Command
                          </span>
                          <input
                            placeholder="Build Command"
                            value={buildCommand}
                            onChange={(e) => {
                              setBuildCommand(e.target.value);
                            }}
                            // disabled={startCommands.length == 0}
                            className="input input-sm w-full rounded-none mt-1 dark:bg-gray-900 bg-white dark:text-gray-400 text-black"
                          />

                          {/* Start Command */}
                          <span className="mt-4 text-xs dark:text-gray-400 text-black">
                            Start Command
                          </span>
                          <input
                            placeholder="Start Command"
                            value={startCommand}
                            onChange={(e) => {
                              setStartCommand(e.target.value);
                            }}
                            // disabled={startCommands.length == 0}
                            className="input input-sm w-full rounded-none mt-1 dark:bg-gray-900 bg-white dark:text-gray-400 text-black"
                          />

                          {/* Packages */}
                          <span className="mt-4 text-xs dark:text-gray-400 text-black">
                            Packages
                          </span>

                          <div
                            id="dropdownSearch"
                            className="z-10 bg-white h-[300px] rounded-none relative overflow-y-scroll w-full dark:bg-gray-700 mt-2"
                          >
                            <div className="p-3">
                              <label
                                for="input-group-search"
                                className="sr-only"
                              >
                                Search
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="input-group-search"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input input-sm rounded-none"
                                  placeholder="Search packages"
                                />
                              </div>
                            </div>
                            <ul
                              className="h-auto relative px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownSearchButton"
                            >
                              {packagesList &&
                                packagesList.map((item, index) => {
                                  return (
                                    <label className="cursor-pointer label justify-start flex space-x-4">
                                      <input
                                        type="checkbox"
                                        checked={item.selected}
                                        onChange={() =>
                                          handleCheckboxChange(index)
                                        }
                                        className="checkbox checkbox-success checkbox-sm rounded-[5px]"
                                      />
                                      <span className="label-text text-slate-800 dark:text-slate-200">
                                        {item.name}
                                      </span>
                                    </label>
                                  );
                                })}
                            </ul>
                          </div>
                        </ul>
                      </div>
                      {/* Information Area */}
                      <div className="dark:bg-slate-800 bg-slate-200 border-blue-600 w-full h-auto p-2 rounded-none border-t-[5px] dark:border-gray-500 col-span-4">
                        <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
                          <input
                            type="radio"
                            name="my-accordion-1"
                            checked="checked"
                          />
                          <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                            Name: {name}
                          </div>
                          <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                            <div className="flex space-x-4 w-full">
                              <div className="flex justify-between w-full">
                                <div className="flex flex-col">
                                  <span>
                                    Project Version:{" "}
                                    <span className="text-blue-500 hover:underline cursor-pointer font-bold">
                                      #{projectV}
                                    </span>
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    className="btn btn-sm disabled:bg-slate-600 disabled:text-slate-200 rounded-md capitalize"
                                    disabled={redeployingProject}
                                    onClick={() => {
                                      ReDeploy();
                                    }}
                                  >
                                    {redeployingProject
                                      ? "Redeploying..."
                                      : "Redeploy"}
                                  </button>
                                  {/* Deployment */}
                                  <div className="join">
                                    <select className="select join-item select-sm select-success bg-success text-black rounded-md">
                                      <option selected>Daucu Cloud Run</option>
                                    </select>
                                    <div className="indicator">
                                      {/* <span className="indicator-item badge badge-secondary">
                                        new
                                      </span> */}
                                      <button
                                        className="btn join-item btn-success btn-sm disabled:bg-slate-600 disabled:text-slate-200 rounded-md capitalize"
                                        disabled={deployingProject}
                                        onClick={() => {
                                          Deploy();
                                        }}
                                      >
                                        {deployingProject
                                          ? "Deploying..."
                                          : "Deploy"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Logs Area */}
                        <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
                          <input
                            type="radio"
                            name="my-accordion-2"
                            checked="checked"
                          />
                          <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                            Latest Build Logs
                          </div>
                          <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                            <div className="flex space-x-4 w-full">
                              {/* {content} */}
                              <div className="w-full h-auto min-h-[65vh] mt-2 rounded-none">
                                <LazyLog
                                  // extraLines={1}
                                  enableSearch
                                  selectableLines
                                  text={logs ?? []}
                                  follow
                                  style={{
                                    overflowY: "hidden", // Hide vertical scrollbar
                                    overflowX: "scroll", // Display horizontal scrollbar if needed
                                    backgroundColor: "#222222", // Change the background color
                                    userSelect: "text",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
