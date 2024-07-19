/* eslint-disable react/prop-types */
import {
  MoreHorizontal,
  Trash,
  FolderPen,
  ChevronDown,
  ChevronRight,
  Plus,
  Settings,
  CornerUpRight,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import UseDocuments from "@/pages/main/useDocuments";
import TeamspaceSettingModal from "./settings/teamspace-setting-modal";
import { useState } from "react";
import NotionLogo from "./NotionLogo";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMediaQuery } from "@uidotdev/usehooks";
import PopoverBox from "./TrashBox";
import { IconPicker } from "./icon-picker";

export const Item = ({
  id,
  label,
  onClick,
  Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
  doc,
  setEdit,
  setUpdateDocument,
  isFavorite,
  handleEdit,
  className,
}) => {
  const {
    deleteMutation,
    createMutation,
    deleteTeamspaceMutation,
    archiveTeamspaceMutation,
    archiveDocumentMutation,
    createFavoriteMutation,
    removeFavoriteMutation,
    updateMutation,
  } = UseDocuments();
  const [modal, setModal] = useState(false);
  const onDelete = (event) => {
    event.stopPropagation();
    if (level === -1) {
      deleteTeamspaceMutation(id);
    } else {
      deleteMutation(id, level);
    }
  };
  const onArchive = (event) => {
    event.stopPropagation();
    if (level === -1) {
      console.log("archive Teamspace", id);
      archiveTeamspaceMutation(id);
    } else {
      console.log("archive document", id, level);
      archiveDocumentMutation(id, level);
    }
  };
  const handleExpand = (event) => {
    event.stopPropagation();
    onExpand?.();
  };
  const onCreate = (event) => {
    event.stopPropagation();
    if (!id) return;
    let data = {
      title: "Untitled",
      parentDocument: id,
      adminId: doc.adminId,
      teamspaceId: doc.type === "teamspace" ? doc._id : doc.teamspaceId,
    };
    const promise = createMutation(data, level).then((documentId) => {
      if (!expanded) {
        return onExpand?.();
      }
      if (expanded) {
        onExpand?.();
      }
      onExpand?.();
      // router.push(`/documents/${documentId}`);
    });
  };
  const onIconSelect = (icon) => {
    // console.log("onIconSelect", {
    //   id: doc._id,
    //   icon,
    // });
    updateMutation(
      {
        ...doc,
        icon: icon,
      },
      level
    );
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const isMobile = useMediaQuery("only screen and (max-width : 768px)");
  return (
    <div
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {!Icon && (
        <IconPicker onChange={onIconSelect}>
          {
            documentIcon ? (
              <p className="text-6xl hover:opacity-75 transition">
                <div className="shrink-0 mr-2 text-[10px]">
                  <NotionLogo letter={documentIcon} />
                </div>
              </p>
            ) : (
              // <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
              // (level === -1 || isFavorite) && (
              <p className="text-6xl hover:opacity-75 transition">
                <div className="shrink-0 mr-2 text-[10px]">
                  <NotionLogo letter={doc?.title?.substring(0, 1)} />
                </div>
              </p>
            )
            // )
          }
        </IconPicker>
      )}
      {Icon}
      {/* {doc?.title} */}
      <span
        onClick={(event) => {
          // event.preventDefault();
          // event.stopPropagation();
          if (onClick) onClick();
        }}
        className="truncate w-[100%] flex items-start"
      >
        {label}
      </span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              {!isFavorite && (
                <>
                  <DropdownMenuItem onClick={onDelete}>
                    <Trash className="h-4 w-4 mr-2 text-red-700" />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {level === -1 && !isFavorite ? (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <TeamspaceSettingModal
                    doc={doc}
                    setOpenModal={setModal}
                    openModal={modal}
                  >
                    <span className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Teamspace settings
                    </span>
                  </TeamspaceSettingModal>
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      // setEdit(true);
                      // setUpdateDocument(doc);
                      handleEdit(doc);
                    }}
                  >
                    <FolderPen className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  {doc?.favorites?.includes(doc.adminId) || isFavorite ? (
                    <>
                      <DropdownMenuItem
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeFavoriteMutation(doc);
                        }}
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Remove from Favorites
                      </DropdownMenuItem>
                      <Popover className="w-full ">
                        <div
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          className="px-2 py-1.5  relative flex cursor-default select-none items-center rounded-sm text-sm font-[14px] font-sans"
                        >
                          <PopoverTrigger className="w-full">
                            {/* <Item
                              label="Move to"
                              Icon={<CornerUpRight className="h-4 w-4 mr-2 " />}
                              level={-2}
                            /> */}
                            <span className="flex items-center">
                              <CornerUpRight className="h-4 w-4 mr-2 " />
                              <label>Move to</label>
                            </span>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0 w-72"
                            side={isMobile ? "bottom" : "right"}
                          >
                            <PopoverBox isMoveTo id={doc?._id} />
                          </PopoverContent>
                        </div>
                      </Popover>
                    </>
                  ) : (
                    <DropdownMenuItem
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        createFavoriteMutation(doc);
                      }}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Add to Favorites
                    </DropdownMenuItem>
                  )}
                </>
              )}
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {!isFavorite && (
            <div
              role="button"
              onClick={onCreate}
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
