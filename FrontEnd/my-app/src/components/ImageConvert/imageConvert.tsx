

export const toBase64:any = (file:File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export function getFileExtension(filename:any){
  // get file extension
  const extension = "." + filename.split('.').pop();
  return extension;
}