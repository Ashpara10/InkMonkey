import { getCookie } from "cookies-next";
import basepath from "./path";
import { useQuery } from "react-query";

const useUser = () => {
  const id = getCookie("user");
  const { data, error, isLoading } = useQuery({
    queryKey: "getUser",
    queryFn: async () => {
      const res = fetch(`${basepath}/user/${id}`)
        .then((r) => r.json())
        .then((data) => data)
        .catch((err) => err);
      return res;
    },
  });
  console.log({ data });

  return {
    data: data?.user,
    loading: isLoading,
    error: error,
  };
};
export default useUser;

// const { data, isLoading, error } = useSWR(`${ENDPOINT}/user/${id}`, (url) =>
//   fetch(url).then((res) => res.json())
