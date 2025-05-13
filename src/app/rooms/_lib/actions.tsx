export const fetchRooms = async () => {
  const response = await fetch("http://localhost:5000/rooms", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  
  const data = await response.json();
  return data;
}

