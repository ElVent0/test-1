export const isInParams = (item, searchParams) => {
  return (
    searchParams.get("tags") === decodeURIComponent(item).toLowerCase() ||
    searchParams.get("companies") === decodeURIComponent(item).toLowerCase() ||
    searchParams.get("positions") === decodeURIComponent(item).toLowerCase()
  );
};
