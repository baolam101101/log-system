import axios from "axios";
import FileList from "../components/list";

const FilePage = async () => {
  let data = []
  
  try {
    const res = await axios.get(
      `https://d55d-2402-800-63a6-b82f-115e-4169-a78c-c61a.ngrok-free.app/file`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    data= res.data;
  } catch (err) {
    console.error("Error fetching files:", err);
  }

  return (
    <div>
      <FileList files={data} />
    </div>
  );
};

export default FilePage;
