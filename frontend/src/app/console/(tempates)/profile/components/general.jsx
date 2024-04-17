"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function General(params) {
  const router = useRouter();

  const [gettingAccounts, setGettingAccounts] = useState(false);
  const [accounts, setAccounts] = useState(null);
  async function getAccounts() {
    setGettingAccounts(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/profile`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setAccounts(response.data);
          setGettingAccounts(false);
        })
        .catch((error) => {
          setGettingAccounts(false);
          toast(error.response?.data?.message, {
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

  //Get My addresses
  const [gettingAddress, setGettingAddress] = useState(false);
  const [myAddress, setMyAddress] = useState([]);

  async function getAddress() {
    setGettingAddress(true);
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/my-address`, {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setMyAddress(response?.data);
          setGettingAddress(false);
        })
        .catch((error) => {
          setGettingAddress(false);
          toast(error.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setGettingAddress(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  // Add Address
  const [addingAddress, setAddingAddress] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

  async function addAddress() {
    setAddingAddress(true);
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/add-address`,
          {
            company_name: company,
            country: country,
            state: state,
            city: city,
            address: address,
            zip_code: zipCode,
          },
          {
            headers: {
              "Content-Type": "application/json", // Set JSON content type header
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setAccounts(response.data);
          setAddingAddress(false);
          getAddress();
        })
        .catch((error) => {
          setAddingAddress(false);
          toast(error.response?.data?.message, {
            type: "error",
          });
        });
    } catch (error) {
      setTimeout(() => {
        setAddingAddress(false);
        toast(error.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  //Delete Address
  const [deleteAddressID, setDeleteAddressID] = useState(null);

  async function deleteAddress(id) {
    setDeleteAddressID(id);
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/remove-address/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        toast(res.data.message, { type: "success" });
        setDeleteAddressID("");
        getAddress();
      })
      .catch((err) => {
        setDeleteAddressID("");
        toast(err.response.data.message, { type: "error" });
      });
  }

  useEffect(() => {
    getAccounts();
    getAddress();
  }, []);

  return (
    <div className="dark:bg-slate-800 bg-slate-200 w-full relative overflow-y-scroll h-full">
      {/* Model */}
      <dialog
        id="my_modal_4"
        className={`modal rounded-sm ${showModal ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-5xl rounded-sm dark:bg-slate-700 bg-slate-100"
        >
          <h3 className="font-bold text-lg dark:text-gray-400 text-black">
            Create a new address
          </h3>
          <div className="py-4">
            {/* Name */}
            <label className="block">
              <span className="text-gray-700 dark:text-slate-400 text-sm">
                Company Name (Optional)
              </span>
              <input
                type="text"
                className="input input-sm input-bordered bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mt-1 block w-full rounded-none"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
            {/* Country */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400 text-sm">
                Country
              </span>
              <input
                type="text"
                className="input input-sm input-bordered bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mt-1 block w-full rounded-none"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            {/* State */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400 text-sm">
                State / Province
              </span>
              <input
                type="text"
                className="input input-sm input-bordered bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mt-1 block w-full rounded-none"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            <div className="flex space-x-2">
              {/* City */}
              <label className="block mt-5 w-full">
                <span className="text-gray-700 dark:text-slate-400 text-sm">
                  City
                </span>
                <input
                  type="text"
                  className="input input-sm input-bordered bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mt-1 block w-full rounded-none"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              {/* Region */}
              <label className="block mt-5 w-full">
                <span className="text-gray-700 dark:text-slate-400 text-sm">
                  Pin Code / Zip Code
                </span>
                <input
                  type="Zip Code"
                  className="input input-sm input-bordered bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mt-1 block w-full rounded-none"
                  placeholder="Enter disk name"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </label>
            </div>
            {/* Size */}
            <label className="block mt-5">
              <span className="text-gray-700 dark:text-slate-400 text-sm">
                Street address
              </span>
              <textarea
                type="address"
                className="textarea textarea-sm textarea-bordered bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mt-1 block w-full rounded-none"
                placeholder="Street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-sm rounded-sm"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="btn btn-sm rounded-sm btn-success"
              onClick={() => {
                addAddress();
              }}
              disabled={addingAddress}
            >
              {addingAddress ? "Adding Address..." : "Add Address"}
            </button>
          </div>
        </form>
      </dialog>
      <div className="flex w-auto h-full flex-col relative">
        <blockquote className="dark:border-gray-500 dark:bg-gray-800 inset-0 bottom-0 absolute">
          <div className="h-auto space-y-2 relative">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Account
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className="mt-2">
                  {gettingAccounts ? (
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-slate-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-400 rounded"></div>
                          <div className="h-4 bg-slate-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="max-h-[65vh]">
                      <div className="p-2 text-slate-900 dark:text-slate-200 dark:border-gray-500 border-l-2 border-blue-600">
                        <span className="font-bold">Full Name:</span>{" "}
                        {accounts?.fullname ?? "NoN"}
                      </div>
                      <div className="p-2 border-l-2 border-blue-600 dark:border-gray-500 text-slate-900 dark:text-slate-200 mt-2">
                        <span className="font-bold">Email:</span>{" "}
                        {accounts?.email ?? "NoN"}
                      </div>
                      <div className="p-2 border-l-2 border-blue-600 dark:border-gray-500 text-slate-900 dark:text-slate-200 mt-2">
                        <span className="font-bold">Phone:</span>{" "}
                        {accounts?.phone ?? "NoN"}
                      </div>
                      <div className="p-2 border-l-2 border-blue-600 dark:border-gray-500 text-slate-900 dark:text-slate-200 mt-2">
                        <span className="font-bold">Username:</span>{" "}
                        {accounts?.username ?? "NoN"}
                      </div>
                      <div className="p-2 border-l-2 border-blue-600 dark:border-gray-500 text-slate-900 dark:text-slate-200 mt-2">
                        <span className="font-bold">Country:</span>{" "}
                        {accounts?.country ?? "NoN"}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex w-full justify-start mt-5">
                  <button
                    className="btn rounded-none btn-sm btn-wide mt-5 outline-dashed outline-black dark:outline-white outline-[2px] no-animation disabled:bg-slate-500 disabled:text-white"
                    // onClick={() => setShowModal(true)}
                  >
                    Update info
                  </button>
                </div>
              </div>
            </div>
            {/* Account Information  */}
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
              <input type="radio" name="my-accordion-2" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Address
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className="">
                  {gettingAddress ? (
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-slate-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-400 rounded"></div>
                          <div className="h-4 bg-slate-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <table className="table">
                      <tbody className="rounded-md mt-2 space-y-2">
                        {/* row 2 */}
                        {myAddress &&
                          myAddress.map((item, index) => (
                            <tr
                              key={index}
                              className="border dark:border-gray-800 rounded-lg"
                            >
                              <td>
                                <div className="flex items-center space-x-3">
                                  <div className="avatar">
                                    <div className="mask mask-squircle w-8 h-8 items-center flex justify-center text-center bg-slate-500 p-2">
                                      <div>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="#ffffff"
                                          class="bi bi-building"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                                          <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold text-black dark:text-slate-200">
                                      Office
                                    </div>
                                    <div className="text-sm text-black dark:text-slate-200">
                                      {item?.address}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-black dark:text-slate-200">
                                Country:
                                <br />
                                <span className="text-black dark:text-slate-200">
                                  {item?.country}
                                </span>
                              </td>
                              <td className="text-black dark:text-slate-200">
                                State:
                                <br />
                                <span className="text-black dark:text-slate-200">
                                  {item?.state}
                                </span>
                              </td>
                              <td className="text-black dark:text-slate-200">
                                City:
                                <br />
                                <span className="text-black dark:text-slate-200">
                                  {item?.city}
                                </span>
                              </td>
                              <td className="text-black dark:text-slate-200">
                                Zip Code:
                                <br />
                                <span className="text-black dark:text-slate-200">
                                  {item?.zip_code}
                                </span>
                              </td>
                              <th>
                                <button
                                  className="btn rounded-none btn-xs outline-dashed outline-black btn-error dark:outline-white outline-[1px] no-animation disabled:bg-slate-500 disabled:text-white"
                                  disabled={deleteAddressID === item._id}
                                  onClick={() => {
                                    deleteAddress(item?._id);
                                  }}
                                >
                                  {deleteAddressID === item._id
                                    ? "Removing..."
                                    : "Remove"}
                                </button>
                              </th>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Add Address Button */}
                <div className="flex w-full justify-start mt-5">
                  <button
                    className="btn rounded-none btn-sm btn-wide mt-5 outline-dashed outline-black dark:outline-white outline-[2px] no-animation disabled:bg-slate-500 disabled:text-white"
                    onClick={() => setShowModal(true)}
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </div>
            {/* Delete account */}
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none">
              <input type="radio" name="my-accordion-3" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Delete Account
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className="mt-2">
                  {gettingAccounts ? (
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-slate-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-400 rounded"></div>
                          <div className="h-4 bg-slate-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="max-h-[65vh]">
                      {/* Delete account */}
                      <button className="btn rounded-none btn-sm btn-wide btn-error mt-5 outline-dashed outline-black dark:outline-white outline-[2px] no-animation disabled:bg-slate-500 disabled:text-white">
                        <span className="font-bold">Delete Account</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
