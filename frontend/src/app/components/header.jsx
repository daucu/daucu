"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeSwitcher from "../themeswitcher";
import axios from "axios";

export default function Header() {
  const [loading, setLoading] = useState(false);

  //Onscroll
  const [scroll, setScroll] = useState(false);

  const [resp, setResp] = useState(false);
  async function checkLogin() {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/auth/check-login`,
        {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
            Authorization: `${localStorage.getItem("token")}`, // Add "Bearer" prefix
          },
        }
      );
      setResp(response.data?.auth);
      localStorage.setItem("isLogged", true);
      console.log(response);
      console.log(localStorage.getItem("token"));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="">
      <div
        className={`navbar px-2 sm:px-2 lg:px-5 md:px-5 xl:px-10 z-50 fixed transition delay-150 ease-in bg-black/90 dark:bg-black/70 backdrop-blur-md shadow-md shadow-slate-400 dark:shadow-slate-800`}
      >
        <div className="navbar-start">
          <img
            src="/logo-no-background.png"
            className="h-9 cursor-pointer"
            onClick={() => {
              
            }}
          />
        </div>
        <div className="navbar-center hidden lg:flex rounded-none">
          <ul className="menu menu-horizontal px-1">
            <li tabIndex={0}>
              <details className="rounded-none">
                <summary>Products</summary>
                <ul className="rounded-none w-auto bg-white">
                  <div className="p-2 bg-slate-200">
                    {/* Description */}
                    <span className="text-black">
                      Discover the next generation cloud services your business
                    </span>
                    <div className="flex mt-2">
                      {/* List First */}
                      <ul className="menu bg-base-200 w-56 rounded-box">
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Cloud Run
                          </a>
                        </li>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Container Registry
                          </a>
                        </li>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Cloud Storage
                          </a>
                        </li>
                      </ul>
                      {/* List First */}
                      <ul className="menu bg-base-200 w-56 rounded-box">
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            MySQL
                          </a>
                        </li>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            PostgreSQL
                          </a>
                        </li>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Redis
                          </a>
                        </li>
                      </ul>
                      {/* List First */}
                      <ul className="menu bg-base-200 w-56 rounded-box">
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            MongoDB
                          </a>
                        </li>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Daucu Scheduler
                          </a>
                        </li>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Daucu DevOps
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ul>
              </details>
            </li>
            <li>
              <Link className="rounded-none" href="pricing">Pricing</Link>
            </li>
            <li>
              <Link className="rounded-none" href="about">About</Link>
            </li>
            <li>
              <Link className="rounded-none" href="blog">Blog</Link>
            </li>
            <li>
              <Link className="rounded-none" href="contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex justify-end items-center md:mr-5">
          {resp != true ? (
            <div className="flex">
              <Link
                href="/login"
                className={`btn btn-xs mr-2 no-animation rounded-md`}
                onClick={() => {
                  setLoading("login");
                }}
              >
                <span
                  className={`${
                    loading == "login" ? "loading loading-spinner w-3 h-3" : ""
                  }`}
                ></span>
                Login
              </Link>
              <Link
                href="/register"
                className={`btn btn-xs mr-2 no-animation rounded-md`}
                onClick={() => {
                  setLoading("register");
                }}
              >
                <span
                  className={`${
                    loading == "register"
                      ? "loading loading-spinner w-3 h-3"
                      : ""
                  }`}
                ></span>
                Register
              </Link>
            </div>
          ) : (
            <div>
              <Link
                href="/console/overview"
                className={`btn btn-xs mr-2 no-animation rounded-md`}
                onClick={() => {
                  setLoading("dashboard");
                }}
              >
                <span
                  className={`${
                    loading == "dashboard"
                      ? "loading loading-spinner w-3 h-3"
                      : ""
                  }`}
                ></span>
                Dashboard
              </Link>
            </div>
          )}
        </div>

        <ThemeSwitcher />
      </div>
    </div>
  );
}