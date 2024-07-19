import { SettingsModal } from "@/components/documents/SettingModal";
import { CoverImageModal } from "@/components/documents/modals/cover-image.modal";
import { useEffect, useState } from "react";

export const ModalProvider = ({ id }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal id={id} />
    </>
  );
};
