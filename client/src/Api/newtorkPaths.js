const baseUrl = "http://localhost:3851";

export const path = {
  createDocument: `${baseUrl}/api/v1/document/create`,
  getDocument: `${baseUrl}/api/v1/document`,
  deleteDocument: `${baseUrl}/api/v1/document/delete-document`,
  updateDocument: `${baseUrl}/api/v1/document/update-document`,
  teamspaceList: `${baseUrl}/api/v1/teamspace`,
  documentList: `${baseUrl}/api/v1/document/getDocuments`,
  removeTrash: `${baseUrl}/api/v1/document//remove-archive-document`,
  addArchive: `${baseUrl}/api/v1/teamspace/archive`,
  addToFavorites: `${baseUrl}/api/v1/favorite`,
  removeFavorite: `${baseUrl}/api/v1/favorite`,
  moveDocument: `${baseUrl}/api/v1/document/move`,
  removeIconDoc: `${baseUrl}/api/v1/document/remove-icon`,
  updatePageContent: `${baseUrl}/api/v1/page/page-content`,
  updateUser: `${baseUrl}/api/v1/user/update-user`,
  sendTeamSpaceInvite: `${baseUrl}/api/v1/teamspace/teamspace-invite`,
  getInvitedMembers: `${baseUrl}/api/v1/teamspace/invited`,
  getPageContent:`${baseUrl}/api/v1/page/page-content`,
  getPage:`${baseUrl}/api/v1/page`,
  togglePublish: `${baseUrl}/api/v1/document/publish`,
  getPublishPage: `${baseUrl}/api/v1/document/publish`,



};
