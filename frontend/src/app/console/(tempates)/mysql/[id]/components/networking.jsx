export default function Networking({ label }) {
  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-full w-auto relative">
      <span className="text-xl font-bold pb-2 dark:text-gray-400 text-black">
        Networking
      </span>
      {/* <TemplateLayout /> */}
      <div className="mt-5 h-auto overflow-y-scroll inset-0 relative max-h-[73vh]">
        <div className="w-auto relative h-full overflow-y-scroll max-h-[73vh]">
          {/* <pre>{JSON.stringify(siteDetails, null, 2)}</pre> */}

          <div className="join join-vertical w-full rounded-none">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black">
                Encrypted connections
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <div className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1 font-light flex justify-between">
                  <span className="font-bold">SSL Connection:</span>{" "}
                  <input type="checkbox" className="toggle rounded-none" />
                </div>
                <div className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1 font-light flex justify-between">
                  <span className="font-bold">Download SSL Certificate:</span>{" "}
                  <button className="btn btn-xs btn-link rounded-none capitalize no-underline no-animation dark:text-white">
                    Download Certificate
                  </button>
                </div>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Firewall rules
              </div>
              <div className="collapse-content">
                <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                  <span className="font-bold">Info:</span> Inbound connections
                  from the IP addresses specified below will be allowed to port
                  5432 on this server.
                </p>
                <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                  <span className="font-light">
                    Connections from the IPs specified below provides access to
                    all the databases in daucu.
                  </span>{" "}
                </p>
                <div className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1">
                  <button className="btn btn-sm rounded-none no-animation capitalize">
                    Add IP Address
                  </button>
                </div>
                <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1 flex justify-between">
                  <span className="font-bold">
                    192.168.45.86{" "}
                    <span className="font-light">(Added on 12/09/2002)</span>
                  </span>
                  <span className="">HarshaWeb Server IP</span>
                </p>
                <p className="p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1 flex justify-between">
                  <span className="font-bold">
                    192.168.45.99{" "}
                    <span className="font-light">(Added on 12/09/2002)</span>
                  </span>
                  <span className="">Daucu Server IP</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
