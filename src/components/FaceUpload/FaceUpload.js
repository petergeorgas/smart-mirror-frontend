import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Progress,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addPhotoLink, getUser, storage } from "../../firebase/firebase";

function FaceUpload(props) {
  const { uid, name, setName } = props;

  const inputRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileUrl, setFileUrl] = useState(undefined);

  useEffect(() => {
    if (uid) {
      getUser(uid).then((user) => {
        if (user.photoUrl) {
          setFileUrl(user.photoUrl);
          setUploadComplete(true);
        }
      });
    }
  }, [uid]);

  const handleFileChange = (val) => {
    val.target.files && setFile(val.target.files[0]); // do I need to do this?
  };

  const handleRestartUpload = () => {
    setUploadPercent(0);
    setUploading(false);
    setUploadComplete(false);
    setFile(undefined);
    setFileUrl(undefined);
  };

  const handleFileUpload = () => {
    if (!file) {
      return;
    }

    const storageRef = ref(
      storage,
      `/faces/${file.type === "image.png" ? name + ".png" : name + ".jpg"}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(percent);
        // update progress
        setUploadPercent(percent);
      },
      (err) => {
        console.log(err);
        setUploading(false);
      },
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addPhotoLink(uid, url);
        });
        setUploading(false);
        setUploadComplete(true);
      }
    );
  };

  const image =
    file || fileUrl ? (
      <Image
        alt="profile image"
        src={fileUrl ? fileUrl : URL.createObjectURL(file)}
        border="2px"
        borderRadius="md"
        borderColor="gray.400"
        mb={2}
      />
    ) : undefined;

  const uploadButton = file ? (
    <Flex w="100%" justifyContent="center">
      <Button mb={2} colorScheme="blue" onClick={handleFileUpload}>
        Upload Face
      </Button>
    </Flex>
  ) : undefined;

  const progress = isUploading ? <Progress value={uploadPercent} /> : undefined;

  const success = (
    <Box p={4} border="2px" borderRadius="md" borderColor="gray.400">
      <Box w="100%" display="flex" justifyContent="center">
        <Text fontWeight="bold" fontSize="xl">
          {`You look great${name ? ", " + name.split(" ").at(0) : ""}!`}
        </Text>
      </Box>
      {image}
      <Flex w="100%" justifyContent="center">
        <Button mb={2} colorScheme="blue" onClick={handleRestartUpload}>
          Upload New
        </Button>
      </Flex>
    </Box>
  );

  return uploadComplete || fileUrl ? (
    success
  ) : (
    <Box p={4} border="2px" borderRadius="md" borderColor="gray.400">
      <Box w="100%" display="flex" justifyContent="center">
        <Text fontWeight="bold" fontSize="xl">
          Face Upload
        </Text>
      </Box>
      {image}
      {progress}
      <FormControl mb={2}>
        <Input
          onChange={handleFileChange}
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          sx={{
            "::file-selector-button": {
              height: "35px",
              paddingX: "15px",
              font: "-apple-system,BlinkMacSystemFont,Segoe UI",
              backgroundColor: "#90CDF4",
              borderRadius: "0.375rem",
              border: "0px solid black",
              textColor: "black",
              cursor: "pointer",
            },
            "::file-selector-button:hover": {
              backgroundColor: "#5cace6",
            },
          }}
        />
      </FormControl>
      {uploadButton}
    </Box>
  );
}

export default FaceUpload;
