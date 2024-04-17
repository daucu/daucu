export default function Information({ label }) {
  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-full w-auto relative">
      {/* <span className="text-xl font-bold pb-2 dark:text-gray-400 text-black">
      Settings 
      </span> */}
      {/* <TemplateLayout /> */}
      <div className="h-auto overflow-y-scroll inset-0 relative">
        <div className="w-auto relative h-auto overflow-y-scroll max-h-[80vh]">
          {/* <pre>{JSON.stringify(siteDetails, null, 2)}</pre> */}

          <div className="join join-vertical w-full rounded-none space-y-2">
            {/* Healthcheck */}
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              {/* Deployment Region */}
              <input type="radio" name="my-accordion-0" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Deployment Region
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <p>
                  Location in the world where this service is going to be
                  deployed
                </p>

                {/*  */}
                <label className="block mt-5">
                  <span className="text-gray-700 dark:text-slate-400 text-sm">
                    Mumbai (Asia)
                  </span>
                  <ul class="grid w-full gap-2 md:grid-cols-5 mt-1">
                    <li>
                      <input
                        type="radio"
                        id="1-minute"
                        name="time"
                        value="1"
                        class="hidden peer"
                        required
                        defaultChecked
                        // onChange={(e) => {
                        //   setSize(e.target.value);
                        // }}
                      />
                      <label
                        for="1-minute"
                        class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                      >
                        <div class="block">
                          <div class="w-full text-base">Mumbai (Asia)</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="5-minute"
                        name="time"
                        value="5"
                        class="hidden peer"
                        // onChange={(e) => {
                        //   setSize(e.target.value);
                        // }}
                      />
                      <label
                        for="5-minute"
                        class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                      >
                        <div class="block">
                          <div class="w-full text-base">Singapore (Asia)</div>
                          {/* <div class="w-full">Good for large websites</div> */}
                        </div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="10-minute"
                        name="time"
                        value="10"
                        class="hidden peer"
                        // onChange={(e) => {
                        //   setSize(e.target.value);
                        // }}
                      />
                      <label
                        for="10-minute"
                        class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                      >
                        <div class="block">
                          <div class="w-full text-base">London (Europe)</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="15-minute"
                        name="time"
                        value="15"
                        class="hidden peer"
                        // onChange={(e) => {
                        //   setSize(e.target.value);
                        // }}
                      />
                      <label
                        for="15-minute"
                        class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                      >
                        <div class="block">
                          <div class="w-full text-base">Frankfurt (Europe)</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="30-minute"
                        name="time"
                        value="30"
                        class="hidden peer"
                        // onChange={(e) => {
                        //   setSize(e.target.value);
                        // }}
                      />
                      <label
                        for="30-minute"
                        class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 dark:border-slate-800 rounded-none cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:bg-slate-800 dark:text-white"
                      >
                        <div class="block">
                          <div class="w-full text-base">
                            New York (North America)
                          </div>
                        </div>
                      </label>
                    </li>
                  </ul>
                </label>
                <div className="flex w-full justify-start mt-5">
                  <button
                    className="btn rounded-none btn-sm btn-wide mt-5 outline-dashed outline-black dark:outline-white outline-[2px] no-animation disabled:bg-slate-500 disabled:text-white"
                    // onClick={() => setShowModal(true)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Healthcheck */}
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Healthcheck Path
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <p>
                  Endpoint to be called before a deploy completes to ensure the
                  new deployment is live.
                </p>

                <label className="block mt-2">
                  <input
                    type="text"
                    className="input input-sm input-bordered block w-full max-w-96 rounded-none bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                    placeholder="/healthcheck"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <div className="flex w-full justify-start mt-5">
                  <button
                    className="btn rounded-none btn-sm btn-wide mt-5 outline-dashed outline-black dark:outline-white outline-[2px] no-animation disabled:bg-slate-500 disabled:text-white"
                    // onClick={() => setShowModal(true)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Cron Job */}
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-2" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Cron Schedule
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <p>Run the service according to the specified cron schedule.</p>

                <label className="block mt-2">
                  <input
                    type="text"
                    className="input input-sm input-bordered block w-full max-w-96 rounded-none bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                    placeholder="0 1 * * *"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <div className="flex w-full justify-start mt-5">
                  <button
                    className="btn rounded-none btn-sm btn-wide mt-5 outline-dashed outline-black dark:outline-white outline-[2px] no-animation disabled:bg-slate-500 disabled:text-white"
                    // onClick={() => setShowModal(true)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Restart Policy */}
            <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Restart Policy
              </div>
              <div className="collapse-content">
                <div className="flex flex-col justify-start items-start">
                  <p>Configure what to do when the process exits.</p>
                  <div className="form-control mt-5">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-green-400"
                        checked
                      />
                      <span className="label-text ml-5 text-slate-600 dark:text-slate-200 flex flex-col">
                        <span className="font-bold dark:text-gray-400 text-black">
                          On Failure:{" "}
                        </span>
                        <span className="dark:text-gray-400 text-black">
                          Restart the container if it stops with an error code.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-green-400"
                        checked
                      />
                      <span className="label-text ml-5 text-slate-600 dark:text-slate-200 flex flex-col">
                        <span className="font-bold dark:text-gray-400 text-black">
                          Always:{" "}
                        </span>
                        <span className="dark:text-gray-400 text-black">
                          {" "}
                          Always restart the container if it stops.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-green-400"
                        checked
                      />
                      <span className="label-text ml-5 text-slate-600 dark:text-slate-200 flex flex-col">
                        <span className="font-bold dark:text-gray-400 text-black">
                          Never:{" "}
                        </span>
                        <span className="dark:text-gray-400 text-black">
                          Never restart the container if it stops. (default)
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex w-full justify-start mt-5">
                  <button
                    className="btn rounded-none btn-sm btn-wide mt-5 outline-dashed outline-black dark:outline-white outline-[2px] no-animation disabled:bg-slate-500 disabled:text-white"
                    // onClick={() => setShowModal(true)}
                  >
                    Update
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
