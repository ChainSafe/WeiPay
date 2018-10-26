/**
 * The user's inputs will be passed in along with the required inputs and these will be verified.
 * Return true or false depending on whether the inputs are valid.
 */
// const analyzeUsersFunctionInputs = () => {

// };

/**
   * Loop through all functions, check if the current function being executed has the needed inputs 
   * to pass in as params, if it is payable there must be a payable input, else this function will 
   * return false and you cannot execute contract method.
   */
const verifyNeededInputs = (fName, uiInputs, allFunctionData, isFunctionPayable) => {
  console.log('in verify');
  for (func in allFunctionData) {
    const trimmedSearchMethod = (allFunctionData[func].signature).split("(")[0];
    if (trimmedSearchMethod === fName) {
      console.log({trimmedSearchMethod});
      //check inputs 
      const neededInputs = allFunctionData[func].inputs;
      const neededInputLength = neededInputs.length;
      //analyzeUsersFunctionInputs

      console.log({neededInputs});
      console.log({isFunctionPayable});
    }
  }
};

export const executeNonPayableNoParams = (fName, inputs) => {
  console.log('executeNonPayableNoParams');
  console.log({ fName, inputs });
  console.log('simlualte contract call');
};

export const executeNonPayableWithParams = (fName, inputs, extraFunctionInfo) => {
  console.log('executeNonPayableWithParams');
  console.log({ fName, inputs, extraFunctionInfo });
};

export const executePayableNoParams = (fName, inputs, extraFunctionInfo) => {
  console.log('executePayableNoParams');
  console.log({ fName, inputs, extraFunctionInfo });
};

export const executePayableWithParams = (fName, inputs, extraFunctionInfo, isFunctionPayable) => {
  console.log('executePayableWithParams');
  console.log({ fName, inputs, extraFunctionInfo });
  this.verifyNeededInputs(fName, inputs, extraFunctionInfo, isFunctionPayable);
};