import * as React from "react";
import { Button, ButtonProps } from "react-native-paper";

export default function CustomButton(props: ButtonProps) {
  return (
    <Button
      style={{ borderRadius: 10 }}
      labelStyle={{ fontSize: 14, fontWeight: "600" }}
      className="px-4 py-1"
      {...props}
    />
  );
}
