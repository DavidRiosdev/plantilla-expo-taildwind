import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

export default function Test() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Abrir automáticamente al montar
  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["50%"]}
          enablePanDownToClose
        >
          <BottomSheetView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>¡Hola desde el Bottom Sheet! 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
