import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import Button from "./src/components/Button";
import Display from "./src/components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = { ...initialState };

  addDigit = (pr_digit) => {
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    if (
      pr_digit === "." &&
      !clearDisplay &&
      this.state.displayValue.includes(".")
    )
      return;

    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + pr_digit;

    this.setState({ displayValue, clearDisplay: false });

    if (pr_digit !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];

      values[this.state.current] = newValue;

      this.setState({ values });
    }
  };

  setOperation = (operation) => {
    if (this.state.current === 0)
      this.setState({ operation, current: 1, clearDisplay: true });
    else {
      const equals = operation === "=";
      const values = [...this.state.values];

      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 1;
      this.setState({
        displayValue: values[0].toString(),
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  };

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  aBotao = () => {
    return [
      "AC",
      "/",
      "7",
      "8",
      "9",
      "*",
      "4",
      "5",
      "6",
      "-",
      "1",
      "2",
      "3",
      "+",
      "0",
      ".",
      "=",
    ];
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          {this.aBotao().map((pr_botao, index) => {
            let isOperation = false;
            let isDouble = false;
            let isTriple = false;

            let action = () => {};

            if (["/", "+", "-", "*", "="].includes(pr_botao)) {
              isOperation = true;

              action = () => this.setOperation(pr_botao);
            } else if (["0"].includes(pr_botao)) isDouble = true;
            else if (["AC"].includes(pr_botao)) {
              isTriple = true;

              action = this.clearMemory;
            }

            if (parseInt(pr_botao) || pr_botao === ".")
              action = () => this.addDigit(pr_botao);

            return (
              <Button
                key={index}
                label={pr_botao}
                onClick={action}
                isOperation={isOperation}
                isDouble={isDouble}
                isTriple={isTriple}
              />
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
