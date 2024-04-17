"use client";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: true });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["code"],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function Notes({ label }) {
  const [updating, setUpdating] = useState(false);
  const [value, setValue] = useState("");

  async function updateNotes(e) {
    setUpdating(true);
    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/site/create-notes`,
        {
          label: label,
          Content: value,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setUpdating(false);
        toast(res?.data?.message, { type: "success" });
      })
      .catch((err) => {
        setUpdating(false);
        toast(err?.data?.message, { type: "error" });
      });
  }

  //Get Notes
  const [notes, setNotes] = useState([]);
  const [gettingNotes, setGettingNotes] = useState(true);
  async function getNotes() {
    setGettingNotes(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/site/get-notes/${label}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setNotes(res.data[0]?.content);
        setGettingNotes(false);
      })
      .catch((err) => {
        setGettingNotes(false);
      });
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-full w-auto relative">
      {/* <TemplateLayout /> */}
      <div className=" h-auto overflow-y-scroll inset-0 relative max-h-[78vh]">
        <div className="w-auto relative h-full max-h-[78vh]">
          {/* <pre>{JSON.stringify(siteDetails, null, 2)}</pre> */}

          <div className="join join-vertical w-full rounded-none">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Notes
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className=" w-auto h-full min-h-[58vh]">
                  {gettingNotes ? (
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
                    <ReactQuill
                      modules={modules}
                      formats={formats}
                      // theme="snow"
                      className="h-full relative inset-0 bottom-4 border-0 border-none dark:text-gray-400 text-black"
                      onChange={(e) => {
                        setValue(e);
                      }}
                      defaultValue={notes}
                    />
                  )}
                </div>
                <div className="mt-5">
                  <button
                    className="btn btn-sm rounded-none mt-10"
                    onClick={() => {
                      updateNotes(notes);
                    }}
                    disabled={updating}
                  >
                    {updating ? (
                      <span className="loading loading-spinner w-5 h-5"></span>
                    ) : (
                      <div></div>
                    )}
                    {updating ? "Saving..." : "Save Notes"}
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
