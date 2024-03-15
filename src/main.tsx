import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// async function post(url: string, body: any): Promise<any> {
//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });

//   if (res.status !== 200) {
//     throw await res.json();
//   }

//   return res.json();
// }

// async function get(url: string): Promise<any> {
//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });

//   if (res.status !== 200) {
//     throw await res.json();
//   }

//   return res.json();
// }

// post("/api/weather", { location: "Suzhou" }).then((r) =>
//     console.log(r)
// );
