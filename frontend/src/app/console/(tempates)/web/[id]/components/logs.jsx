"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as React from "react";
// import { LazyLog } from "react-lazylog";
// const LazyLog = React.lazy(() => import('react-lazylog'));
import dynamic from "next/dynamic";
import Line from "react-lazylog/build/Line";

// Line.defaultProps.style = {
//   color: 'green'
// };

const LazyLog = dynamic(
  () => import("react-lazylog").then((mod) => mod.LazyLog),
  {
    ssr: false,
  }
);

export default function Logs({ label }) {
  const [gettingDetails, setGettingDetails] = useState(true);
  const [siteDetails, setSiteDetails] = useState([]);

  //Get websites details
  async function getWebsiteDetails() {
    setGettingDetails(true);
    await axios
      .get(`/api/kube/get-logs/${label}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGettingDetails(false);
        setSiteDetails(res.data);
        // console.log(res.data);
        // toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        setGettingDetails(false);
        setSiteDetails(err?.response?.data?.message);
        setSiteDetails(err?.response?.data);
        // toast(err.response?.data?.message, { type: "error" });
      });
  }

  // Onresize
  useEffect(() => {
    getWebsiteDetails();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-full w-auto relative">
      {/* <TemplateLayout /> */}
      <div className="h-full overflow-y-scroll inset-0 relative bottom-0">
        <div className="w-auto relative h-full">
          {/* <pre>{JSON.stringify(siteDetails, null, 2)}</pre> */}
          <div className="join join-vertical w-full h-full rounded-none">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 h-full">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Logs
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black h-full">
                <div className="h-full">
                  {gettingDetails ? (
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
                    <div className="h-full">
                      <LazyLog
                        extraLines={1}
                        enableSearch
                        text={siteDetails ?? "No Logs Found"}
                        selectableLines
                        caseInsensitive
                        scrollToLine={-1}
                        onError={(err) => {
                          console.log(err);
                        }}
                        follow
                        style={{
                          overflowY: "hidden", // Hide vertical scrollbar
                          overflowX: "scroll", // Display horizontal scrollbar if needed
                          backgroundColor: "#222222", // Change the background color
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
