import React from "react";

const Base64Img = ({ src, alt }) => {
  // const [profileImg, setProfileImg] = useState(null);
  const base64String = btoa(String.fromCharCode(...new Uint8Array(src)));

  return (
    <img
      src={`data:image/png;base64,${base64String}`}
      alt={alt}
      width={"100px"}
    />
  );
};

export default Base64Img;
