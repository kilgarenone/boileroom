import { h } from "preact";

async function apiCall() {
  const response = await fetch(process.env.API_BASE_URL).then((res) =>
    res.json()
  );
  console.log("API endpoint response:", response);
}

// eslint-disable-next-line import/prefer-default-export
export function App() {
  return <button onClick={apiCall}>Call an endpoint from server</button>;
}
