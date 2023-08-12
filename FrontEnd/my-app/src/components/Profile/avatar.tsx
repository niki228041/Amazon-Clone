import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

const Avatar: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
    }
  };

  const handleSaveAvatar = () => {
    if (editorRef.current) {
      // Here you can get the edited avatar data and save it to your server or perform any other action.
      const canvas = editorRef.current.getImageScaledToCanvas();
      const editedAvatarData = canvas.toDataURL(); // Base64 encoded image data
      console.log(editedAvatarData);
    }
  };
  
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedImage && (
        <AvatarEditor
          ref={editorRef}
          image={uploadedImage}
          width={200}
          height={200}
          border={50}
          borderRadius={100}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
        />
      )}
      {uploadedImage && <button onClick={handleSaveAvatar}>Save Avatar</button>}
    </div>
  );
};

export default Avatar;