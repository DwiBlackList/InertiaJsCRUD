import{P as b,_ as v}from"./PaginationClassic-83338296.js";import{f as a,b as n,u as l,a as e,c as h,w as d,F as c,g as f,h as y,o as s,Z as k,q as u,t as r,j as x}from"./app-6fa9885f.js";import"./_plugin-vue_export-helper-c27b6911.js";const p={class:"relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"},w={key:0,class:"sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10"},B=x(" Dashboard"),D=x(" Log in"),L=x(" Register"),V={class:"relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"},j=e("div",{class:"sm:flex sm:justify-between sm:items-center mb-8"},[e("div",{class:"mb-4 sm:mb-0"},[e("h1",{class:"text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"},"Post ✨")]),e("div",{class:"grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"})],-1),S={class:"grow"},N={class:"px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"},C={class:""},P={class:"max-w-3xl m-auto mt-8"},R={class:"xl:-translate-x-16"},T={class:"xl:flex"},W={class:"w-32 shrink-0"},F={class:"text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 xl:leading-8"},q={class:"grow pb-6 border-b border-slate-200 dark:border-slate-700"},z={class:"text-2xl text-slate-800 dark:text-slate-100 font-bold mb-3"},A={class:"flex flex-nowrap items-center space-x-2 mb-4"},E={class:"flex items-center"},U=e("a",{class:"block mr-2 shrink-0",href:"#0"},[e("img",{class:"rounded-full border-2 border-white dark:border-slate-800 box-content",src:v,width:"32",height:"32",alt:"User 04"})],-1),Z={class:"block text-sm font-semibold text-slate-800 dark:text-slate-100",href:"#0"},$=e("div",{class:"text-slate-400 dark:text-slate-600"},"·",-1),G=e("div",null,null,-1),H={class:"space-y-3 text-slate-400 dark:text-slate-500"},I={class:"xl:pl-32 xl:-translate-x-16 mt-6"},O={name:"Welcome",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,data:Array},setup(i){function _(t){const m={year:"numeric",month:"long",day:"numeric"};return new Date(t).toLocaleDateString(void 0,m)}function g(t){return new Date(t).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}return(t,m)=>(s(),a(c,null,[n(l(k),{title:"Welcome"}),e("div",p,[i.canLogin?(s(),a("div",w,[t.$page.props.auth.user?(s(),h(l(u),{key:0,href:t.route("posts.index"),class:"font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:d(()=>[B]),_:1},8,["href"])):(s(),a(c,{key:1},[n(l(u),{href:t.route("login"),class:"font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:d(()=>[D]),_:1},8,["href"]),i.canRegister?(s(),h(l(u),{key:0,href:t.route("register"),class:"ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:d(()=>[L]),_:1},8,["href"])):f("",!0)],64))])):f("",!0),e("div",V,[j,e("main",S,[e("div",N,[e("div",C,[e("div",P,[e("div",R,[(s(!0),a(c,null,y(i.data,o=>(s(),a("article",{class:"pt-6",key:o.id},[e("div",T,[e("div",W,[e("div",F,r(_(o.created_at))+" , "+r(g(o.created_at)),1)]),e("div",q,[e("header",null,[e("h2",z,r(o.title),1),e("div",A,[e("div",E,[U,e("a",Z,r(o.user.name),1)]),$,G])]),e("div",H,[e("p",null,r(o.body),1)])])])]))),128))]),e("div",I,[n(b)])])])])])])])],64))}};export{O as default};
