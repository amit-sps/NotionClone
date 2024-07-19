import Navigation from "@/components/documents/Navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import empty from "@/assets/empty.png";
import emptyDark from "@/assets/empty-dark.png";
import { useAuth } from "@/context/auth";
import UseDocuments from "./useDocuments";
import SearchCommand from "@/components/documents/SearchCommand";
import { ModalProvider } from "@/context/modal-provider";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getDocument } from "@/Api/documents";
import SettingModal from "@/components/documents/settings/teamspace-setting-modal";
import { SettingsModal } from "@/components/documents/SettingModal";
import DocumentIdPage from "./DocumentPage";
import PageNotFound from "@/components/PageNotFound";
import { useEffect } from "react";
const Documents = () => {
  const {
    documents,
    createMutation,
    page,
    isLoadingPage: isLoading,
  } = UseDocuments();
  const [{ user }, setAuth, socket] = useAuth();
  const { id } = useParams();

  //socket
  useEffect(() => {
    console.log(page, socket.current);
    // sending the page to the server for starting the realtime updation
    socket.current?.emit("addPage", { ...page, userId: user._id });
  }, [page?._id]);

  return (
    <>
      <div className="min-h-full flex dark:bg-[#1F1F1F] ">
        <Navigation user={user} />
        <main className="flex-1 overflow-y-auto">
          <SearchCommand />
          <ModalProvider id={id} />
          {id && !isLoading ? (
            page?._id ? (
              <DocumentIdPage documentId={page?._id} page={page} />
            ) : (
              <PageNotFound />
            )
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-4 border">
              <img
                src={empty}
                height="300"
                width="300"
                alt="Empty"
                className="dark:hidden"
              />
              <img
                src={emptyDark}
                height="300"
                width="300"
                alt="Empty"
                className="hidden dark:block"
              />
              <h2 className="text-lg font-medium">
                Welcome to {user?.name}&apos;s Notion
              </h2>
              <Button
                onClick={() =>
                  createMutation({
                    title: `document`,
                    adminId: user?._id,
                  })
                }
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
              </Button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Documents;
