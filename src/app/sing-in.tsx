import CustomButton from "@/components/ui/design-components/CustomButton";
import CustomTextInput from "@/components/ui/design-components/CustomTextInput";
import { useAuthUser } from "@/store/useAuthUser";
import { Link } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button, HelperText, TextInput } from "react-native-paper";
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
      showMessage({
        message: "No se pudo iniciar sesión",
        description: error.message,
        icon: "danger",
        type: "danger",
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
            <CustomTextInput
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

            <CustomTextInput
              label="Contraseña"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              isPassword={true}
              error={touched.password && !!errors.password}
            />
            <HelperText
              type="error"
              visible={touched.password && !!errors.password}
            >
              {errors.password}
            </HelperText>

            <CustomButton
              mode="contained"
              loading={loadingButton}
              disabled={loadingButton}
              onPress={() => handleSubmit()}
            >
              Iniciar sesión
            </CustomButton>
          </View>
        )}
      </Formik>

      {/* Modal */}
      <Link asChild push href="/modal">
        <Button>Abrir modal</Button>
      </Link>
    </View>
  );
}
