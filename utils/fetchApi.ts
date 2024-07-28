import axios from "axios";

export default async function fetchApi(
  path: string,
  method: string,
  body?: any,
) {
  
  const url = process.env.NEXT_PUBLIC_API_URL + path;
  const headers = {
    "Content-Type": "application/json",
  };
  const options = {
    method,
    headers,
    ...(body && { data: JSON.stringify(body) }),
  };

  try {
    const response = await axios(url, options);

    return response.data;
  } catch (error:any) {
    console.log(error);

    return error.response.data;
  }
}
