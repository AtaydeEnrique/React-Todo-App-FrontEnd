import { useCallback } from "react";
import { useDispatch } from "react-redux";
const useHttp = () => {
  const dispatch = useDispatch();
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      try {
        const data = await response.json();
        applyData(data);
      } catch (e) {}
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong!");
    }
  }, []);

  return sendRequest;
};

export default useHttp;
