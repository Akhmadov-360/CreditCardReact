import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CardUI = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "•••• •••• •••• ••••",
    nameOnCard: "ИМЯ ВЛАДЕЛЬЦА",
    expiryDate: "MM/YY",
    cvv: "***",
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const handleInputChange = (field, value) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]:
        value ||
        (field === "cardNumber"
          ? "•••• •••• •••• ••••"
          : field === "nameOnCard"
          ? "ИМЯ ВЛАДЕЛЬЦА"
          : field === "cvv"
          ? "***"
          : "MM/YY"),
    }));
  };

  const onSubmit = (data) => {
    alert("Кредитная карта успешно добавлена!");
    console.log("Card Data:", data);
  };

  const cvvValue = watch("cvv");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        backgroundColor: "#f0f4f7",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          perspective: "1000px",
          marginBottom: 3,
        }}
      >
        <Box
          sx={{
            width: "400px",
            height: "200px",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.6s",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              backfaceVisibility: "hidden",
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #ff7e5f, #feb47b)",
              borderRadius: "8px",
              padding: 2,
              color: "#fff",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "80px",
                left: "20px",
                fontSize: "18px",
                letterSpacing: "2px",
              }}
            >
              {cardDetails.cardNumber}
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                bottom: "40px",
                left: "20px",
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              {cardDetails.nameOnCard}
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                bottom: "40px",
                right: "20px",
                fontSize: "16px",
              }}
            >
              {cardDetails.expiryDate}
            </Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              width: "100%",
              height: "100%",
              backgroundColor: "#2d2d2d",
              borderRadius: "8px",
              color: "#fff",
              padding: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "80px",
                left: "20px",
                right: "20px",
                height: "40px",
                backgroundColor: "#000",
              }}
            />
            <Typography
              sx={{
                position: "absolute",
                top: "130px",
                right: "20px",
                fontSize: "16px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "2px 5px",
                borderRadius: "4px",
              }}
            >
              {cardDetails.cvv || "•••"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: 3,
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" textAlign="center" marginBottom={2}>
            Добавить кредитную карту
          </Typography>

          <TextField
            label="Номер карты"
            {...register("cardNumber", {
              required: "Введите номер карты",
              pattern: {
                value: /^\d{16}$/,
                message: "Номер карты должен содержать 16 цифр",
              },
            })}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber?.message}
            fullWidth
            margin="normal"
            onChange={(e) => handleInputChange("cardNumber", e.target.value.replace(/(\d{4})/g, "$1 ").trim())}
          />

          <TextField
            label="Имя на карте"
            {...register("nameOnCard", {
              required: "Введите имя на карте",
              minLength: {
                value: 2,
                message: "Имя должно содержать не менее 2 символов",
              },
            })}
            error={!!errors.nameOnCard}
            helperText={errors.nameOnCard?.message}
            fullWidth
            margin="normal"
            onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Месяц/Год (MM/YY)"
                {...register("expiryDate", {
                  required: "Введите дату истечения",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Введите дату в формате MM/YY",
                  },
                })}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate?.message}
                fullWidth
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                type="password"
                {...register("cvv", {
                  required: "CVV обязательный для ввода",
                  pattern: {
                    value: /^\d{3}$/,
                    message: "CVV должен содержать ровно 3 цифры",
                  },
                })}
                error={!!errors.cvv}
                helperText={errors.cvv?.message}
                fullWidth
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
              />
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
            Добавить карту
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CardUI;
