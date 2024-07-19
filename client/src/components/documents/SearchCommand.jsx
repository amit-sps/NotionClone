import { useEffect, useState } from "react";
import { File } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { useAuth } from "@/context/auth";
import useSWR from "swr";
import { getDocument } from "@/Api/documents";
import UseDocuments from "@/pages/main/useDocuments";
import { Link, NavLink } from "react-router-dom";
const SearchCommand = () => {
  const {
    data: DocumentList,
    isLoading: isLoadingPage,
    mutate: mutatePage,
  } = useSWR(
    `http://localhost:3851/api/v1/document/document-search`,
    getDocument,
    {
      onSuccess: (data) => {
        return data;
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
    }
  );
  const { teamspaceList } = UseDocuments();

  const [{ user }] = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id) => {
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput placeholder={`Search ${user?.name}'s Notion...`} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <div className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium">
            <span className="truncate">Documents</span>
          </div>
          <CommandGroup
            heading=""
            className={`h-48 overflow-y-auto  overflow-hidden hover:overflow-auto hover:scroll-auto`}
          >
            {DocumentList?.document?.map((document) => (
              <NavLink key={document._id} to={`/documents/${document._id}`}>
                <CommandItem
                  value={`${document._id}-${document.title}`}
                  title={document.title}
                  onSelect={() => onSelect(document._id)}
                  className="cursor-pointer"
                >
                  {document.icon ? (
                    <p className="mr-2 text-[18px]">{document.icon}</p>
                  ) : (
                    <File className="mr-2 h-4 w-4" />
                  )}
                  <span className="truncate pl-2">{document.title}</span>
                </CommandItem>
              </NavLink>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <div className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium">
            <span className="truncate">Teamspace</span>
          </div>
          <CommandGroup
            heading=""
            className={`h-48 overflow-y-auto  overflow-hidden hover:overflow-auto `}
          >
            {DocumentList?.teamspace?.map((document) => (
              <CommandItem
                key={document._id}
                value={`${document._id}-${document.title}`}
                title={document.title}
                onSelect={() => onSelect(document._id)}
                className="cursor-pointer"
              >
                {document.icon ? (
                  <p className="mr-2 text-[18px]">{document.icon}</p>
                ) : (
                  <File className="mr-2 h-4 w-4" />
                )}

                <span className="truncate pl-2">{document.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchCommand;
