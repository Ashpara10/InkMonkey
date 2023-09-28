import NotePage from "@/components/note-page";
import basepath from "@/lib/path";
import { Note } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const getNoteByID = async (
  user: string,
  id: string
): Promise<{ status: boolean; note: Note | null }> => {
  const token = cookies().get("token")?.value;

  const res = await fetch(`${basepath}/api/v1/note/${user}/getnote/${id}`, {
    headers: {
      "Auth-Token": token as string,
    },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) return { status: false, note: null };
  return { status: true, note: data?.data };
};

const Page = async ({ params }: { params: { user: string; id: string } }) => {
  const { note, status } = await getNoteByID(params?.user, params?.id);

  return (
    <div className="w-full mt-20 min-h-screen p-4 flex flex-col items-center justify-center">
      <NotePage data={note} status={status} />
    </div>
  );
};

export default Page;
