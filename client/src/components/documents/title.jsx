import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UseDocuments from "@/pages/main/useDocuments";

export const Title = ({ initialData }) => {
  const inputRef = useRef(null);
  const { updateMutation } = UseDocuments();
  //   const [updateData, setUpdateData] = useState({});
  const [title, setTitle] = useState(initialData.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
    // setUpdateData(initialData);/
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event) => {
    setTitle(event.target.value);
    updateMutation({
      _id: initialData._id,
      title: event.target.value || "Untitled",
    });
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && (
        <div className="shrink-0 mr-2 text-[18px]">{initialData.icon}</div>
      )}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
