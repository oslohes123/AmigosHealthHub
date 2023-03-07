import { useAuthContext } from "../../Authentication/context/AuthContext";
import { useState } from "react";
const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];

export const useSubmit = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  let email = user.id

  console.log(`port: ${port}`);
  console.log(`ip_address: ${ip_address}`);

  const submit = async (face, word) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      `http://${ip_address}:${port}/api/user/mentalHealth/rateMental`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, face, word }),
      }
    );

    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.mssg);
      console.log(error);
    }
    if (response.ok) {
      try {
        console.log(json);
        setIsLoading(false);
        setError(json.mssg)
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      }
    }
  };



  return { submit, isLoading, error }
};