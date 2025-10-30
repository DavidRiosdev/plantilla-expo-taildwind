import CustomButton from "@/components/ui/design/CustomButton";
import CustomTextInput from "@/components/ui/design/CustomTextInput";
import LOGO from "@/constants/Logo";
import { useAuthUser } from "@/store/useAuthUser";
import { Formik } from "formik";
import React, { useState } from "react";
import { Image, Keyboard, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { HelperText } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View className="items-center justify-center mb-10">
        <Image
          source={LOGO}
          style={{ width: 130 }}
          resizeMode="contain"
        />
      </View>

      <Text className="w-full mb-10 text-3xl font-bold text-center">
        Inicio de sesión
      </Text>

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
          <View className="flex justify-center w-full">
            <View>
              <CustomTextInput
                label="Correo electrónico"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                error={touched.email && !!errors.email}
              />
            </View>

            {touched.email && !!errors.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )}

            <View className="pt-4">
              <CustomTextInput
                label="Contraseña"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                isPassword={true}
                error={touched.password && !!errors.password}
              />
            </View>

            {touched.password && !!errors.password && (
              <HelperText type="error">{errors.password}</HelperText>
            )}

            <Text className="w-full py-6 text-lg text-right">
              ¿Olvidaste la contraseña?
            </Text>

            <CustomButton
              mode="contained"
              loading={loadingButton}
              disabled={loadingButton}
              onPress={() => handleSubmit()}
            >
              Iniciar sesión
            </CustomButton>

            <Text className="w-full pt-6 pb-4 text-lg text-center text-text-secondary">
              ¿No tienes cuenta?
            </Text>

            <CustomButton
              mode="outlined"
            >
              Registrate
            </CustomButton>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
