export const generateDownloadLink = (data: any) => {
  const blob: Blob = new Blob([data.blob], {
    type: "audio/mp3"
  });
  return URL.createObjectURL(blob);
};

export const revokeURLs = (sources: string[] = []) => {
  if(!sources.length) return;
  sources.forEach(src => {
    URL.revokeObjectURL(src);
  })
};

