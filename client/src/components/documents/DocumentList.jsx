/* eslint-disable react-hooks/rules-of-hooks */
import UseDocuments from "@/pages/main/useDocuments";
import React, { memo, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Item } from "./Item";
import { FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useAuth } from "@/context/auth";
import { IconPicker } from "./icon-picker";
import NotionLogo from "./NotionLogo";
import { useDispatch, useSelector } from "react-redux";
import { getTeamspaceDocuments } from "@/redux/action/teamspace";
const DocumentList = ({ parentDocumentId, level = 0, isFavorite }) => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [updateDocument, setUpdateDocument] = useState({});
  const {
    // documentsList,
    isEdit,
    setEdit,
    updateMutation,
    setID,
    expanded,
    onExpand,
  } = UseDocuments();
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { documentsList } = useSelector((state) => state.TeamSpaceReducer);

  console.log(documentsList);

  useEffect(() => {
    if (parentDocumentId) {
      setID(parentDocumentId);
      dispatch(getTeamspaceDocuments(parentDocumentId));
    }
  }, [parentDocumentId]);
  const handleUpdateChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setUpdateDocument((pre) => {
      return { ...pre, title: event.target.value };
    });
  };

  const onRedirect = (documentId) => {
    navigate(`/documents/${documentId}`);
  };

  if (documentsList === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  const onIconSelect = (icon, document) => {
    console.log("onIconSelect", {
      id: document._id,
      icon,
    });
    updateMutation(
      {
        ...document,
        icon: icon,
      },
      level
    );
  };
  const handleEdit = (doc) => {
    setEdit(true);
    setUpdateDocument(doc);
    console.log("  inputRef.current?.focus();", inputRef.current);
    setTimeout(() => {
      inputRef.current?.focus();
      // inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  return (
    <>
      {" "}
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documentsList[parentDocumentId] &&
        documentsList[parentDocumentId].map((document) => (
          <div key={document._id}>
            {isEdit && updateDocument?._id === document?._id ? (
              <span className="border">
                <IconPicker document={document} onChange={onIconSelect}>
                  {document?.icon
                    ? document?.icon
                    : (level === -1 || isFavorite) && (
                        <p className="text-6xl hover:opacity-75 transition">
                          <div className="shrink-0 mr-2 text-[18px]">
                            <NotionLogo
                              letter={document?.title?.substring(0, 1)}
                            />
                          </div>
                        </p>
                      )}
                </IconPicker>
                <input
                  type="text"
                  ref={inputRef}
                  value={updateDocument?.title}
                  onChange={handleUpdateChange}
                  onBlur={() => {
                    console.log("updateDocument", updateDocument);
                    updateMutation(updateDocument, level);
                    setEdit(false);
                  }}
                  className="editInput dark:text-black ml-2 rounded-sm px-1"
                />
              </span>
            ) : (
              <Item
                id={document._id}
                onClick={() => onRedirect(document._id)}
                label={document.title}
                icon={FileIcon}
                documentIcon={document.icon}
                active={documentId === document._id}
                level={level}
                onExpand={() => onExpand(document._id)}
                expanded={expanded[document._id]}
                setUpdateDocument={setUpdateDocument}
                setEdit={setEdit}
                doc={document}
                isFavorite={isFavorite}
                handleEdit={handleEdit}
              />
            )}
            {expanded[document._id] && (
              <DocumentList
                isFavorite={isFavorite}
                parentDocumentId={document._id}
                level={level + 1}
              />
            )}
          </div>
        ))}
    </>
  );
};

export default memo(DocumentList);
