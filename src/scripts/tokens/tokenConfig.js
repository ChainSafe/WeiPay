import tokenListJson from '../../constants/data/json/coins.json';
import Token from '../classes/Token';

const tokenConfiguration = (configFlag, tokenObject) => {
  let tokenList;

  switch (configFlag) {
    case 'setup':
      tokenList = this.initialSetup();
      break;
    case 'addNew':
      tokenList = this.addNewToken(tokenObject);
      break;
    default:
      console.log('defaul triggered');
  }
  return tokenList;
};


addNewToken = (tokenObj) => {
  const { name, address, symbol, id, decimals } = tokenObj;
  let token = new Token(symbol, address);
  token.index = id;
  token.selected = true;
  token.type = "ERC20";
  token.initialWalletToken = false;
  token.decimals = decimals;
  token.name = name;
  token.ens_address = null;
  token.website = null;
  token.logo = "https://etherscan.io/images/EtherscanLogo-transparent-b-small.png";
  token.email = null;
  token.blog = null;
  token.chat = null;
  token.facebook = null;
  token.forum = null;
  token.github = null;
  token.gitter = null;
  token.instagram = null;
  token.linkedin = null;
  token.reddit = null;
  token.slack = null;
  token.telegram = null;
  token.twitter = null;
  token.youtube = null;
  return token;
};

/**
 * initialSetup() returns an array of default tokens objects.
 */
initialSetup = () => {
  let setupTokenList = [];
  tokenListJson.forEach((tokenObject) => {
    let token = new Token(tokenObject.symbol, tokenObject.address);
    token.index = tokenObject.id;
    token.type = tokenObject.type;
    token.initialWalletToken = true;
    token.selected = tokenObject.selected;
    token.decimals = tokenObject.decimals;
    token.name = tokenObject.name;
    token.ens_address = tokenObject.ens_address;
    token.website = tokenObject.website;
    token.logo = tokenObject.logo.src;
    token.email = tokenObject.support.email;
    token.blog = tokenObject.social.blog;
    token.chat = tokenObject.social.chat;
    token.facebook = tokenObject.social.facebook;
    token.forum = tokenObject.social.forum;
    token.github = tokenObject.social.github;
    token.gitter = tokenObject.social.gitter;
    token.instagram = tokenObject.social.instagram;
    token.linkedin = tokenObject.social.linkedin;
    token.reddit = tokenObject.social.reddit;
    token.slack = tokenObject.social.slack;
    token.telegram = tokenObject.social.telegram;
    token.twitter = tokenObject.social.twitter;
    token.youtube = tokenObject.social.youtube;
    setupTokenList.push(token);
  });
  return setupTokenList;
};

export default tokenConfiguration;
