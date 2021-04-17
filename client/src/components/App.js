import { h } from "preact";

async function apiCall() {
  const response = await fetch(process.env.API_BASE_URL).then((res) =>
    res.json()
  );
  console.log("API endpoint response:", response);
}

export function App() {
  return (
    <div class="app">
      <h1>
        hello <span>world</span>
      </h1>
      <button onClick={apiCall}>Call an endpoint from server</button>
    </div>
  );
}
