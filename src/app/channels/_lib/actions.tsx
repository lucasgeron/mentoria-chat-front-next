export const fetchChannels = async () => {
  const response = await fetch("http://localhost:5000/channels", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  
  const data = await response.json();
  return data;
}

export const fetchChannel = async (id: string) => {
  const response = await fetch(`http://localhost:5000/channels/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  
  const data = await response.json();
  return data;
}