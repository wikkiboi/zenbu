export const isValidDate = (dateString: string | unknown): boolean => {
  if (typeof dateString !== "string") return false;
  const regex = /^(?:\d{4}(-\d{2}(-\d{2})?)?)$/;
  return regex.test(dateString);
};
