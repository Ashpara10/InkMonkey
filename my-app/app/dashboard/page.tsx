import Dashboard from "@/components/dashboard";
import { getNotes } from "@/lib/actions";
import { cookies } from "next/headers";

const Page = async () => {
  const user = cookies().get("user")?.value as string;
  const token = cookies().get("token")?.value as string;

  const { notes } = await getNotes(user, token);

  return <Dashboard notes={notes} />;
};

export default Page;
