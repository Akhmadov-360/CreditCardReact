import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Avatar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [preview, setPreview] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.avatar[0]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <Box
      component="form"
      sx={{
        width: 400,
        margin: "auto",
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    ></Box>
  );
};

export default Avatar;
