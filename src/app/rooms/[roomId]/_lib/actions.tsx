export const fetchRoom = async (id: string) => {
  const response = await fetch(`http://localhost:5000/rooms/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  
  const data = await response.json();
  return data;
}