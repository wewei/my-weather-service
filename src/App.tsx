import "./App.css";

// const RegisterUrl = "http://localhost:8080";
const RegisterUrl = "https://my-simple-copilot.azurewebsites.net";

const ServiceUrl = "http://localhost:8081";
// const ServiceUrl = "https://my-weather-service.azurewebsites.net"

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
    interpret: "Translate the weather result to human language. For each item in 'results', 'location' means the place of the weather inquery, forcs on the 'name' and 'path', the 'daily' is a per day forecast, underwhich, the 'date' is the forecast date, the 'text_day' is text description of the weather, the 'high' and 'low' are the highest and lowest temperature, 'rainfall' is the chance of rainfall, 'wind_direction', 'wind_speed' and 'wind_scale' just mean what the name indicates about the wind, 'humidity' is just the humidity."
  },
  {
    name: "hotNews",
    target: `${ServiceUrl}/api/news`,
    description: "Get the today's hot news",
    parameters: {},
    require: [],
    interpret: "For items under 'data.items', translate them into news link list in markdown format, where 'title' and 'url' descibes the links, the 'thumbnail' are the images",
    // interpret: "Translate the data into a news list in markdown format."
  },
];

function inject(useIframe: boolean) {
    const createChannel = useIframe
        ? () => {
              const embedIframe: HTMLIFrameElement =
                  document.createElement("iframe");
              embedIframe.src = `${RegisterUrl}/embed/`;
              embedIframe.style.display = "none";
              document.body.appendChild(embedIframe);
              return embedIframe.contentWindow;
          }
        : () => window.open(`${RegisterUrl}/embed/`, "_blank");

    const channel = createChannel();
	if (channel) {
		setTimeout(() => {
            channel.postMessage({ func: "register", functions }, RegisterUrl);
		}, 1000);
	}
}

function App() {
	return (
		<div className="App">
			<div>
				This site will register 2 methods to copilot
				<ul>
					<li>Query the weather of a city</li>
					<li>Get today's hot news</li>
				</ul>
				<div><button onClick={() => inject(false)}>Register</button></div>
			</div>
		</div>
	);
}

export default App;
