import { useAuthContext } from "../../Authentication/context/AuthContext";
import { useState } from "react";
const port = process.env["PORT"];
const ip_address = process.env["IP_ADDRESS"];

export const useSubmit = () => {
  const { user } = useAuthContext();
  let email = user.email

  console.log(`port: ${port}`);
  console.log(`ip_address: ${ip_address}`);

  const submit = async (face, word) => {

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
      console.log(error);
    }
  };
  return { submit }
};