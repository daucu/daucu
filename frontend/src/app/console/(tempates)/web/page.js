"use client";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page(params) {
  const router = useRouter();

  const [loadingData, setloadingData] = useState(true);
  const [mySites, setMySites] = useState(null);
  const data = [
    {
      name: "Amazone Clone",
      date: "2021-09-12T18:30:00.000Z",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2048px-Amazon_icon.svg.png",
    },
    {
      name: "Harsha Web",
      date: "2021-09-12T18:30:00.000Z",
      image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
    },
    {
      name: "News Blog",
      date: "2021-09-12T18:30:00.000Z",
      image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
    },
    {
      name: "Golang Web",
      date: "2021-09-12T18:30:00.000Z",
      image:
        "https://static-00.iconduck.com/assets.00/golang-icon-398x512-eygvdisi.png",
    },
    {
      name: "Rust Rocket",
      date: "2021-09-12T18:30:00.000Z",
      image: "https://www.rust-lang.org/logos/rust-logo-512x512.png",
    },
    {
      name: "FastAPI",
      date: "2021-09-12T18:30:00.000Z",
      image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
    },
    {
      name: "Wordpress",
      date: "2021-09-12T18:30:00.000Z",
      image: "https://cdn-icons-png.flaticon.com/512/174/174881.png",
    },
    {
      name: "NextJS",
      date: "2021-09-12T18:30:00.000Z",
      image:
        "https://static-00.iconduck.com/assets.00/next-js-icon-512x512-zuauazrk.png",
    },
    {
      name: "ReactJS",
      date: "2021-09-12T18:30:00.000Z",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
    },
    {
      name: "VueJS",
      date: "2021-09-12T18:30:00.000Z",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png",
    },
    {
      name: "Files Site",
      date: "2021-09-12T18:30:00.000Z",
      image: "https://cdn-icons-png.flaticon.com/512/3767/3767084.png",
    },
    {
      name: "Amazone Clone",
      date: "2021-09-12T18:30:00.000Z",
      image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
    },
    {
      name: "Flutter Backend",
      date: "2021-09-12T18:30:00.000Z",
      image:
        "https://static-00.iconduck.com/assets.00/flutter-icon-1651x2048-ojswpayr.png",
    },
  ];

  async function mySitesFunction() {
    setloadingData(true);
    await axios
      .get(`/api/kube/my-sites`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setloadingData(false);
        const reversedData = res.data;
        setMySites(reversedData);
        toast(res?.data, { type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setloadingData(false);
        console.log(err);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  useEffect(() => {
    mySitesFunction();
  }, []);

  return (
    <div>
      <div className="flex w-auto h-full flex-col bg-white">
        <blockquote className="border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-800">
          <div className="h-auto dark:bg-slate-900 p-2">
            {/* Heading */}
            <div className="flex flex-col justify-between items-start h-[50px]">
              <h1 className="text-xl font-bold dark:text-gray-400 text-black">
                Cloud Run
              </h1>
              <span className="text dark:text-gray-400 text-black text-xs">
                Daucu Cloud Run is a fully managed compute platform that
                automatically scales your stateless containers. Cloud Run is
                serverless: it abstracts away all infrastructure management, so
                you can focus on what matters most — building great
                applications.
              </span>
            </div>
            <div className="w-full mt-5">
              <ul className="">
                {/* Loop */}
                {loadingData != true ? (
                  <div>
                    {mySites && data.length != 0 ? (
                      <div className="grid gap-2 grid-cols-2 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 select-none">
                        {mySites.map((item, index) => (
                          <div
                            key={index}
                            // whileTap={{ scale: 0.9 }}
                            // style={{ x, opacity }}
                            className="inline-flex border-blue-600 justify-between items-center p-3 w-full text-gray-500 cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 border-l-4 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-slate-700 dark:hover:bg-gray-700 bg-slate-200 rounded-sm container z-40"
                            onClick={() => {
                              router.push(`/console/web/${item?.label}`, {
                                scroll: false,
                              });
                            }}
                          >
                            <div className="cursor-pointer flex justify-between text-center items-center overflow-hidden w-full">
                              <img
                                src={item?.icon}
                                alt=""
                                className="h-10 w-10 rounded-md image-full bg-slate-200 p-1 mr-2"
                              />
                              <div className="flex flex-col justify-start w-full items-start text-left">
                                <div className="flex items-center justify-center"></div>
                                <div
                                  className="w-[100%] relative text-lg truncate dark:text-gray-400 text-black"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item?.name}
                                </div>
                                <div
                                  className="w-full text-xs overflow-ellipsis dark:text-gray-400 text-black"
                                  style={{
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    display: "-webkit-box",
                                    overflow: "hidden",
                                  }}
                                >
                                  {item?.createdAt}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center w-full h-[30vh]">
                        {/* No domain found */}
                        <div className="flex flex-col justify-center items-center w-full">
                          Domain not found
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="skeleton h-4 bg-slate-400 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="skeleton h-4 bg-slate-400 rounded"></div>
                        <div className="skeleton h-4 bg-slate-400 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}