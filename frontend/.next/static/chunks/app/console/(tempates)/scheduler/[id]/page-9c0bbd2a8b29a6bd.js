(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9423],{18827:function(e,a,s){Promise.resolve().then(s.bind(s,85136))},16463:function(e,a,s){"use strict";var l=s(71169);s.o(l,"usePathname")&&s.d(a,{usePathname:function(){return l.usePathname}}),s.o(l,"useRouter")&&s.d(a,{useRouter:function(){return l.useRouter}}),s.o(l,"useSearchParams")&&s.d(a,{useSearchParams:function(){return l.useSearchParams}})},85136:function(e,a,s){"use strict";s.r(a),s.d(a,{default:function(){return h}});var l=s(57437),t=s(2265),r=s(95956),o=s(16463),d=s(42126),n=s(20357);function c(e){var a,s,o,c,i,u,h;let{label:b}=e,[m,x]=(0,t.useState)(!1),[v,p]=(0,t.useState)([]);async function g(){x(!0);try{await d.Z.get("".concat(n.env.NEXT_PUBLIC_API_URL,"/v1/scheduler/job-details/").concat(b),{headers:{"Content-Type":"application/json",Authorization:"".concat(localStorage.getItem("token"))}}).then(e=>{var a,s;console.log(null===(a=e.data)||void 0===a?void 0:a.data),p(null===(s=e.data)||void 0===s?void 0:s.data),x(!1)}).catch(e=>{console.log(e),x(!1),(0,r.Am)(e.response.data.message,{type:"error"})})}catch(e){setTimeout(()=>{var a,s;x(!1),(0,r.Am)(null===(s=e.response)||void 0===s?void 0:null===(a=s.data)||void 0===a?void 0:a.message,{type:"error"})},1e3)}}return(0,t.useEffect)(()=>{g()},[]),(0,l.jsx)("div",{className:"p-2",children:(0,l.jsxs)("div",{className:"collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none",children:[(0,l.jsx)("input",{type:"radio",name:"my-accordion-1",checked:"checked"}),(0,l.jsx)("div",{className:"collapse-title text-xl font-medium dark:text-gray-400 text-black",children:"Basic Information"}),(0,l.jsx)("div",{className:"collapse-content flex flex-col dark:text-gray-400 text-black",children:m?(0,l.jsx)("div",{className:"animate-pulse flex space-x-4",children:(0,l.jsxs)("div",{className:"flex-1 space-y-4 py-1",children:[(0,l.jsx)("div",{className:"h-4 bg-slate-400 rounded w-3/4"}),(0,l.jsxs)("div",{className:"space-y-2",children:[(0,l.jsx)("div",{className:"h-4 bg-slate-400 rounded"}),(0,l.jsx)("div",{className:"h-4 bg-slate-400 rounded w-5/6"})]})]})}):(0,l.jsxs)("div",{children:[(0,l.jsxs)("p",{className:"p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1",children:[(0,l.jsx)("span",{className:"font-bold",children:"Name:"})," ",m?"Loading...":(null==v?void 0:null===(a=v.metadata)||void 0===a?void 0:a.name)||"N/A"]}),(0,l.jsxs)("p",{className:"p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1",children:[(0,l.jsx)("span",{className:"font-bold",children:"Successful job history limit:"})," ",m?"Loading...":(null==v?void 0:null===(s=v.spec)||void 0===s?void 0:s.successfulJobsHistoryLimit)||"N/A"]}),(0,l.jsxs)("p",{className:"p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1",children:[(0,l.jsx)("span",{className:"font-bold",children:"Concurrency policy:"})," ",m?"Loading...":(null==v?void 0:null===(o=v.spec)||void 0===o?void 0:o.concurrencyPolicy)||"N/A"]}),(0,l.jsxs)("p",{className:"p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1",children:[(0,l.jsx)("span",{className:"font-bold",children:"Schedule:"})," ",m?"Loading...":(null==v?void 0:null===(c=v.spec)||void 0===c?void 0:c.schedule)||"N/A"]}),(0,l.jsxs)("p",{className:"p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1",children:[(0,l.jsx)("span",{className:"font-bold",children:"Suspend:"})," ",m?"Loading...":"".concat(null==v?void 0:null===(i=v.spec)||void 0===i?void 0:i.suspend)||"N/A"]}),(0,l.jsxs)("p",{className:"p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1",children:[(0,l.jsx)("span",{className:"font-bold",children:"Creation time:"})," ",m?"Loading...":(null==v?void 0:null===(u=v.metadata)||void 0===u?void 0:u.creationTimestamp)||"N/A"]}),(0,l.jsxs)("p",{className:"p-2 border-l-2 border-blue-600 dark:bg-transparent mt-1",children:[(0,l.jsx)("span",{className:"font-bold",children:"Last Schedule Time:"})," ",m?"Loading...":(null==v?void 0:null===(h=v.status)||void 0===h?void 0:h.lastScheduleTime)||"N/A"]})]})})]})})}var i=s(20357);function u(e){var a;let{label:s}=e,[o,n]=(0,t.useState)(!1),[c,u]=(0,t.useState)([]);async function h(){n(!0);try{await d.Z.get("".concat(i.env.NEXT_PUBLIC_API_URL,"/v1/scheduler/job-events/").concat(s),{headers:{"Content-Type":"application/json",Authorization:"".concat(localStorage.getItem("token"))}}).then(e=>{var a,s,l;console.log(null===(s=e.data)||void 0===s?void 0:null===(a=s.data)||void 0===a?void 0:a.items),u(null===(l=e.data)||void 0===l?void 0:l.data),n(!1)}).catch(e=>{console.log(e),n(!1),(0,r.Am)(e.response.data.message,{type:"error"})})}catch(e){setTimeout(()=>{var a,s;n(!1),(0,r.Am)(null===(s=e.response)||void 0===s?void 0:null===(a=s.data)||void 0===a?void 0:a.message,{type:"error"})},1e3)}}return(0,t.useEffect)(()=>{h()},[]),(0,l.jsx)("div",{className:"p-2 relative h-auto",children:(0,l.jsxs)("div",{className:"collapse collapse-arrow join-item border dark:border-base-300 border-blue-200 bg-white dark:bg-slate-900 rounded-none relative h-auto",children:[(0,l.jsx)("input",{type:"radio",name:"my-accordion-1",checked:"checked"}),(0,l.jsx)("div",{className:"collapse-title text-xl font-medium dark:text-gray-400 text-black",children:"Events"}),(0,l.jsx)("div",{className:"collapse-content flex flex-col dark:text-gray-400 text-black overflow-y-scroll relative h-[70vh]",children:o?(0,l.jsx)("div",{className:"animate-pulse flex space-x-4",children:(0,l.jsxs)("div",{className:"flex-1 space-y-4 py-1",children:[(0,l.jsx)("div",{className:"h-4 bg-slate-400 rounded w-3/4"}),(0,l.jsxs)("div",{className:"space-y-2",children:[(0,l.jsx)("div",{className:"h-4 bg-slate-400 rounded"}),(0,l.jsx)("div",{className:"h-4 bg-slate-400 rounded w-5/6"})]})]})}):(0,l.jsxs)("table",{className:"table table-sm",children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{className:"dark:bg-slate-900 rounded-sm bg-white dark:text-gray-400 text-black",children:[(0,l.jsx)("th",{children:"Message"}),(0,l.jsx)("th",{children:"Type"}),(0,l.jsx)("th",{children:"Reason"}),(0,l.jsx)("th",{children:"Source"}),(0,l.jsx)("th",{children:"Count"}),(0,l.jsx)("th",{children:"Last Seen"})]})}),(0,l.jsx)("tbody",{className:"mt-5 dark:text-gray-400 text-black",children:c&&(null==c?void 0:null===(a=c.items)||void 0===a?void 0:a.map((e,a)=>{var s,t,r,o,d,n;return(0,l.jsxs)("tr",{className:"dark:bg-slate-900 rounded-sm bg-white",children:[(0,l.jsx)("td",{children:null!==(s=null==e?void 0:e.message)&&void 0!==s?s:"NoN"}),(0,l.jsx)("td",{children:null!==(t=null==e?void 0:e.type)&&void 0!==t?t:"NoN"}),(0,l.jsx)("td",{children:null!==(r=null==e?void 0:e.reason)&&void 0!==r?r:"NoN"}),(0,l.jsx)("td",{children:null!==(o=null==e?void 0:e.source.component)&&void 0!==o?o:"NoN"}),(0,l.jsx)("td",{children:null!==(d=null==e?void 0:e.count)&&void 0!==d?d:"NoN"}),(0,l.jsx)("td",{children:null!==(n=null==e?void 0:e.lastTimestamp)&&void 0!==n?n:"NoN"})]},a)}))})]})})]})})}function h(e){let a;let s=e.params.id,r=(0,o.useRouter)(),d=(0,o.useSearchParams)().get("tab"),[n,i]=(0,t.useState)(d||"information");switch(n){case"information":default:a=(0,l.jsx)(c,{label:s});break;case"events":a=(0,l.jsx)(u,{label:s})}return(0,t.useEffect)(()=>{d&&i(d)},[d]),(0,t.useEffect)(()=>{d||r.push("/console/scheduler/".concat(s,"?tab=information"),void 0,{shallow:!0})},[]),(0,l.jsx)("div",{children:(0,l.jsx)("div",{className:"flex w-auto flex-col h-auto absolute inset-0 bottom-2 top-2 ml-2 mr-2 dark:bg-slate-900",children:(0,l.jsx)("blockquote",{className:"bg-white border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-900 relative h-full",children:(0,l.jsxs)("div",{className:"h-full relative dark:bg-slate-900 p-2 flex flex-col justify-between",children:[(0,l.jsxs)("h1",{className:"text-xl font-bold capitalize dark:text-gray-400 text-black",children:["Cron Job: ",s]}),(0,l.jsx)("h2",{className:"text text-md dark:text-gray-400 text-black truncate",children:"All the information about the scheduler that will provide powerful cron job"}),(0,l.jsxs)("div",{className:"h-full mt-5 flex",children:[(0,l.jsx)("div",{className:"row-span-9 col-span-10 dark:bg-slate-800 border-t-[5px] border-blue-600 dark:border-gray-500 mr-2 min-w-[300px] bg-slate-200",children:(0,l.jsxs)("ul",{className:"menu rounded-sm dark:text-gray-400 text-black h-full",children:[(0,l.jsx)("li",{className:"menu-title dark:text-gray-400 text-black",children:"Options"})," ",(0,l.jsxs)("button",{className:"rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ".concat("information"==n?"border-l-4 border-blue-600 border":"border-l-4 border-transparent border"),onClick:()=>{r.push("/console/scheduler/".concat(s,"?tab=information"))},children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"currentColor",className:"bi bi-info-circle mr-2",viewBox:"0 0 16 16",children:[(0,l.jsx)("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}),(0,l.jsx)("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"})]}),"Information"]}),(0,l.jsxs)("button",{className:"rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ".concat("events"==n?"border-l-4 border-blue-600 border":"border-l-4 border-transparent border"),onClick:()=>{r.push("/console/scheduler/".concat(s,"?tab=events"))},children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",fill:"currentColor",className:"bi bi-activity mr-2",viewBox:"0 0 16 16",children:(0,l.jsx)("path",{"fill-rule":"evenodd",d:"M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"})}),"Events"]}),(0,l.jsxs)("button",{className:"rounded-sm dark:text-gray-400 text-black flex justify-start btn-will hover:bg-slate-300 dark:hover:bg-slate-700 p-2 ".concat("settings"==n?"border-l-4 border-blue-600 border":"border-l-4 border-transparent border"),onClick:()=>{r.push("/console/scheduler/".concat(s,"?tab=settings"))},children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"currentColor",className:"bi bi-nut mr-2",viewBox:"0 0 16 16",children:[(0,l.jsx)("path",{d:"m11.42 2 3.428 6-3.428 6H4.58L1.152 8 4.58 2h6.84zM4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1H4.58z"}),(0,l.jsx)("path",{d:"M6.848 5.933a2.5 2.5 0 1 0 2.5 4.33 2.5 2.5 0 0 0-2.5-4.33zm-1.78 3.915a3.5 3.5 0 1 1 6.061-3.5 3.5 3.5 0 0 1-6.062 3.5z"})]}),"Settings"]})]})}),(0,l.jsx)("div",{className:"dark:bg-slate-800 bg-slate-200 border-blue-600 w-full h-auto p-1 rounded-sm border-t-[5px] dark:border-gray-500 col-span-4",children:a})]})]})})})})}}},function(e){e.O(0,[147,5956,2971,7023,1744],function(){return e(e.s=18827)}),_N_E=e.O()}]);