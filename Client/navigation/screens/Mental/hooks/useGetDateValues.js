const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];
const faceValuesRoute = `http://${ip_address}:${port}/api/user/mentalHealth/datesGraph`
console.log(`DateValuesRoute:${faceValuesRoute}`)

export const useGetDateValues = () => {

const getDateValues = async () => {
    const response = await fetch(
      DateValuesRoute,
      {
        method: "GET",
        headers: {id: '11f431c9-c848-4c44-a26d-5083696e6a5a'}
      } 
    );
    console.log("Called")
    const json = await response.json();

    console.log(`getDateValues json: ${JSON.stringify(json)}`);
    console.log("Responded")
    if (!response.ok) {
      console.log(json.mssg);
      return [0]
    }
    if (response.ok) {
      
      try {
        return (json.dates);
      } catch (error) {
        console.error(error);
        return [0]
      }
    }
  };
  return {getDateValues}
}