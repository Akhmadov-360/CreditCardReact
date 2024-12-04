import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [preview, setPreview] = useState(null);

  const onSubmit = (data) => {
    toast.success("Регистрация прошла успешно!");
    console.log("Данные формы:", data);
    console.log("Загруженный файл:", data.avatar[0]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const password = watch("password");

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
    >
      <Typography variant="h5" textAlign="center">
        Регистрация
      </Typography>

      <TextField
        label="Имя пользователя"
        variant="outlined"
        {...register("username", { required: "Введите имя" })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        label="Email"
        variant="outlined"
        {...register("email", {
          required: "Введите email",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Некорректный email",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <Typography variant="body1">Загрузить аватар:</Typography>
      <Button variant="outlined" component="label">
        Выберите файл
        <input
          type="file"
          hidden
          accept="image/*"
          {...register("avatar", { required: "Загрузите аватар" })}
          onChange={handleFileChange}
        />
      </Button>
      {errors.avatar && (
        <Typography color="error" variant="body2">
          {errors.avatar.message}
        </Typography>
      )}

      {preview && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Avatar alt="Avatar Preview" src={preview} sx={{ width: 100, height: 100 }} />
        </Box>
      )}

      <TextField
        label="Пароль"
        variant="outlined"
        type="password"
        {...register("password", {
          required: "Введите пароль",
          minLength: {
            value: 6,
            message: "Пароль должен содержать минимум 6 символов",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Подтвердите пароль"
        variant="outlined"
        type="password"
        {...register("confirmPassword", {
          required: "Подтвердите пароль",
          validate: (value) => value === password || "Пароли не совпадают",
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button variant="contained" sx={{ mt: 2 }} type="submit">
        Зарегистрироваться
      </Button>

      <ToastContainer />
    </Box>
  );
};

export default Register;
