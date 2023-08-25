import { useEffect, useState } from "react";
type User = {
  Id: number;
  Username: string;
  Email: string;
  Password: string;
};
const ENDPOINT = "http://localhost:8000";
const useUser = (id: string) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserById = async () => {
      setLoading(true);
      const res = await fetch(`${ENDPOINT}/user/${id}`);
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        setUser(data?.user);
      }
    };
    typeof id !== "undefined" && getUserById();
  }, [id]);

  return {
    data: user,
    loading: loading,
  };
};
export default useUser;

// const { data, isLoading, error } = useSWR(`${ENDPOINT}/user/${id}`, (url) =>
//   fetch(url).then((res) => res.json())
