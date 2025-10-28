import { View, Text } from "react-native";
import React from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthUser } from "@/store/useAuthUser";
import { router } from "expo-router";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo obligatorio"),
});

export default function SingIn() {
  const { login } = useAuthUser();

  const onSubmit = async (values: { email: string; password: string }) => {
    await login(values.email, values.password);
  };

  return (
    <View className="flex-1 gap-4 p-10">
      <Formik
        initialValues={{
          email: "david.alberto2212@gmail.com",
          password: "12345678",
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
            />
            {touched.password && errors.password && (
              <Text style={{ color: "red", marginBottom: 8 }}>
                {errors.password}
              </Text>
            )}

            <Button mode="contained" onPress={() => handleSubmit()}>
              Iniciar sesión
            </Button>
          </View>
        )}
      </Formik>
      <Button
        mode="contained"
        buttonColor="blue"
        onPress={() => router.push("/(tabs)")}
      >
        Entrar sin login
      </Button>
    </View>
  );
}
