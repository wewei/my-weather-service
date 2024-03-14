import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// const RegisterUrl = "http://localhost:8080";
const RegisterUrl = "https://my-simple-copilot.azurewebsites.net";

// const ServiceUrl = "http://localhost:8081";
const ServiceUrl = "https://my-weather-service.azurewebsites.net"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

async function post(url: string, body: any): Promise<any> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status !== 200) {
    throw await res.json();
  }

  return res.json();
}

async function get(url: string): Promise<any> {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    throw await res.json();
  }

  return res.json();
}

post("/api/weather", { location: "Suzhou" }).then((r) =>
    console.log(r)
);

const functions = [
  {
    name: "queryWeather",
    target: `${ServiceUrl}/api/weather`,
    description: "query the weather of a given city",
    parameters: {
      location: {
        description: "the name of the city",
        type: "string",
      },
    },
    require: ['location'],
  },
  {
    name: "hotNews",
    target: `${ServiceUrl}/api/news`,
    description: "Get the today's hot news",
    parameters: {},
    require: []
  },
];

const embedIframe: HTMLIFrameElement = document.createElement("iframe");
embedIframe.src = `${RegisterUrl}/embed/`;
embedIframe.style.display = "none";
document.body.appendChild(embedIframe);
// document.getElementById("embed") as HTMLIFrameElement | null;

if (embedIframe) {
    setTimeout(() => {
        console.log("post message!");
        embedIframe.contentWindow?.postMessage({ func: "register", functions }, RegisterUrl);
    }, 1000);
}
