import { Loader2Icon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Loader2Icon className="animate-spin text-lg" />
    </div>
  );
};

export default Loading;
