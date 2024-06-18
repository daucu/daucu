"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
          },
        }
      );

      setTimeout(() => {
        router.push(`/console/overview`, {
          scroll: false,
        });
      }, 2000);
      setTimeout(() => {
        setLoading(false);
        toast(response.data.message, {
          type: "success",
        });
      }, 1000);

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);

        toast(error?.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  return (
    <section className="bg-gray-50 bg-no-repeat bg-cover dark:bg-gray-900 bg-[url('/pexels-lukas-1420709.jpg')]">
      <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto md:h-screen lg:py-0 backdrop-blur-md bg-white/10">
        <a
          href="#"
          className="flex items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className=""
            src="https://logo.daucu.com/daucu-cloud-favicon-white.png"
            alt="logo"
            width={100}
            height={100}
          />
        </a>
        <div className="w-full bg-white rounded shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded block w-full dark:placeholder-gray-400 dark:text-black dark:placeholder:text-black input"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded block w-full dark:placeholder-gray-400 dark:text-black dark:placeholder:text-black input"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 input dark:text-slate-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className={`w-full rounded-md text-sm px-5 py-2.5 text-center btn no-animation disabled:bg-slate-900`}
              >
                <span
                  className={`${loading ? "loading loading-spinner" : ""}`}
                ></span>
                {loading ? "Loading" : "Login"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
