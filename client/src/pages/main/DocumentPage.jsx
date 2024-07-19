import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
// import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Toolbar } from "@/components/documents/toolbar";
import { Cover } from "@/components/documents/cover";
// import Editor from "@/components/documents/editor";
import UseDocuments from "./useDocuments";
import PageNotFound from "@/components/PageNotFound";
import { useAuth } from "@/context/auth";
// import { Toolbar } from "@/components/documents/toolbar";

const DocumentIdPage = ({ documentId, page: document }) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/documents/editor"), { ssr: false }),
    []
  );
  //    const document = useQuery(api.documents.getById, {
  //     documentId: params.documentId,
  //   });
  const [content, setContent] = useState("");
  const [{ user }, setAuth, socket] = useAuth();
  //   const update = useMutation(api.documents.update);
  const { updatePageContentMutation, pageContent } = UseDocuments();
  const [incomingContent, setIncomingContent] = useState(pageContent?.content);
  console.log("documentdocument", document, pageContent);
  const onChange = (content) => {
    setContent(content);
  };
  useEffect(() => {
    if (content) {
      //Update the page content in DB
      const call = setTimeout(() => {
        updatePageContentMutation({
          id: pageContent._id,
          content,
        });
        socket.current.emit("editPage", {
          ...document,
          content: content,
          userId: user._id,
        });
        return () => clearTimeout(call);
      }, 500);
    }
  }, [content]);
  useEffect(() => {
    socket.current.on("getPage", (data) => {
      console.log("socket getPage", data.page.content);
      setIncomingContent(data?.page.content);
    });
  }, []);

  // useEffect(() => {

  // }, [incomingContent, content]);

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <PageNotFound />;
  }

  return (
    <div className="pb-40">
      <Cover url={document?.coverImage} id={documentId} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor
          onChange={onChange}
          // initialContent={pageContent?.content}
          initialContent={incomingContent}
          editable={true}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
