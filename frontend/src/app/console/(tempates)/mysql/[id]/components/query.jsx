// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import VSEditor from "@monaco-editor/react";

// export default function Query({ label }) {
//   const [loading, setLoading] = useState(true);
//   const [repos, setRepos] = useState(null);
//   const [theme, setTheme] = useState("vs-dark");

//   async function getAllRepo(id) {
//     setLoading(true);
//     try {
//       await axios
//         .get(`/api/site/import-projects`, {
//           headers: {
//             "Content-Type": "application/json", // Set JSON content type header
//             Authorization: `${localStorage.getItem("token")}`,
//           },
//         })
//         .then((response) => {
//           console.log(response);
//           setRepos(response?.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.log(error);
//           setLoading(false);
//           toast(error.response?.data?.message, {
//             type: "error",
//           });
//         });
//     } catch (error) {
//       setTimeout(() => {
//         setLoading(false);
//         toast(error?.response?.data?.message, {
//           type: "error",
//         });
//       }, 1000);
//     }
//   }

//   useEffect(() => {
//     getAllRepo();
//   }, []);

//   useEffect(() => {
//     if (localStorage.getItem("theme") === "dark") {
//       setTheme("vs-dark");
//     } else {
//       setTheme("light");
//     }
//   }, []);

//   return (
//     <div className="dark:bg-slate-800 h-auto w-full">
//       {/* <TemplateLayout /> */}
//       <span className="text-xl font-bold pb-2 dark:text-gray-400 text-black">
//         Query Executor
//       </span>
//       <div className="mt-3 h-[50vh] overflow-y-scroll hide-scrollbar">
//         {/* <TemplateLayout /> */}
//         <div className="overflow-x-auto">
//           <button className="btn btn-sm rounded-none mb-2 capitalize no-animation">
//             Execute Query
//           </button>
//           <div className="w-full items-start flex max-h-[70vh]">
//             <div className="flex items-center justify-center w-full mt-5 h-[50vh] rounded-md">
//               <VSEditor
//                 className="w-auto h-full rounded-md"
//                 language="sql"
//                 theme={theme}
//                 value={`CREATE TABLE dbo.EmployeePhoto
// (
//     EmployeeId INT NOT NULL PRIMARY KEY,
//     Photo VARBINARY(MAX) FILESTREAM NULL,
//     MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL
//                     UNIQUE DEFAULT NEWID()
// );

// GO

// /*
// text_of_comment
// /* nested comment */
// */

// -- line comment

// CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID
//     ON Production.WorkOrder(ProductID)
//     WITH (FILLFACTOR = 80,
//         PAD_INDEX = ON,
//         DROP_EXISTING = ON);
// GO

// WHILE (SELECT AVG(ListPrice) FROM Production.Product) < $300
// BEGIN
//   UPDATE Production.Product
//       SET ListPrice = ListPrice * 2
//   SELECT MAX(ListPrice) FROM Production.Product
//   IF (SELECT MAX(ListPrice) FROM Production.Product) > $500
//       BREAK
//   ELSE
//       CONTINUE
// END
// PRINT 'Too much for the market to bear';

// MERGE INTO Sales.SalesReason AS [Target]
// USING (VALUES ('Recommendation','Other'), ('Review', 'Marketing'), ('Internet', 'Promotion'))
//       AS [Source] ([NewName], NewReasonType)
// ON [Target].[Name] = [Source].[NewName]
// WHEN MATCHED
// THEN UPDATE SET ReasonType = [Source].NewReasonType
// WHEN NOT MATCHED BY TARGET
// THEN INSERT ([Name], ReasonType) VALUES ([NewName], NewReasonType)
// OUTPUT $action INTO @SummaryOfChanges;

// SELECT ProductID, OrderQty, SUM(LineTotal) AS Total
// FROM Sales.SalesOrderDetail
// WHERE UnitPrice < $5.00
// GROUP BY ProductID, OrderQty
// ORDER BY ProductID, OrderQty
// OPTION (HASH GROUP, FAST 10);
//                 `}
//                 onChange={(e) => {
//                   setFileData(e);
//                   setIsChanged(true);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import VSEditor from "@monaco-editor/react";
import dynamic from "next/dynamic";

const LazyLog = dynamic(
  () => import("react-lazylog").then((mod) => mod.LazyLog),
  {
    ssr: false,
  }
);

export default function Query({ label }) {
  return (
    <div className="dark:bg-slate-800 bg-slate-200 h-full w-auto relative">
      {/* <span className="text-xl font-bold pb-2 dark:text-gray-400 text-black">
        Query Executor
      </span> */}
      {/* <TemplateLayout /> */}
      <div className="h-[76vh] overflow-y-scroll inset-0 relative">
        <div className="w-auto relative h-full overflow-y-scroll">
          {/* <pre>{JSON.stringify(siteDetails, null, 2)}</pre> */}

          <div className="join join-vertical w-full rounded-none">
            <div className="collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div className="collapse-title text-xl font-medium dark:text-gray-400 text-black flex justify-between">
                Write Query Here (SQL)
              </div>
              <div className="collapse-content flex flex-col dark:text-gray-400 text-black">
                <VSEditor
                  className="w-auto rounded-none h-[30vh]"
                  language="sql"
                  theme="vs-dark"
                  value={`
                  CREATE TABLE dbo.EmployeePhoto
(
    EmployeeId INT NOT NULL PRIMARY KEY,
    Photo VARBINARY(MAX) FILESTREAM NULL,
    MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL
                    UNIQUE DEFAULT NEWID()
);

GO

/*
text_of_comment
/* nested comment */
*/

-- line comment

CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID
    ON Production.WorkOrder(ProductID)
    WITH (FILLFACTOR = 80,
        PAD_INDEX = ON,
        DROP_EXISTING = ON);
GO

WHILE (SELECT AVG(ListPrice) FROM Production.Product) < $300
BEGIN
  UPDATE Production.Product
      SET ListPrice = ListPrice * 2
  SELECT MAX(ListPrice) FROM Production.Product
  IF (SELECT MAX(ListPrice) FROM Production.Product) > $500
      BREAK
  ELSE
      CONTINUE
END
PRINT 'Too much for the market to bear';

MERGE INTO Sales.SalesReason AS [Target]
USING (VALUES ('Recommendation','Other'), ('Review', 'Marketing'), ('Internet', 'Promotion'))
      AS [Source] ([NewName], NewReasonType)
ON [Target].[Name] = [Source].[NewName]
WHEN MATCHED
THEN UPDATE SET ReasonType = [Source].NewReasonType
WHEN NOT MATCHED BY TARGET
THEN INSERT ([Name], ReasonType) VALUES ([NewName], NewReasonType)
OUTPUT $action INTO @SummaryOfChanges;

SELECT ProductID, OrderQty, SUM(LineTotal) AS Total
FROM Sales.SalesOrderDetail
WHERE UnitPrice < $5.00
GROUP BY ProductID, OrderQty
ORDER BY ProductID, OrderQty
OPTION (HASH GROUP, FAST 10);
                
                  `}
                ></VSEditor>
               <div className="flex">
               <button className="btn btn-sm rounded-none mt-2 no-animation">
                  Execute Query
                </button>
               </div>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-blue-200 border dark:border-base-300 collapse-open dark:text-gray-400 text-black bg-white dark:bg-slate-900">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Query Results
              </div>
              <div className="collapse-content">
                {/* Logs  */}
                <div className="w-full relative h-[25vh] inset-0 bottom-48 hide-scrollbar">
                  <LazyLog
                    // extraLines={1}
                    // enableSearch
                    text={"No Logs Found"}
                    follow
                    style={{
                      overflowY: "hidden", // Hide vertical scrollbar
                      overflowX: "scroll", // Display horizontal scrollbar if needed
                      backgroundColor: "#1E1E1E", // Change the background color
                      userSelect: "text",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
