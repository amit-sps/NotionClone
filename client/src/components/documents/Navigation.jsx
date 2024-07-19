/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
  MoreHorizontal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useLocation, useParams } from "react-router-dom";
import UserItem from "./UserItem";
import axios from "axios";
import { Button } from "../ui/button";
import { Item } from "./Item";
import UseDocuments from "@/pages/main/useDocuments";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import DocumentList from "./DocumentList";
// import { useTeamspaceList } from "@/hooks/Documents";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import TrashBox from "./TrashBox";
import PopoverBox from "./TrashBox";
import { Navbar } from "./Navbar";
const Navigation = ({ user }) => {
  const { pathname } = useLocation();
  const {
    isEdit,
    setEdit,
    updateMutation,
    createMutation,
    teamspaceList,
    favoriteList,
    trashList,
    createTeamspaceMutation,
    deleteTeamspaceMutation,
  } = UseDocuments();
  const search = useSearch();
  const settings = useSettings();
  const isMobile = useMediaQuery("only screen and (max-width : 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [updateDocument, setUpdateDocument] = useState({});

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  const handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    console.log("mousemove", event);

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleUpdateChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setUpdateDocument((pre) => {
      return { ...pre, title: event.target.value };
    });
  };
  const [expanded, setExpanded] = useState({});

  const onExpand = (documentId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
  const onCreate = (event) => {
    event.stopPropagation();
    // console.log("onCreate");
    if (!user?._id) return;
    let data = {
      title: "Teamspace" + teamspaceList?.length,
      adminId: user._id,
      description: "",
    };
    const promise = createTeamspaceMutation(data);
  };

  const { id: documentId } = useParams();
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar  bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item
            label="Search"
            // isSearch
            Icon={
              <Search className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
            }
            onClick={search.onOpen}
          />
          <Item
            label="Settings"
            Icon={
              <Settings className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
            }
            onClick={settings.onOpen}
          />
          <Item
            onClick={createMutation}
            label="New page"
            Icon={
              <PlusCircle className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
            }
          />
        </div>
        <div className="mt-4 ml-2">
          <div className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium">
            <span className="truncate">Favorites</span>
          </div>
        </div>

        <div className="max-h-[400px] overflow-hidden hover:overflow-y-scroll hover:border-b">
          {favoriteList?.length ? (
            favoriteList?.map((document) => (
              <div className="mt-2">
                {isEdit && updateDocument?._id == document?._id ? (
                  <input
                    type="text"
                    value={updateDocument?.title}
                    onChange={handleUpdateChange}
                    onBlur={() => {
                      updateMutation(updateDocument);
                      setEdit(false);
                    }}
                  />
                ) : (
                  <Item
                    label={document.title}
                    id={document._id}
                    documentIcon={document?.icon}
                    onExpand={() => onExpand(document._id)}
                    expanded={expanded[document._id]}
                    isFavorite={true}
                    doc={document}
                    isEdit={isEdit}
                    setEdit={setEdit}
                    setUpdateDocument={setUpdateDocument}
                    updateDocument={updateDocument}
                    level={-1}
                  />
                )}

                {expanded[document._id] && (
                  <DocumentList
                    parentDocumentId={document._id}
                    level={1}
                    isFavorite={true}
                  />
                )}
              </div>
            ))
          ) : (
            <p
              style={{
                paddingLeft: `12px`,
              }}
              className={cn(
                "hidden text-sm font-medium text-muted-foreground/80",
                !favoriteList?.length && "block"
              )}
            >
              No pages inside
            </p>
          )}
        </div>
        <div className="mt-4 ml-2">
          <div className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium">
            <span className="truncate">Teamspace</span>
            <div
              role="button"
              onClick={onCreate}
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="max-h-[500px] overflow-hidden hover:overflow-y-scroll hover:border-b">
          {teamspaceList?.length >= 1 ? (
            <>
              {teamspaceList?.map((teamspace) => {
                return (
                  <>
                    <div className="mt-2">
                      <Item
                        label={teamspace.title}
                        id={teamspace._id}
                        documentIcon={teamspace?.icon}
                        onExpand={() => onExpand(teamspace._id)}
                        expanded={expanded[teamspace._id]}
                        level={-1}
                        parentDocumentId={teamspace._id}
                        doc={teamspace}
                        teamspaceId={teamspace._id}
                      />
                      {expanded[teamspace._id] && (
                        <DocumentList
                          parentDocumentId={teamspace._id}
                          level={1}
                          teamspaceId={teamspace._id}
                        />
                      )}
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <p
              style={{
                paddingLeft: `12px`,
              }}
              className={cn(
                "hidden text-sm font-medium text-muted-foreground/80",
                !teamspaceList?.length && "block"
              )}
            >
              No pages inside
            </p>
          )}
        </div>
        <div className="mt-4 ml-2">
          <div className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium">
            <span className="truncate">Privates</span>
            <div
              role="button"
              onClick={onCreate}
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        {/* <DocumentList /> */}
        {/* {documents?.length !== 0 &&
          documents?.map((doc) => {
            return (
              <div className="mt-4 flex justify-between" key={doc?.id}>
                {isEdit && updateDocument._id == doc._id ? (
                  <input
                    type="text"
                    value={updateDocument.title}
                    onChange={handleUpdateChange}
                    onBlur={() => {
                      console.log("updateDocument", updateDocument);
                      updateMutation(updateDocument);
                      setEdit(false);
                    }}
                  />
                ) : (
                  <>
                    <Item
                      doc={doc}
                      setEdit={setEdit}
                      setUpdateDocument={setUpdateDocument}
                      id={doc._id}
                      documentIcon={doc?.icon}
                    />
                  </>
                )}
              </div>
            );
          })} */}

        <Popover>
          <PopoverTrigger className="w-full mt-4">
            <Item
              label="Trash"
              Icon={
                <Trash className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
              }
              className="flex items-start"
            />
          </PopoverTrigger>
          <PopoverContent
            className="p-0 w-72"
            side={isMobile ? "bottom" : "right"}
          >
            <PopoverBox />
          </PopoverContent>
        </Popover>
        <div
          onMouseDown={handleMouseDown} // for reseting the width of sidebar
          onClick={resetWidth} // for reseting the height of sidebar on click
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
      
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
