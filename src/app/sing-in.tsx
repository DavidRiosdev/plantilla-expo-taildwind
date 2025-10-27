import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import { Button, HelperText, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo obligatorio"),
});

export default function SingIn() {
  const { logIn } = useAuthStore();

  const onSubmit = () => {
    logIn();
  };

  return (
    <View className="flex-1 p-10">
      <Formik
        initialValues={{ email: "", password: "" }}
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

            <Button onPress={() => handleSubmit()}>Iniciar sesión</Button>
          </View>
        )}
      </Formik>
      <Button mode="contained" disabled={true} onPress={logIn}>
        Log in
      </Button>
    </View>
  );
}
