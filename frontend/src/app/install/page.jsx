"use client";
import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

export default function Install() {
    const navigate = useRouter();

    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [fullname, setFullname] = React.useState("");

    async function createFirstUser() {
        setLoading(true);
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
            Username: username,
            Password: password,
            Email: email,
            Fullname: fullname,
        }).then((response) => {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            setTimeout(() => {
                toast(response.data.message, {
                    type: "success",
                });
            }, 1000);
            setTimeout(() => {
                navigate.push("/ui");
            }, 2000);
        }).catch((error) => {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            setTimeout(() => {
                toast(error.response.data.message, {
                    type: "error",
                });
            }, 1000);
        });
    }

    return (
        <div>
            <div className="w-full h-screen justify-center flex text-center align-center">
                <div className="hero bg-base-200 max-w-[400px] max-h-[50vh] mt-[10vh]">
                    {/* Form */}
                    <div className="bg-slate-100 h-full w-full p-8 flex flex-col justify-center text-start">
                        {/* Top Banner */}
                        <div className="h-auto w-full bg-slate-800 flex flex-col justify-center mb-5">
                            <h1 className="text-white text-xl h-[50px] align-middle flex justify-center items-center uppercase">
                                Create your first account
                            </h1>
                        </div>

                        {/* Full Name */}
                        <div className="flex flex-col">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-slate-900">
                                        What is your full name?
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="input input-bordered w-full rounded-none input-sm"
                                    onChange={(e) => {
                                        setFullname(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="flex flex-col mt-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-slate-900">
                                        What is your username?
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="input input-bordered w-full rounded-none input-sm"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="flex flex-col mt-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-slate-900">
                                        What is your email?
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="input input-bordered w-full rounded-none input-sm"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col mt-4">
                            {/* <label className="text-slate-500">Password</label>
                        <input className="block p-2 mb-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} /> */}
                            <div className="flex flex-col">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-slate-900">
                                            What is your password?
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="input input-bordered w-full rounded-none input-sm"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Login Button */}
                        <div className="flex flex-col mt-8">
                            <button
                                className={`bg-slate-900 h-10 w-full p-2 outline-none border text-white font-bold disabled:bg-slate-400 btn rounded-none btn-sm ${loading ? "loading" : ""
                            }`}
                                onClick={() => {
                                    createFirstUser();
                                }}
                            >
                                {loading ? "Loading..." : "Create"}
                            </button>
                        </div>


                        {/*Policy*/}
                        <div className="mt-2">
                            <p className="underline cursor-pointer text-slate-900">
                                Our Terms & Conditions
                            </p>
                        </div>

                        {/*Policy*/}
                        <div className="mt-2">
                            <p className="underline cursor-pointer text-slate-900">About US</p>
                        </div>

                        {/*Policy*/}
                        <div className="mt-8 flex justify-center">
                            <p className="underline cursor-pointer text-slate-900">
                                Copyright @DAUQU
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}   