import { Box, Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Имя и возраст", "Адрес", "Обзор и подтверждение"];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (activeStep === steps.length - 1) {
      toast.success("Данные успешно отправлены!");
      console.log(data);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6">Шаг 1: Введите ваше имя и возраст</Typography>
            <TextField
              label="Имя"
              {...register("name", { required: "Это поле обязательно" })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Возраст"
              type="number"
              {...register("age", { required: "Это поле обязательно" })}
              error={!!errors.age}
              helperText={errors.age ? errors.age.message : ""}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6">Шаг 2: Введите ваш адрес</Typography>
            <TextField
              label="Адрес"
              {...register("address", { required: "Это поле обязательно" })}
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ""}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">Шаг 3: Обзор и подтверждение</Typography>
            <Typography>Имя: {watch("name")}</Typography>
            <Typography>Возраст: {watch("age")}</Typography>
            <Typography>Адрес: {watch("address")}</Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", padding: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderStepContent()}
        <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
          {activeStep === steps.length - 1 ? "Отправить" : "Далее"}
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default StepForm;
