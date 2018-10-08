const ethers = require('ethers');
const axios = require('axios');

var  provider = ethers.providers.getDefaultProvider("ropsten");
let abi;

getContractAbi = async (contractAddress) => { 
  // await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`)
  //   .then((res) => {    
  //     abi = res.data.result;
  //     console.log(abi);
      
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  await axios.get(`https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`)
    .then((res) => {    
      abi = res.data.result;
      
      // console.log(abi);
      // console.log("899898");
      
    })
    .catch((err) => {
      console.log(err);
    });
};

export const processContractByAddress = async (wallet, address) => {
  await getContractAbi(address);
  //var provider = ethers.providers.getDefaultProvider("ropsten");
  let abiParsed = JSON.parse(abi);
  let cWallet = wallet;
  const initializedWallet = new ethers.Wallet(cWallet.privateKey, provider);
  try {
    let contract = await new ethers.Contract(address, abiParsed, initializedWallet);
    
    let contractEvents = contract.interface.events;
    let contractFunctions = contract.interface.functions;
    console.log("------------");
    console.log(contract);
    console.log("------------");
    
    
    return { contractFunctions, contractEvents, contract };
  } catch (err) {
    console.log(err);
  }
};

/*
  Wallet
  function name
  all the parameters for that function
  Contract.
  Calling payable functions:
  address.func.value(amount)(arg1, arg2, arg3)

*/
export const processFunctionCall = async (wallet, inputs, contract) => {
  console.log("In function Call");  
  let cWallet = wallet;
  const initializedWallet = new ethers.Wallet(cWallet.privateKey, provider);
  // debugger
  try {
    
    
    const funcName = inputs["funcName"].substring(0,inputs["funcName"].indexOf("(")); 
    console.log(funcNme);
    
    const contractWithSigner = contract.connect(initializedWallet);
    await contractWithSigner["functions"][funcName](inputs["input"]);
    let tx = await contractWithSigner["functions"]["getMessage"]();
    console.log("Call went through");
    console.log(tx);
    console.log("---------000---------------");
    
  } catch (err) {
    console.log("Didnt go through");
    
    console.log(err);
  }
  
};

export const processFunctionCall2 = async (wallet, functionName, inputs, contract) => {
  console.log("In function Call");  
  let cWallet = wallet;
  const initializedWallet = new ethers.Wallet(cWallet.privateKey, provider);
  // debugger
  try {
    // console.log("***************************");
    
    // console.log("Wallet: --------");
    // console.log(initializedWallet);
    // console.log("Function Name------");
    console.log(functionName);
    // console.log("Inputs--------");
    // console.log(Object.values(inputs));
    
    const args = Object.values(inputs);
    const contractWithSigner = contract.connect(initializedWallet);
    if (args.length == 0) {
      let tx = await contract["functions"][functionName]();
      console.log("Call went through");
      console.log(tx);
      console.log("---------000---------------");
    }else {
      const call = "contractWithSigner['functions'][functionName](" + args.toString() + ")";
      console.log(call);
      await eval(call);
      // await contractWithSigner['functions']["setNewMessageNumber"].value(0.001)("Transaction", 69);
      console.log("Call went through");
      console.log("---------000---------------");
    
    }
   
   

    console.log("***************************");
    

  } catch (err) {
    console.log("Didnt go through");
    
    console.log(err);
  }
  
};

