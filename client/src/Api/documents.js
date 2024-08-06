/* eslint-disable react-hooks/rules-of-hooks */
import { convertDateToNumber } from "@/lib/utils";
import { path } from "./newtorkPaths";
// import axios from "axios";
import axios from "@/axiosConfig";
// import NetworkApi from "./networkApi";
import NetworkApi from "./jwtInterceptor";

export const createDocument = async (data, callback) => {
  const res = await NetworkApi.post(path.createDocument, data);
  if(callback){
    callback();
  }
  return res.data.data;
};
export const createFavoriteDocument = async (id) => {
  const res = await NetworkApi.post(`${path.addToFavorites}/${id}`);
  return res.data.data;
};
export const createTeamspaceDocument = async (data) => {
  const res = await NetworkApi.post(path.teamspaceList, data);
  return res.data.data;
};

export const getDocument = async (...data) => {
  const res = await NetworkApi.get(...data);
  return res.data.data;
};

// export const getTeamspaceDocument = async (...data) => {
//   const res = await NetworkApi.get(...data);
//   console.log("teamspace", res.data.data);
//   return res.data.data;
// };
// export const getChildDocument = async (...data) => {
//   const res = await NetworkApi.get(...data);
//   console.log("getChildDocument", res.data.data);
//   return res.data.data;
// };
export const deleteDocument = async (id, callback) => {
  const res = await NetworkApi.delete(`${path.deleteDocument}/${id}`);
  if(callback){
    callback();
  }
  return res;
};

export const addArchiveDocument = async (id) => {
  try {
    const res = await NetworkApi.post(`${path.addArchive}/${id}`);
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteTeamspaceDocument = async (id) => {
  const res = await NetworkApi.delete(`${path.teamspaceList}/${id}`);
  return res;
};
export const removeFavoriteDocument = async (id) => {
  const res = await NetworkApi.delete(`${path.removeFavorite}/${id}`);
  return res;
};
export const moveFavoriteDocument = async (data) => {
  const res = await NetworkApi.put(`${path.moveDocument}/${data.id}`, data);
  return res;
};

export const updateDocument = async (data) => {
  console.log("cover updateDocument", data);
  const res = await NetworkApi.put(`${path.updateDocument}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // reValidate(
  //   `http://localhost:3851/api/v1/document/getDocuments/${res.data.data._id}`
  // );
  // reValidate(`http://localhost:3851/api/v1/page/${res.data.data._id}`);
  // console.log("Updating the doc", "revalidate");

  return res.data.data;
};
export const updateTeamspace = async (data) => {
  const res = await NetworkApi.put(`${path.updateDocument}`, data);
  return res.data.data;
};

export const updateUserData = async (data) => {
  const res = await NetworkApi.put(`${path.updateUser}`, data);
  return res.data.data;
};
export const updateUserDataOptions = async (data) => {
  return {
    optimisticData: (dataList) => {
      return dataList;
    },
    rollbackOnError: true,
    populateCache: (updated, OldDataList) => {
      return OldDataList;
    },
    revalidate: true,
  };
};
export const RemoveIconDocument = async (data) => {
  const res = await NetworkApi.put(`${path.removeIconDoc}`, data);
  return res.data.data;
};

export const createDocumentOptions = (data) => {
  return {
    optimisticData: (dataList) => [...dataList, data],
    rollbackOnError: true,
    populateCache: (newData, OldDataList) => [...OldDataList, newData],
    revalidate: true,
  };
};

export const deleteDocumentOptions = (id) => {
  return {
    optimisticData: (dataList) => {
      console.log("archive optimisticData", dataList);
      return dataList?.filter((doc) => {
        return doc._id !== id;
      });
    },
    rollbackOnError: true,
    populateCache: (emptyResObject, OldDataList) => {
      console.log("archive OldDataList", OldDataList);

      return OldDataList?.filter((doc) => {
        return doc._id !== id;
      });
    },
    revalidate: true,
  };
};
export const updatePageOptions = (data) => {
  console.log("pageData data", data);

  return {
    optimisticData: (dataList) => {
      console.log("pageData optimisticData", dataList);
      return dataList;
    },
    rollbackOnError: true,
    populateCache: (updated, OldDataList) => {
      console.log("pageData populateCache", OldDataList, updated);

      return OldDataList;
    },
    revalidate: true,
  };
};
// updateTeamspaceOptions
export const updateTeamspaceOptions = (data) => {
  return {
    optimisticData: (dataList) => {
      const prevDocuments = dataList?.filter((doc) => doc._id !== data._id);
      return [...prevDocuments, data].sort(
        (a, b) =>
          convertDateToNumber(a.createdAt) - convertDateToNumber(b.createdAt)
      );
    },
    rollbackOnError: true,
    //first param is updated res
    populateCache: (updated, OldDataList) => {
      const prevDoc = OldDataList.filter((doc) => {
        return doc._id !== data._id;
      });
      return [...prevDoc, updated].sort(
        (a, b) =>
          convertDateToNumber(a.createdAt) - convertDateToNumber(b.createdAt)
      );
    },
    revalidate: false,
  };
};
export const updateDocumentOptions = (data) => {
  console.log("updateDocumentOptions", data);
  return {
    optimisticData: (dataList) => {
      const prevDocuments = dataList?.filter((doc) => doc._id !== data._id);
      return [...prevDocuments, data].sort(
        (a, b) =>
          convertDateToNumber(a.createdAt) - convertDateToNumber(b.createdAt)
      );
    },
    rollbackOnError: true,
    //first param is updated res
    populateCache: (updated, OldDataList) => {
      const prevDoc = OldDataList.filter((doc) => {
        return doc._id !== data._id;
      });
      return [...prevDoc, updated].sort(
        (a, b) =>
          convertDateToNumber(a.createdAt) - convertDateToNumber(b.createdAt)
      );
    },
    revalidate: true,
  };
};

// apis by using react query instead swr
// export const getTeamspaceList = async () => {
//   try {
//     const { data } = await NetworkApi.get(path.teamspaceList);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const getDocumentList = async (ids) => {
//   console.log("getDocumentList", ids);
//   try {
//     const { data } = await NetworkApi.get(`${path.documentList}/${ids}`);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const getCreateDocument = async (body) => {
//   try {
//     const { data } = await NetworkApi.post(path.createDocument, body);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const removeTrashDocument = async (id) => {
  try {
    const { data } = await NetworkApi.post(`${path.removeTrash}/${id}`);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updatePageContent = async (data) => {
  console.log("updatePageContentupdatePageContent", data);
  const res = await NetworkApi.put(
    `${path.updatePageContent}/${data.id}`,
    data
  );
  return res.data;
};

export const updatePageContentOptions = (data) => {
  console.log("updatePageContentOptions", data);
  return {
    optimisticData: (dataList) => {
      console.log("pageData optimisticData", dataList);
      return dataList;
    },
    rollbackOnError: true,
    populateCache: (updated, OldDataList) => {
      console.log("pageData populateCache", OldDataList, updated);

      return OldDataList;
    },
    revalidate: true,
  };
};
// export const updateTitleDocumentOptions = (data) => {
//   console.log("updateTitleDocumentOptions", data);
//   return {
//     optimisticData: (dataList) => {
//       console.log(
//         "updateTitleDocumentOptions optimisticData",
//         { dataList },
//         { data }
//       );

//       const prevDocuments = dataList?.filter((doc) => doc._id !== data._id);
//       return [...prevDocuments, data];
//     },
//     rollbackOnError: true,
//     //first param is updated res
//     populateCache: (updated, OldDataList) => {
//       console.log(
//         "updateTitleDocumentOptions optimisticData",
//         { updated },
//         { OldDataList },
//         { data }
//       );

//       const prevDoc = OldDataList.filter((doc) => {
//         return doc._id !== data._id;
//       });
//       return [...prevDoc, updated];
//     },
//     revalidate: true,
//   };
// };
