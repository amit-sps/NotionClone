/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Button } from "@/components/ui/button";

import { IconPicker } from "./icon-picker";
import UseDocuments from "@/pages/main/useDocuments";
import { useAuth } from "@/context/auth";

export const Toolbar = ({ initialData, preview }) => {
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const [icon, setIcon] = useState(initialData.icon);
  const { updateTitleMutation, updateMutation, removeIconDocMutation } =
    UseDocuments();
  // const update = useMutation(api.documents.update);
  // const removeIcon = useMutation(api.documents.removeIcon);
  const [{ user }, setAuth, socket] = useAuth();

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData?.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value) => {
    setValue(value);
    updateTitleMutation({
      ...initialData,
      title: value || "Untitled",
    });
    socket.current.emit("editTitle", {
      ...initialData,
      title: value || "Untitled",
      userId: user._id,
    });
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon) => {
    console.log("onIconSelect", {
      id: initialData._id,
      icon,
    });
    updateMutation({
      ...initialData,
      icon: icon,
    }); //editIcon
    socket.current.emit("editIcon", {
      ...initialData,
      icon: icon,
      userId: user._id,
    });
  };

  const onRemoveIcon = (icon) => {
    if (initialData.icon !== icon) {
      removeIconDocMutation({
        ...initialData,
        icon: icon,
      });
    } else {
      alert("Please choose a different icon to remove existing icon" + icon);
    }
  };
  useEffect(() => {
    socket.current.on("getDoc", (data) => {
      console.log("socket getDoc", data.title);
      setValue(data?.title);
    });
    socket.current.on("getIcon", (data) => {
      console.log("socket getIcon", data.icon);
      setIcon(data?.icon);
    });
  }, []);
  return (
    <div className="pl-[54px] group relative text-black">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition mt-2">
              {icon}
              {/* {initialData.icon} */}
            </p>
          </IconPicker>
          <Button
            onClick={() => onRemoveIcon("📑")}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && <p className="text-6xl pt-6">{icon}</p>}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {value}
        </div>
      )}
    </div>
  );
};
