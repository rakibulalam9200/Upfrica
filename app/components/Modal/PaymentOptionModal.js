import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { FONTS } from "../../constants/theme";

const PaymentOptionModal = ({ openModal, setOpenModal }) => {
  const { colors } = useTheme();
  const closeModal = () => {
    setOpenModal(false);
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Modal
        visible={openModal}
        animationType={"fade"}
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={[styles.modal]}>
            <View style={[styles.modalContent]}>
              <View style={styles.topbar}></View>
              <TouchableOpacity style={styles.reOrderContainer}>
                {/* <Text style={[g.body1]}>Reorder</Text> */}
                <Text style={{}}>x</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.listItem,
                  { borderBottomColor: colors.borderColor },
                ]}
              >
                <FeatherIcon
                  style={{ marginRight: 12 }}
                  color={colors.textLight}
                  size={20}
                  name="bell"
                />
                <Text style={{ ...FONTS.font, color: colors.title, flex: 1 }}>
                  Notification Setting
                </Text>
                <FeatherIcon
                  size={20}
                  color={colors.textLight}
                  name="chevron-right"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    // width: '100%',
    justifyContent: "flex-end",
    height: "100%",
    flex: 1,
    backgroundColor: "#010714B8",
    // backgroundColor: 'red',
    marginBottom: 56,
    // paddingBottom:56,
  },
  modalContent: {
    backgroundColor: "#F2F6FF",
    width: "90%",
    paddingHorizontal: 10,
    paddingTop: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "relative",
    marginHorizontal: 16,
  },

  texts: {
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 18,
  },
  border: {
    borderColor: "#FFFFFF",
    borderTopWidth: 1,
  },

  reOrderContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  topbar: {
    borderTopColor: "gray",
    borderTopWidth: 5,
    width: 32,
    alignSelf: "center",
    flexDirection: "row",
    flex: 1,
  },
});

export default PaymentOptionModal;
