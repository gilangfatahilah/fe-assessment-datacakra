export const formatDate = (date: string): string => {
    const newDate = new Date(date);

    return newDate.toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        timeZone: "Asia/Jakarta"
    });

}