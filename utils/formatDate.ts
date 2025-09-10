export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  // Supprime l'heure pour comparer uniquement les jours
  const toDayString = (d: Date) => d.toDateString();

  // Aujourd'hui
  if (toDayString(date) === toDayString(now)) {
    return "Aujourd'hui";
  }

  // Hier
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (toDayString(date) === toDayString(yesterday)) {
    return "Hier";
  }

  // Avant-hier
  const dayBeforeYesterday = new Date(now);
  dayBeforeYesterday.setDate(now.getDate() - 2);
  if (toDayString(date) === toDayString(dayBeforeYesterday)) {
    return "Avant-hier";
  }

  // Format JJ/MM/AAAA
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mois commence à 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
