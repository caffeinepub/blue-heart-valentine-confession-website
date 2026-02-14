const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      reject(new Error('Invalid file type. Please upload an image (JPEG, PNG, GIF, or WebP).'));
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('File too large. Please upload an image smaller than 5MB.'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result as string);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file.'));
    };
    
    reader.readAsDataURL(file);
  });
}
