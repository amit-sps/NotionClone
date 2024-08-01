import { useAuth } from "@/context/auth";
import useSWR, { useSWRConfig } from "swr";
import {
  createDocument,
  createDocumentOptions,
  getDocument,
  deleteDocument,
  deleteDocumentOptions,
  updateDocument,
  updateDocumentOptions,
  createTeamspaceDocument,
  deleteTeamspaceDocument,
  removeTrashDocument,
  addArchiveDocument,
  createFavoriteDocument,
  removeFavoriteDocument,
  moveFavoriteDocument,
  RemoveIconDocument,
  updatePageOptions,
  updatePageContent,
  updatePageContentOptions,
  updateTeamspace,
  updateTeamspaceOptions,
  // updateTitleDocumentOptions,
  // getChildDocument,
  // getTeamspaceDocument,
} from "@/Api/documents";
import { useState } from "react";
// import axios from "axios";
// import {
//   useCreateDocument,
//   useDocumentsLIst,
//   useTeamspaceList,
// } from "@/hooks/Documents";
// import { path } from "@/Api/newtorkPaths";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPrivatePages } from "@/redux/action/privatePage";
const UseDocuments = () => {
  const [isEdit, setEdit] = useState(false);
  const [{ user }] = useAuth();
  const [ID, setID] = useState(undefined);
  const [revalidateTime, setRevalidateTime] = useState(0);
  const [revalidatePage, setRevalidatePage] = useState(0);
  const [expanded, setExpanded] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const onExpand = (documentId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
  const { mutate: reValidate } = useSWRConfig();
  // const { data: teamspaceList } = useTeamspaceList();
  const {
    data: teamspaceList,
    mutate: mutateTeamspaceList,
    // isLoading,
  } = useSWR("http://localhost:3851/api/v1/teamspace", getDocument, {
    onSuccess: (data) => {
      setRevalidateTime(0);
      return data;
    },
    // revalidateOnFocus: false,
    // // revalidateOnMount: false,
    // revalidateOnReconnect: false,
    // // revalidateIfStale: false,
    // refreshWhenOffline: false,
    // refreshWhenHidden: false,
    // refreshInterval: 10000,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    // revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: revalidateTime,
  });

  const {
    data: favoriteList,
    mutate: mutateFavoriteList,
    // isLoading,
  } = useSWR("http://localhost:3851/api/v1/favorite", getDocument, {
    onSuccess: (data) => {
      return data;
    },
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const createFavoriteMutation = async (data) => {
    try {
      await mutateFavoriteList(
        createFavoriteDocument(data._id),
        updateDocumentOptions(data)
      );

      onExpand(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteMutation = async (data) => {
    try {
      await mutateFavoriteList(
        removeFavoriteDocument(data._id),
        deleteDocumentOptions(data._id)
      );
      // reValidate("http://localhost:3851/api/v1/teamspace");
    } catch (error) {
      console.log(error);
    }
  };
  const moveFavoritesMutation = async (data) => {
    try {
      await mutateFavoriteList(
        moveFavoriteDocument(data),
        deleteDocumentOptions(data.id)
      );
      reValidate("http://localhost:3851/api/v1/teamspace");
    } catch (error) {
      console.log(error);
    }
  };

  const createTeamspaceMutation = async (data) => {
    try {
      await mutateTeamspaceList(
        createTeamspaceDocument(data),
        createDocumentOptions(data)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTeamspaceMutation = async (id) => {
    try {
      await mutateTeamspaceList(
        deleteTeamspaceDocument(id),
        deleteDocumentOptions(id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const archiveTeamspaceMutation = async (id) => {
    try {
      await mutateTeamspaceList(
        addArchiveDocument(id),
        deleteDocumentOptions(id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const upadteTeamspaceList = async (data) => {
    try {
      mutateTeamspaceList(updateTeamspace(data), updateTeamspaceOptions(data));
    } catch (error) {
      console.log(error);
    }
  };

  //react query

  // const {
  //   mutate: mutateDocumetsList,
  //   data: documentsList,
  //   isLoading,
  // } = useDocumentsLIst();
  // const { mutate: createMutation } = useCreateDocument();

  const {
    data: documentsList,
    mutate: mutateDocumets,
    isLoading,
  } = useSWR(
    ID && `http://localhost:3851/api/v1/document/getDocuments/${ID}`,
    getDocument,
    {
      onSuccess: (data) => {
        return data;
      },
      // revalidateOnFocus: false,
      // revalidateOnMount: false,
      // revalidateOnReconnect: false,
      // revalidateIfStale: false,
      // refreshWhenOffline: false,
      // refreshWhenHidden: false,
      revalidateOnFocus: false,
      // revalidateOnMount: false,
      revalidateOnReconnect: false,
      // revalidateIfStale: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      // refreshInterval: 10000,
      // refreshInterval: revalidateTime,
      refreshInterval: 0,
    }
  );

  const {
    data: trashList,
    mutate: mutateTrashList,
    // isLoading,
  } = useSWR("http://localhost:3851/api/v1/trash", getDocument, {
    onSuccess: (data) => {
      return data;
    },
    revalidateOnFocus: false,
    // revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const removeTrashMutation = async (id) => {
    try {
      await mutateTrashList(removeTrashDocument(id), deleteDocumentOptions(id));
      setRevalidateTime(1000);
      dispatch(getPrivatePages())

    } catch (error) {
      console.log(error);
    }
  };

  const createMutation = async (data) => {
    try {
      await mutateDocumets(createDocument(data), createDocumentOptions(data));
      dispatch(getPrivatePages())
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMutation = async (id) => {
    try {
      await mutateDocumets(deleteDocument(id), deleteDocumentOptions(id));
    } catch (error) {
      console.log(error);
    }
  };
  const archiveDocumentMutation = async (id) => {
    try {
      await mutateDocumets(addArchiveDocument(id), deleteDocumentOptions(id));
      onExpand?.();
    } catch (error) {
      console.log("archive", error);
    }
  };
  const updateMutation = async (data) => {
    try {
      console.log("Updating the doc", data);
      let res = await mutateDocumets(
        updateDocument(data),
        updateDocumentOptions(data)
      );
      console.log("Updating the doc", res);
    } catch (error) {
      console.log(error);
    }
  };

  const removeIconDocMutation = async (data) => {
    try {
      await mutateDocumets(
        RemoveIconDocument(data),
        updateDocumentOptions(data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: page,
    isLoading: isLoadingPage,
    mutate: mutatePage,
  } = useSWR(id ? `http://localhost:3851/api/v1/page/${id}` : "", getDocument, {
    onSuccess: (data) => {
      setRevalidatePage(0);
      return data;
    },
    //by using this command the page will not revalidate on every change event
    // revalidateOnFocus: false,
    // // revalidateOnMount: false,
    // revalidateOnReconnect: false,
    // revalidateIfStale: false,
    // refreshWhenOffline: false,
    // refreshWhenHidden: false,
    // refreshInterval: 0,
    /////////////////////////
    revalidateOnFocus: false,
    // revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });
  const updatePageCoverImageMutation = async (data) => {
    console.log("cover updatePageCoverImageMutation", data);
    try {
      await mutatePage(updateDocument(data), updatePageOptions(data));
    } catch (error) {
      console.log(error);
    }
  };
  const updateTitleMutation = async (data) => {
    try {
      await mutatePage(updateDocument(data), updatePageOptions(data));
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: pageContent,
    isLoading: isLoadingPageContent,
    mutate: mutatePageContent,
  } = useSWR(
    id ? `http://localhost:3851/api/v1/page/page-content/${id}` : "",
    getDocument,
    {
      onSuccess: (data) => {
        return data;
      },
      revalidateOnFocus: false,
      // revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  const updatePageContentMutation = async (data) => {
    try {
      await mutatePageContent(
        updatePageContent(data),
        updatePageContentOptions(data)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return {
    teamspaceList,
    // mutateDocumetsList,
    documentsList,
    favoriteList,
    trashList,
    // documents,
    createMutation,
    deleteMutation,
    updateMutation,
    isEdit,
    setEdit,
    isLoading,
    setID,
    // getDocumentByParentId,
    createTeamspaceMutation,
    deleteTeamspaceMutation,
    removeTrashMutation,
    archiveTeamspaceMutation,
    archiveDocumentMutation,
    createFavoriteMutation,
    removeFavoriteMutation,
    moveFavoritesMutation,
    expanded,
    setExpanded,
    onExpand,
    isLoadingPage,
    page,
    removeIconDocMutation,
    updatePageCoverImageMutation,
    updatePageContentMutation,
    pageContent,
    updateTitleMutation,
    upadteTeamspaceList,
    mutatePage
  };
};

export default UseDocuments;
