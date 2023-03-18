const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];
const dateValuesRoute = `http://${ip_address}:${port}/api/user/mentalHealth/dateValues`

export const useGetDateValues = () => {

const getDateValues = async () => {
    const response = await fetch(
      dateValuesRoute,
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
        return ((json.dates).reverse());
      } catch (error) {
        return [0]
      }
    }
  };
  return {getDateValues}
}