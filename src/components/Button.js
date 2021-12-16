import React from "react";
import { StyleSheet, Text, Dimensions, TouchableHighlight } from "react-native";

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
    padding: 20,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#888",
  },
  operationButton: {
    color: "#fff",
    backgroundColor: "#fa8231",
  },
  buttonDouble: {
    width: (Dimensions.get("window").width / 4) * 2,
  },
  buttonTriple: {
    width: (Dimensions.get("window").width / 4) * 3,
  },
});

export default ({ label, onClick, isOperation, isDouble, isTriple }) => {
  const stylesButton = [styles.button];

  if (isDouble) stylesButton.push(styles.buttonDouble);

  if (isTriple) stylesButton.push(styles.buttonTriple);

  if (isOperation) stylesButton.push(styles.operationButton);

  return (
    <TouchableHighlight onPress={onClick}>
      <Text style={stylesButton}>{label}</Text>
    </TouchableHighlight>
  );
};
