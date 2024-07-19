/* eslint-disable react/prop-types */
import { useState } from "react";
import { Search, Trash, Undo, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// import Spinner  from "@/components/spinner";
import { Input } from "@/components/ui/input";
import UseDocuments from "@/pages/main/useDocuments";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";

const PopoverBox = ({ isMoveTo, id }) => {
  const {
    trashList: documents,
    teamspaceList,
    removeTrashMutation,
    moveFavoritesMutation,
  } = UseDocuments();
  const navigate = useNavigate();
  //   const router = useRouter();
  //   const params = useParams();
  //   const documents = useQuery(api.documents.getTrash);
  //   const restore = useMutation(api.documents.restore);
  //   const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = (isMoveTo ? teamspaceList : documents)?.filter(
    (document) => {
      return document.title.toLowerCase().includes(search.toLowerCase());
    }
  );

  const onClick = (documentId) => {
    navigate(`/documents/${documentId}`);
  };

  const onRestore = (event, document) => {
    event.stopPropagation();

    // if (document.type === "teamspace") {
    console.log("onRestore", document);
    removeTrashMutation(document._id, document.type);
    // }

    // const promise = restore({ id: documentId });

    // toast.promise(promise, {
    //   loading: "Restoring note...",
    //   success: "Note restored!",
    //   error: " Failed to restore note.",
    // });
  };

  const onRemove = (documentId) => {
    // const promise = remove({ id: documentId });
    // toast.promise(promise, {
    //   loading: "Deleting note...",
    //   success: "Note deleted!",
    //   error: " Failed to delete note.",
    // });
    // if (params.documentId === documentId) {
    //  navigate("/documents");
    // }
  };

  //   if (documents === undefined) {
  //     return (
  //       <div className="h-full flex items-center justify-center p-4">
  //         <Spinner size="lg" />
  //       </div>
  //     );
  //   }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {isMoveTo && (
          <p className="text-md  text-muted-foreground pb-4 ml-4">Teamspaces</p>
        )}
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => {
              console.log(
                "documentdocumentdocumentdocumentdocumentdocument",
                document
              );
              isMoveTo
                ? moveFavoritesMutation({
                    id: id,
                    parentDocument: document._id,
                    teamspaceId:
                      document?.type === "teamspace"
                        ? document._id
                        : document?.teamspaceId,
                  })
                : onClick(document._id);
            }}
            className={`text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between ${
              isMoveTo && "mb-2 cursor-pointer"
            }`}
          >
            <span className="flex items-center">
              {isMoveTo && <ChevronRight className="h-4 w-4" />}
              <span className="truncate pl-2">{document.title}</span>
            </span>
            <div className="flex items-center">
              {isMoveTo ? null : (
                <>
                  <div
                    onClick={(e) => onRestore(e, document)}
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  >
                    <Undo className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <ConfirmModal onConfirm={() => onRemove(document._id)}>
                    <div
                      role="button"
                      className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                    >
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </ConfirmModal>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopoverBox;
