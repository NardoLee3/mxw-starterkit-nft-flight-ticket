import { mxw, nonFungibleToken as token} from './index';
import { bigNumberify } from 'mxw-sdk-js/dist/utils';
import { NonFungibleTokenActions,NonFungibleToken} from 'mxw-sdk-js/dist/non-fungible-token';
import { NonFungibleTokenItem } from 'mxw-sdk-js/dist/non-fungible-token-item';
import { nodeProvider } from 'mxw-sdk-js/env/mxw-sdk-js-secret/env';

/*
    Code here are raw,low level inplmentation, not optimize. 
    Some console.error() might not be accurately show on console, but it cover the most common error.
    If status show 1, or in JSON form means the transaction is success.
    For testing purpose, it better to run part by part from top to down. Comment and uncomment some code.
    NOT recommend to run two or function togther. (might have error on signature verification failed)
    For a better reading experience, highly recommend close up all the console.log() & console.error().
*/

let localProvider = new mxw.providers.JsonRpcProvider({
    url: "http://localhost:26657",
    timeout: 60000
},{
    chainId: "maxonrow-chain",
    name: "mxw",
});


console.log(JSON.stringify(localProvider));
var issuer = mxw.Wallet.fromMnemonic("appear scale write grow tiger puppy trick kite exhibit distance target cliff coin silly because train matrix weather list chat stamp warfare hobby ocean").connect(localProvider);
var provider = mxw.Wallet.fromMnemonic("language indoor mushroom gold motor genuine tower ripple baby journey where offer crumble chuckle velvet dizzy trigger owner mother screen panic question cliff dish").connect(localProvider);
var middleware = mxw.Wallet.fromMnemonic("guard loop tell accuse village list prevent sea dolphin weapon own track spike venue gun blind carry hawk weapon track rain amazing author eagle").connect(localProvider);

//change variable here to test
 var nftSymbol = "my2sg04";
 var itemId = "003";
 var nftInstance = new NonFungibleTokenItem(nftSymbol,itemId, issuer);

//#region Token Creation

//set nft properties
let ntfProperties = {
    name: "my2sgFlightTicket04",
    symbol: nftSymbol,
    fee: {
        to: "mxw1md4u2zxz2ne5vsf9t4uun7q2k0nc3ly5g22dne",
        value: bigNumberify("1")
    },
    properties: "fMYtSG@4",
    metadata: "New Token"
};

//create nft token using properties above

token.NonFungibleToken.create(ntfProperties,issuer).then((token)=>{
    console.log('\x1b[32m%s\x1b[0m ',"Creating token..."+'\n'+"Token creation:" +'\n' + "Token Created"+'\n');
}).catch(error=>{
    console.error('\x1b[31m%s\x1b[0m '," Creating token..."+'\n'+"Error on creation: "+error.reason + '\n' + "Maybe you have forgetton to change the value of var nftSymbol? Or it might already been taken by someone" +'\n');
});

// //Query token, for updating/refresh all data of the token
// mxw.nonFungibleToken.NonFungibleToken.fromSymbol(nftSymbol,issuer).then((token)=>{
//     /*This part to show how to get particular variable from token
//     You may want to close to this part as the code here doesn't affect on the transaction*/
//     console.log('\x1b[32m%s\x1b[0m ',"Querying token..."+'\n'+"Status of Created Token:-");
//     console.log("   Token Name: "+token.state.name);
//     console.log("   Token Symbol: "+token.symbol);
//     console.log("   Token Owner: "+token.state.owner);
//     console.log("   Token Metadata: "+token.state.metadata);
//     console.log("   Token Mint Limit: "+token.state.mintLimit);
//     console.log("   Token Transfer Limit: "+token.state.transferLimit);
//     console.log("   Token Total Supply: "+token.state.totalSupply + '\n');
// }).catch(error=>{
//     console.error('\x1b[31m%s\x1b[0m ',error);
// });

// //setup token state in order to authorise token
// let tokenState = {
//     tokenFees: [
//         { action: NonFungibleTokenActions.transfer, feeName: "default" },
//         { action: NonFungibleTokenActions.transferOwnership, feeName: "default" },
//         { action: NonFungibleTokenActions.acceptOwnership, feeName: "default" }
//     ],
//     endorserList: [],
//     mintLimit: 3,
//     transferLimit: 3,
//     burnable: true,
//     pub: false
// };

// //authorise token
// /*A demonstration on working on administrative operation*/
// token.NonFungibleToken.approveNonFungibleToken(nftSymbol, provider, tokenState).then((transaction) => {
//     console.log('\x1b[32m%s\x1b[0m ',"Approving by provider... \n" + "Approved by provider" +'\n');
//     token.NonFungibleToken.signNonFungibleTokenStatusTransaction(transaction, issuer).then((transaction) => {
//         console.log('\x1b[32m%s\x1b[0m ',"Signing by issuer... \n" + "Signed by issuer" + '\n');
//         token.NonFungibleToken.sendNonFungibleTokenStatusTransaction(transaction, middleware).then((receipt) => {
//             console.log('\x1b[32m%s\x1b[0m ',"Approved here the receipt  \n" + "Approved by middleware" +'\n'+"Now the token can be use"+ '\n');
//         }).catch(error=>{
//             console.error('\x1b[31m%s\x1b[0m ',"Some error(s) occured during authorizing: \n" + error.info.message+'\n');
//         });
//     });
// })

//#endregion

//#region Creating Item 

// // setup item properties
// let itemPro = {
//     symbol: nftSymbol,
// 	itemID: itemId,
//     properties: "from04,to05",
//     metadata:" nothing"
// };

// // mint item using the token created earlier by passing in the item properties
// var minter = new NonFungibleToken(nftSymbol,issuer);
// minter.mint(issuer.address,itemPro).then((receipt)=>{
//     console.log('\x1b[32m%s\x1b[0m ',"Minting item... \n"+ "Successfully minted an item" + "\n");
// }).catch(error=>{
//     console.error('\x1b[31m%s\x1b[0m ',"Some error occur during minting: \n"+ JSON.stringify(error.reason));
//     console.log('\x1b[31m%s\x1b[0m ',"**If token item id is used, means the id is already taken please use another ID** ");
//     console.log('\x1b[31m%s\x1b[0m ',"**If invalid token, means the token symbol provided cant be found or yet not been create** \n")
// });


//#endregion


//#region not administrative operation 

// //endorse item
// nftInstance.endorse().then((receipt) => {
//         console.log('\x1b[32m%s\x1b[0m ',"Endorsing item... \n"+JSON.stringify(receipt.status)+'\n');
// }).catch(error=>{
//     console.error('\x1b[31m%s\x1b[0m ',"Failed to endorse: " + '\n' + JSON.stringify(error.info.message) +'\n');
// })

// //transfer item
// var nonFungibleTokenItem = new NonFungibleTokenItem(nftSymbol,itemId, issuer);
//     nonFungibleTokenItem.transfer("Transfering item:" + provider.address).then((receipt) => {
//         console.log('\x1b[32m%s\x1b[0m ',JSON.stringify(receipt));
//     }).catch(error=>{
//         console.error('\x1b[31m%s\x1b[0m ',"Unable to transfer item: " + '\n' + error.info.message +'\n');
//     });

// //query item state
// nftInstance.getState().then((result)=>{
//     console.log("Text before update metadata: \n" + result.metadata + '\n');
//     //overide the item metadata with string "overwrite"
//     nftInstance.updateMetadata("Overwrite").then((receipt)=>{
//         nftInstance.getState().then((result)=>{
//             console.log('\x1b[33m%s\x1b[0m ',"Text after overides metadata: \n" + result.metadata + '\n');
//             //Adding new info at the back, to add new info query must be done first
//             nftInstance.updateMetadata(result.metadata +" Adding new info").then((receipt)=>{
//                 nftInstance.getState().then((result2)=>{
//                     console.log('\x1b[32m%s\x1b[0m ',"Text after update metadata: \n" + result2.metadata + '\n');
//                 });
//             })
//         });
//     })
// });



// //burn item
// var nftInstance = new NonFungibleTokenItem("my2sg04","001", issuer);
// nftInstance.burn().then((receipt) => {
//     console.log('\x1b[32m%s\x1b[0m ',"Buring item... \n" + JSON.stringify(receipt.status) + '\n');
// }).catch(error=>{
//     console.error('\x1b[31m%s\x1b[0m ',"Error burning item: \n" + JSON.stringify(error.info.message));
//     console.error('\x1b[31m%s\x1b[0m ',"It might because when token created, burnable set equal to false) + '\n');
// });


//#endregion
  
//#region administrative operation
// Recomend NOT to run freeze and unfreeze together here, it will run into some problem. 
// For example, it might try to unfreeze item before freeze item.

// //freeze item
// token.NonFungibleToken.freezeNonFungibleTokenItem("my2sg04",itemId,provider).then((transaction) => {
//     token.NonFungibleToken.signNonFungibleTokenItemStatusTransaction(transaction, issuer).then((transaction) => {
//         token.NonFungibleToken.sendNonFungibleTokenItemStatusTransaction(transaction, middleware).then((receipt) => {
//             console.log('\x1b[32m%s\x1b[0m ',"Freezing item... \n" + JSON.stringify(receipt.status) + "\n");
//         }).catch(error=>{
//             console.error('\x1b[31m%s\x1b[0m ',"Error on freezing: \n" +JSON.stringify(error.info.message)+ '\n' );
//         });
//     });
// });

// //unfreeze item
// token.NonFungibleToken.unfreezeNonFungibleTokenItem("my2sg04",itemId,provider).then((transaction) => {
//     token.NonFungibleToken.signNonFungibleTokenItemStatusTransaction(transaction, issuer).then((transaction) => {
//         token.NonFungibleToken.sendNonFungibleTokenItemStatusTransaction(transaction, middleware).then((receipt) => {
//             console.log('\x1b[32m%s\x1b[0m ',"Unfreezing item... \n" + JSON.stringify(receipt.status) + '\n');
//         }).catch(error=>{
//             console.error('\x1b[31m%s\x1b[0m ',"Error on unfreezing: \n" +JSON.stringify(error.info.message)+ '\n' );
//         });
//     });
// });

//#endregion