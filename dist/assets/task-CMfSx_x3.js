import{B as v,h as r,z as k}from"./index-DpM2hyz8.js";const h=v("task",()=>{const t=r(JSON.parse(localStorage.getItem("tasks"))||null),n=r("all"),c=async()=>{try{if(!t.value){const e=await fetch("/task.json");t.value=await e.json(),a()}}catch(e){console.log(e)}},u=k(()=>{switch(n.value){case"finished":return t.value.filter(e=>e.done);case"unfinished":return t.value.filter(e=>!e.done);default:return t.value}}),i=e=>{const s=t.value.reduce((o,l)=>l.id>o?l.id:o,0);t.value.push({id:s+1,...e}),a()},d=e=>{t.value=t.value.filter(s=>s.id!=e),a()},f=e=>{const s=t.value.find(o=>o.id===e);s&&(s.done=!s.done,a())},a=()=>{localStorage.setItem("tasks",JSON.stringify(t.value))};return{tasks:t,loadTasks:c,deleteTask:d,saveToLocalStorage:a,filteredTasks:u,currentFilter:n,addTask:i,toggleTaskDone:f}});export{h as u};
