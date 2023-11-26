type isoString = string | number | Date;

const formatDate = (
  isoString: isoString,
  options: Intl.DateTimeFormatOptions | undefined
) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", options);
};

export const getDay = (isoString: isoString) =>
  formatDate(isoString, { day: "numeric" });
export const getMonth = (isoString: isoString) =>
  formatDate(isoString, { month: "short" });

export const formatTime = (isoString: isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
