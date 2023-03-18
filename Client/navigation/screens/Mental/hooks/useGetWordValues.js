// import { useAuthContext } from "../../Authentication/context/AuthContext";
const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];
const wordValuesRoute = `http://${ip_address}:${port}/api/user/mentalHealth/wordcloud`
console.log(`WordValuesRoute:${wordValuesRoute}`)

export const useGetWordValues = () => {

const getWordValues = async () => {
    const response = await fetch(
      wordValuesRoute,
      {
        method: "GET",
        headers: {id: '11f431c9-c848-4c44-a26d-5083696e6a5a'}
      } 
    );
    const json = await response.json();

    if (!response.ok) {
      return [0]
    }
    if (response.ok) {
      try {
        return json
      } catch (error) {
        return [0]
      }
    }
  };
  return {getWordValues}
}