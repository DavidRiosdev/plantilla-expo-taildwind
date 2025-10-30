import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { TextInput, TextInputProps } from "react-native-paper";

interface CustomTextInputProps extends TextInputProps {
  isPassword?: boolean;
}

export default function CustomTextInput({
  isPassword,
  ...props
}: CustomTextInputProps) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  return (
    <TextInput
      mode="outlined"
      secureTextEntry={isPassword ? secureTextEntry : false}
      theme={{ roundness: 15 }}
      right={
        isPassword && (
          <TextInput.Icon
            icon={(iconProps) => (
              <Ionicons
                name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                size={20}
                {...iconProps}
              />
            )}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        )
      }
      {...props}
    />
  );
}
