import { useMutation, useQuery, useQueryClient } from "react-query";

// import {
//   getCreateDocument,
//   getDocumentList,
//   getTeamspaceList,
// } from "@/Api/documents";

// export const useTeamspaceList = () => {
//   const { data, isLoading, error, refetch } = useQuery(
//     ["teamspaceList"],
//     getTeamspaceList,
//     {
//       refetchOnWindowFocus: false,
//       refetchOnmount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: 50000,
//       retryOnMount: false,
//       enabled: true,
//     }
//   );
//   return { data, isLoading, error, refetch };
// };

// export const useDocumentsLIst = () => {
//   const { data, isLoading, error, mutate, status } = useMutation(
//     ["document-list"],
//     (ids) => getDocumentList(ids),
//     {
//       refetchOnWindowFocus: false,
//       refetchOnmount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: 3000,
//       retryOnMount: false,
//       enabled: true,
//     }
//   );
//   return { data, isLoading, error, mutate, status };
// };

// export const useCreateDocument = () => {
//   const { data, isLoading, error, mutate, status } = useMutation(
//     (data) => getCreateDocument(data),
//     {
//       refetchOnWindowFocus: false,
//       refetchOnmount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: 3000,
//       retryOnMount: false,
//       enabled: true,
//     }
//   );
//   return { data, isLoading, error, mutate, status };
// };
// export const useGetDocumentsList=()=>{

//   const { data, isLoading, error, mutate, status } = useMutation(
//     (ids) => getDocumentList(ids),
//     {
//       refetchOnWindowFocus: false,
//       refetchOnmount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: 3000,
//       retryOnMount: false,
//       enabled: true,
//     }
//   );
//   return { data, isLoading, error, mutate, status };
// }
