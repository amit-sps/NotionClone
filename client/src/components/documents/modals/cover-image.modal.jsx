import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "../single-image-dropzone";
import useDocuments from "@/pages/main/useDocuments";
// import { SingleImageDropzone } from "@/components/single-image-dropzone";
// import { useEdgeStore } from "@/lib/edgestore";

export const CoverImageModal = ({ id }) => {
  const coverImage = useCoverImage();
  const { updatePageCoverImageMutation } = useDocuments();
  //   const { edgestore } = useEdgeStore();

  const [file, setFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose(file);
  };

  const onChange = async (inputFile) => {
    console.log("cover image inputFile:", inputFile);
    setIsSubmitting(true);
    setFile(inputFile);
    const formData = new FormData();
    if (!inputFile) return;
    if (inputFile) {
      formData.append("_id", id);
      formData.append("coverImage", inputFile);
      formData.append("file", file);
      formData.append("isCoverImage", true);
      updatePageCoverImageMutation(formData);
      console.log("coverImage formData", inputFile, id);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
          setFile={setFile}
        />
      </DialogContent>
    </Dialog>
  );
};
