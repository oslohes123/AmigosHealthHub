const authHeaders = {
    "x-app-id": process.env.X_APP_ID as string,
    "x-app-key": process.env.X_APP_KEY as string,
}

export default authHeaders;