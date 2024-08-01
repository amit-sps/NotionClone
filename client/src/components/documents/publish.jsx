import { useState } from "react";
import { toast } from "react-toastify";
import { Check, Copy, Globe } from "lucide-react";
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover";
import { useOrigin } from "@/hooks/user-origin";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { path } from "@/Api/newtorkPaths";
import { useParams } from "react-router-dom";
import UseDocuments from "@/pages/main/useDocuments";

export const Publish = ({ initialData }) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const origin = useOrigin(); // Assuming this hook provides the origin URL
  const url = `${origin}/published/page/${initialData._id}`;
  const { mutatePage } = UseDocuments();

  const onPublishToggle = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      setIsSubmitting(true);
      const { data } = await axios.put(
        `${path.togglePublish}/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      toast.success(data?.message, { autoClose: 1000 });
      mutatePage();
      setIsSubmitting(false);
      setIsModalOpen(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const redirectToUrl = () => {
    if (initialData.isPublished) {
      window.open(url, "_blank");
    }
  };

  return (
    <Popover open={isModalOpen} onOpenChange={setIsModalOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" onClick={() => setIsModalOpen(true)}>
          Publish
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe 
                className="text-sky-500 animate-pulse h-4 w-4 cursor-pointer" 
                onClick={redirectToUrl} 
                title="Go to published page"
              />
              <p className="text-xs font-medium text-sky-500">
                This note is live on the web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onPublishToggle}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublishToggle}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
