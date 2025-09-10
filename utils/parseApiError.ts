export const parseApiError = (error: any) => {
  //1-- cas d'erreur Axios (ex: HTTP 400)
  if (error?.response?.data) {
    return error.response.data;
  }

  //2-- cas d'erreur intentionnel avec status 200
  if (error && typeof error === "object" && "message" in error) {
    return error;
  }

  //3-- fallback pour erreur réseau ou inconnue
  return {
    success: false,
    message: "Une erreur réseau ou inconnue est survenue.",
  };
};
