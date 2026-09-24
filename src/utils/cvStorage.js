const CV_STORAGE_KEY = "cvforge_data";

export const saveCVData = (data) => {
  localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(data));
};

export const getCVData = () => {
  const data = localStorage.getItem(CV_STORAGE_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const clearCVData = () => {
  localStorage.removeItem(CV_STORAGE_KEY);
};