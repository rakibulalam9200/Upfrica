import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";

export default function DeleteConfirmationModal({
  confirmationMessage = "Do you want to Cancel this Order?",
  visibility,
  setVisibility,
  onDelete = null,
  isDelete = false,
}) {
  const closeModal = () => {
    setVisibility(false);
  };

  return (
    <Modal
      transparent
      visible={visibility}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={[s.modalOuterContainer]}>
        <View style={s.modalContainer}>
          <Text style={s.headerText}>Delete</Text>
          <Text style={s.subHeaderText}>{confirmationMessage}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 8,
            }}
          >
            <CustomButton
              // onPress={() => props.navigation.navigate('DrawerNavigation')}
              onPress={closeModal}
              color={"gray"}
              title="Close"
              //   isLoading={isLoading}
            />
            <CustomButton
              // onPress={() => props.navigation.navigate('DrawerNavigation')}
              onPress={onDelete}
              color={"red"}
              title={isDelete ? "Delete" : "Cancel"}
              //   isLoading={isLoading}
            />
            {/* <CButtonInput label="Cancel" onPress={closeModal} style={s.cancelButton} /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  modalOuterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContainer: {
    minWidth: "80%",
    alignItems: "stretch",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    margin: 8,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  headerText: {
    fontFamily: "inter-regular",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginVertical: 8,
  },
  subHeaderText: {
    fontFamily: "inter-regular",
    fontSize: 16,
    marginVertical: 8,
    color: "black",
    textAlign: "center",
  },
});
