// import { useAuthContext } from "../../Authentication/context/AuthContext";
const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];
const wordValuesRoute = `http://${ip_address}:${port}/mentalHealth/wordcloud`
console.log(`WordValuesRoute:${wordValuesRoute}`)

export const useGetFaceValues = () => {

const getWordValues = async () => {
    const response = await fetch(
      wordValuesRoute,
      {
        method: "GET",
        headers: {id: '11f431c9-c848-4c44-a26d-5083696e6a5a'}
      } 
    );
    console.log("Called")
    const json = await response.json();

    console.log(`getWordValues json: ${JSON.stringify(json)}`);
    console.log("Responded")
    if (!response.ok) {
      console.log(json.mssg);
      return [0]
    }
    if (response.ok) {
      try {
        return json.words
      } catch (error) {
        console.error(error);
        return [0]
      }
    }
  };
  return {getWordValues}
}