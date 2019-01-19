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
	if (uiInputs) {
		return false;
	}
	const neededInputLength = neededInputs.names.length;
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
const analyzeUsersFunctionInputs = (neededInputs, uiInputs, isFunctionPayable) => {
	if (isFunctionPayable) {
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
const verifyNeededInputs = (fItem, uiInputs, allFunctionData) => {
	console.log(fItem, uiInputs, allFunctionData);
	if (fItem.inputs) {
		if (uiInputs) {
			const neededInputs = fItem.inputs;
			const isInputsValid = analyzeUsersFunctionInputs(neededInputs, uiInputs, fItem.payable);
			return isInputsValid;
		}
		else {
			return false;
		}
	}
	else {
		return true;
	}

};

export const checkInputs = (fItem, uiInputs) => {
	console.log(fItem.inputs, uiInputs);
	if (fItem.inputs) {
		if (uiInputs) {
			let isInputsValid = true;
			fItem.inputs.names.forEach(inputName => {
				let isInputPresent = false;
				for (let key in uiInputs) {
					if (inputName === key && uiInputs[key]) {
						isInputPresent = true;
						break;
					}
				}
				isInputsValid = isInputsValid && isInputPresent;
			})
			return isInputsValid;
		}
		else {
			return false;
		}
	}
	else {
		return true;
	}
};

export const checkPayable = (uiInputs) => {
	if (uiInputs.payable && !isNaN(uiInputs.payable)) return true;
	return false;
};

// export const executeNonPayableWithParams = (fItem, inputs, extraFunctionInfo) => {
// 	const result = verifyNeededInputs(fItem, inputs, extraFunctionInfo);
// 	return result;
// };

// export const executePayableNoParams = (fName, inputs, extraFunctionInfo, isFunctionPayable) => {
// 	const result = verifyNeededInputs(fName, inputs, extraFunctionInfo, isFunctionPayable);
// 	return result;
// };

// export const executePayableWithParams = (fName, inputs, extraFunctionInfo, isFunctionPayable) => {
// 	const result = verifyNeededInputs(fName, inputs, extraFunctionInfo, isFunctionPayable);
// 	return result;
// };
