import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Note } from "@/lib/types";
import Balancer from "react-wrap-balancer";
import { ChevronLeft, Edit, Loader2, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getNotes } from "@/lib/actions";
import useMediaQuery from "@/lib/useMediaQuery";
import NavContext from "@/lib/context";
import Fuse from "fuse.js";
const NoteDrawer = ({
  trigger,
  open,
}: {
  trigger?: React.ReactNode;
  open: boolean;
}) => {
  const router = useRouter();
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    refetchOnMount: false,
  });
  const options = { keys: [["Title"]] };

  const myIndex = Fuse.createIndex(options.keys, notes as Note[]);
  const fuse = new Fuse(notes as Note[], options, myIndex);

  const isSmall = useMediaQuery("(min-width: 960px)");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<any>();
  const { selectedNotes, setSelectedNotes } = useContext(NavContext);

  const isSelected = (id: string) => {
    const IsSelected = selectedNotes?.find((x) => x.ID === id);
    return IsSelected ? true : false;
  };
  useEffect(() => {
    if (search.length < 3) return;
    const res = fuse.search(search);
    setFiltered(res);
  }, [search]);
  return (
    <Drawer
      // modal={false}
      open={open}
      direction={!isSmall ? "bottom" : "left"}
      shouldScaleBackground
    >
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent
        className={`dark:bg-dark flex flex-col items-center justify-start  ${
          !isSmall ? "w-full " : "h-screen max-w-sm "
        }   `}
      >
        <div className="w-full flex items-center justify-between mt-3 px-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for notes..."
            className="w-full border dark:border-dark-btn dark:bg-[#282828] focus-visible:outline-none p-2 rounded-lg "
          />
          {Number(selectedNotes?.length) >= 1 && (
            <div className="flex items-center justify-center gap-x-2">
              <span
                className="p-1.5 rounded-full border mx-2 dark:border-dark-btn"
                onClick={() => setSelectedNotes([])}
              >
                <X />
              </span>
              <span className="p-1 rounded-full border dark:border-dark-btn flex items-center justify-center gap-x-2 px-3 py-1.5">
                <Trash2 /> ({selectedNotes?.length as number})
              </span>
            </div>
          )}
        </div>
        <div
          className={`w-full  overflow-x-hidden  ${
            !isSmall ? "h-[450px]" : "mt-6 h-[600px]"
          } overflow-y-auto  scrollbar-none  flex flex-col items-center px-2 justify-start`}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : search.length > 3 ? (
            <>
              <div>{filtered?.length === 0 && "0 results found"}</div>
              {filtered.map((e: any, i: number) => {
                const selected = isSelected(e?.item?.ID as string);

                return (
                  <div
                    key={i}
                    onClick={() => {
                      !selected &&
                        setSelectedNotes(
                          selectedNotes?.concat(e?.item) as Note[]
                        );
                    }}
                    className={`first:mt-10 ${
                      selected && "dark:bg-dark-btn"
                    } w-full hover:dark:bg-dark-btn/80 rounded-xl border dark:border-dark-btn mb-3  flex flex-col items-start justify-start  px-2 py-3 `}
                  >
                    <Balancer
                      onClick={() =>
                        router.push(`/dashboard/note/${e?.item?.ID}`)
                      }
                      as="h3"
                      className="text-lg  tracking-tight"
                    >
                      {e?.item?.Title}
                    </Balancer>
                    <div className="flex items-center mt-1 justify-start">
                      <span className="opacity-80">
                        {new Date(e?.item?.CreatedAt as string).toDateString()}
                      </span>
                    </div>
                    {/* <div className="flex items-center justify-center space-x-2">
                    {!selected && <Trash2 className="p-0.5" />}
                  </div> */}
                  </div>
                );
              })}
            </>
          ) : (
            notes?.map((e, i) => {
              const selected = isSelected(e?.ID as string);
              return (
                <div
                  key={i}
                  onClick={() => {
                    !selected &&
                      setSelectedNotes(selectedNotes?.concat(e) as Note[]);
                  }}
                  className={`first:mt-10 ${
                    selected && "dark:bg-dark-btn"
                  } w-full hover:dark:bg-dark-btn/80 rounded-xl border dark:border-dark-btn mb-3  flex flex-col items-start justify-start  px-2 py-3 `}
                >
                  <Balancer
                    onClick={() => router.push(`/dashboard/note/${e?.ID}`)}
                    as="h3"
                    className="text-lg  tracking-tight"
                  >
                    {e?.Title}
                  </Balancer>
                  <div className="flex items-center mt-1 justify-start">
                    <span className="opacity-80">
                      {new Date(e?.CreatedAt as string).toDateString()}
                    </span>
                  </div>
                  {/* <div className="flex items-center justify-center space-x-2">
                    {!selected && <Trash2 className="p-0.5" />}
                  </div> */}
                </div>
              );
            })
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NoteDrawer;
