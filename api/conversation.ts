import api from "@/utils/axios";

interface IGetConversationsParams {
  limit?: string;
  offset?: string;
}

export const getConversations = async (params?: IGetConversationsParams) => {
  const resp = await api.get(`/api/v1/conversations`, {
    params: params || {}
  });

  return resp.data;
};



export const getConversationById = async (conversationId: string) => {
  const resp = await api.get(`/api/v1/conversations/${conversationId}`);

  return resp.data;
};