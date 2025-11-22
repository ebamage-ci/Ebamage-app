import apiClient from "@/services/apiClient";
import {
  IAddArticleRequestClient,
  IAddArticleResponseClient,
  IDecrementArticleCartRequestClient,
  IDecrementArticleCartResponseClient,
  IDeleteArticleCartRequestClient,
  IDeleteArticleCartResponseClient,
  IIncrementArticleCartRequestClient,
  IIncrementArticleCartResponseClient,
  IListCartResponseClient,
} from "@/types/articlesCartClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// add article to cart
export const addArticleCartClient = async (
  data: IAddArticleRequestClient,
  token: string
): Promise<IAddArticleResponseClient> => {
  try {
    const response = await apiClient.post(`/ajout/panier`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};

// get articles cart
export const fetchArticleCartClient = async (
  token: string
): Promise<IListCartResponseClient> => {
  try {
    const response = await apiClient.get(`/panier`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("service get cart", JSON.stringify(response.data, null, 2));

    if (!response?.data?.success) {
      throw response?.data;
    }

    // console.log("--- response.data cart ---", response.data);

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};

// increment quantity of article cart
export const incrementArticleCartClient = async (
  token: string,
  data: IIncrementArticleCartRequestClient
): Promise<IIncrementArticleCartResponseClient> => {
  try {
    const response = await apiClient.post(`/panier/augmenter`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};

// decrement quantity of article cart
export const decrementArticleCartClient = async (
  token: string,
  data: IDecrementArticleCartRequestClient
): Promise<IDecrementArticleCartResponseClient> => {
  try {
    const response = await apiClient.post(`/panier/diminuer`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};

// delete article cart
export const deleteArticleCartClient = async (
  token: string,
  data: IDeleteArticleCartRequestClient
): Promise<IDeleteArticleCartResponseClient> => {
  try {
    const response = await apiClient.post(`/panier/delete`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
