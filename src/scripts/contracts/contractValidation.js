/**
 * Check if the user's inputs contained a payable value
 */
const checkPayableInputs = (uiInputs) => {
  if (typeof uiInputs === 'undefined') {
    return false;
  } else if (typeof uiInputs.payable === 'undefined') {
    return false;
  } else {
    //needs to check if uiInputs.payable is a number?
    return true
  }
};

/**
 * Checks regular inputs that are not marked Payable and compares lengths respectively
 */
const checkNonPayableInputs = (uiInputs, neededInputs, isFunctionPayable) => {
  if (typeof uiInputs === 'undefined') {
    return false;
  }
  const neededInputLength = neededInputs.length;
  const uiInputsLength = Object.keys(uiInputs).length;
  if (isFunctionPayable) {
    const inputMinusPayableInput = uiInputsLength - 1;
    if (neededInputLength === inputMinusPayableInput) {
      return true;
    }
  }
  if (!isFunctionPayable) {
    if (neededInputLength === uiInputsLength) {
      return true;
    }
  }
  return false;
};

/**
 * The user's inputs will be passed in along with the required inputs and these will be verified.
 * Return true or false depending on whether the inputs are valid.
 */
const analyzeUsersFunctionInputs = (neededInputs, neededInputLength, uiInputs, isFunctionPayable) => {
  let payableInputSupplied;
  if(isFunctionPayable) {
    const isPayableValid = checkPayableInputs(uiInputs);
    if (!isPayableValid) {
      return false;
    }
  }
  const isNonPayableInputsValid = checkNonPayableInputs(uiInputs, neededInputs, isFunctionPayable);
  if (!isNonPayableInputsValid) {
    return false;
  }
  return true;
};

/**
   * Loop through all functions, check if the current function being executed has the needed inputs
   * to pass in as params, if it is payable there must be a payable input, else this function will
   * return false and you cannot execute contract method.
   */
const verifyNeededInputs = (fName, uiInputs, allFunctionData, isFunctionPayable) => {
  for (func in allFunctionData) {
    const trimmedSearchMethod = (allFunctionData[func].signature).split("(")[0];
    if (trimmedSearchMethod === fName) {
      const neededInputs = allFunctionData[func].inputs;
      const neededInputLength = neededInputs.length;
      const isInputsValid = analyzeUsersFunctionInputs(neededInputs, neededInputLength, uiInputs, isFunctionPayable);
      return isInputsValid;
    }
  }
};

export const executeNonPayableNoParams = (fName, inputs) => {
  return true;
};

export const executeNonPayableWithParams = (fName, inputs, extraFunctionInfo, isFunctionPayable) => {
  const result = verifyNeededInputs(fName, inputs, extraFunctionInfo, isFunctionPayable);
  return result;
};

export const executePayableNoParams = (fName, inputs, extraFunctionInfo, isFunctionPayable) => {
  const result = verifyNeededInputs(fName, inputs, extraFunctionInfo, isFunctionPayable);
  return result;
};

export const executePayableWithParams = (fName, inputs, extraFunctionInfo, isFunctionPayable) => {
  const result = verifyNeededInputs(fName, inputs, extraFunctionInfo, isFunctionPayable);
  return result;
};
