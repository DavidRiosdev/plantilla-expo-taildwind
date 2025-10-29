import { useAuthUser } from "@/store/useAuthUser";
import { Formik } from "formik";
import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button, HelperText, TextInput } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo obligatorio"),
});

export default function SingIn() {
  const { login } = useAuthUser();

  const [loadingButton, setIsLoandingButton] = useState<boolean>(false);

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      setIsLoandingButton(true);
      await login(values.email, values.password);
    } catch (error: any) {
      setIsLoandingButton(false);
      Keyboard.dismiss();

      Toast.show({
        type: "error",
        text1: "No se pudo iniciar sesión",
        text2: error.message,
      });
    }
  };

  return (
    <View className="flex-1 p-10">
      <Formik
        initialValues={{
          email: "nicolasgarciajimenez12@gmail.com",
          password: "123456789",
        }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="flex flex-col justify-between">
            <TextInput
              label="Correo electrónico"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              autoCapitalize="none"
              error={touched.email && !!errors.email}
            />

            <HelperText type="error" visible={touched.email && !!errors.email}>
              {errors.email}
            </HelperText>

            <TextInput
              placeholder="Contraseña"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              error={touched.password && !!errors.password}
            />
            <HelperText
              type="error"
              visible={touched.password && !!errors.password}
            >
              {errors.password}
            </HelperText>

            <Button
              onPress={() => {
                /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
                showMessage({
                  message: "Simple message",
                  type: "info",
                });
              }}
            >
            xxxxx
            </Button>

            <Button
              mode="contained"
              loading={loadingButton}
              disabled={loadingButton}
              onPress={() => handleSubmit()}
            >
              Iniciar sesión
            </Button>
          </View>
        )}
      </Formik>
      <ToastManager showProgressBar={false} position="bottom" />
    </View>
  );
}
