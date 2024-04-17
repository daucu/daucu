export default function Page(params) {
  return (
    <div>
      <div className="flex w-auto h-full flex-col">
        <blockquote className="bg-gray-100 border-l-[5px] border-gray-600 dark:border-gray-500 dark:bg-gray-800 mt-2">
          <div className="h-[90vh] dark:bg-slate-900 p-3">
            {/* Top Header Area */}
            <div className="w-full flex justify-between items-center">
              <h1 className="text-2xl font-bold">Billing</h1>
              <button className="btn btn-sm btn-success rounded-none no-animation">
                Make a Payment
              </button>
            </div>

            {/* Billing info */}
            <div className="mt-5 w-full h-[40vh]">
              <ul className="menu w-56 rounded-none bg-slate-700">
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Item 2
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
                    Item 1
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Item 3
                  </a>
                </li>
              </ul>
            </div>

            {/* Billing history */}
            <div className="mt-5 h-[60vh] overflow-y-scroll hide-scrollbar p-2">
              <span className="">Billing & Payment History</span>
              <div className="overflow-x-auto mt-5">
                <table className="table table-md">
                  {/* head */}
                  <thead>
                    <tr className="bg-slate-800">
                      <th>Count</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr className="bg-slate-700">
                      <th>1</th>
                      <td>Invoice #24395205</td>
                      <td>2023-08-01 04:19</td>
                      <td>$50</td>
                      <td>Paypal</td>
                      <td className="underline cursor-pointer">
                        Download Invoice
                      </td>
                    </tr>
                    {/* row 2 */}
                    <tr className="bg-slate-700">
                      <th>1</th>
                      <td>Invoice #24395205</td>
                      <td>2023-08-01 04:19</td>
                      <td>$50</td>
                      <td>Paypal</td>
                      <td className="underline cursor-pointer">
                        Download Invoice
                      </td>
                    </tr>
                    {/* row 3 */}
                    <tr className="bg-slate-700">
                      <th>1</th>
                      <td>Invoice #24395205</td>
                      <td>2023-08-01 04:19</td>
                      <td>$50</td>
                      <td>Paypal</td>
                      <td className="underline cursor-pointer">
                        Download Invoice
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
