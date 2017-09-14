var express = require('express');
var bodyParser = require ('body-parser');
var Web3 = require('./web3.js/lib/web3.js');
var solc = require('solc');
var app = express();

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.listen(9000);

 app.use(function(req, res, next) { 
 	res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept") 
    next() 
})
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
})
app.get('/angular.min.js',function(req,res){
	res.sendFile(__dirname+'/angular.min.js');
})
app.get('/index1.js',function(req,res){
	res.sendFile(__dirname+'/index1.js');
})
var signingAccount;
var activeBettings =[];
var myBettings = [];
var bettingsParticipated =[];
app.post('/login',function(req,res){
	console.log(web3.eth.accounts)
	var accounts = web3.eth.accounts;
	for(var acc=0;acc<accounts.length;acc++){
		
		if(accounts[acc]===req.body.Address){
			console.log("Equals : ",accounts[acc],req.body.Address)
			signingAccount = accounts[acc];
			console.log("signingAccount: ",signingAccount);
			activeBettings =[];
			myBettings = [];
			bettingsParticipated =[];
			var Bettings = contract_instance.BettingPlacedEvent({},{ fromBlock: '0', toBlock: 'latest' })
			Bettings.watch(function(error, bets){
				if (error)
					console.log('Error in myEvent event handler: ' + error);
				else{

					console.log("Betting placed Events: ",JSON.stringify(bets.args))
					console.log(signingAccount)
					//if(bets.args.by === signingAccount){
						console.log("...........")
						contract_instance.Bets(parseInt(bets.args.BetNumber),function(err,dataActive){
							if(err){
								console.log(err);
							}else{
								if(bets.args.by === signingAccount){
									console.log("---->",dataActive,dataActive[4])
									myBettings.push({"betId":parseInt(bets.args.BetNumber),"By":bets.args.by,"minimumCoins":parseInt(bets.args.BaseBetTokens),"maximumCoins":parseInt(bets.args.MaxBetTokens),"multiple":parseInt(bets.args.Multiple),"isActive":dataActive[4]})
									console.log(myBettings);
								}else{
									activeBettings.push({"betId":parseInt(bets.args.BetNumber),"By":bets.args.by,"minimumCoins":parseInt(bets.args.BaseBetTokens),"maximumCoins":parseInt(bets.args.MaxBetTokens),"multiple":parseInt(bets.args.Multiple)});
									console.log("activeBettings:",activeBettings)
									var WonEvent = contract_instance.bettingEvent({isWon:true},{ fromBlock: '0', toBlock: 'latest' })
									WonEvent.watch(function(error, wonBets){
										if (error)
											console.log('Error in myEvent event handler: ' + error);
										else{
											console.log("Won Event : ",JSON.stringify(wonBets.args))
											for(var i=0;i<activeBettings.length;i++){
												if(parseInt(wonBets.args.betId) ==activeBettings[i].betId){
													activeBettings.splice(i,1);
													console.log("After Won events",activeBettings)
												}
											}
										}
									})
								}
							}
						})
						contract_instance.bettingEvent({betId:bets.args.BetNumber,isWon:false},{ fromBlock: '0', toBlock: 'latest' }).get(function(err,data){
							console.log("Betting event from Initial ",data)
							if(data){
								//console.log(data)
								/*activeBettings.push({"betId":parseInt(bets.args.BetNumber),"By":bets.args.by,"minimumCoins":parseInt(bets.args.BaseBetTokens),"maximumCoins":parseInt(bets.args.MaxBetTokens),"multiple":parseInt(bets.args.Multiple)});
								console.log("activeBettings:",activeBettings)
								var WonEvent = contract_instance.bettingEvent({isWon:true},{ fromBlock: '0', toBlock: 'latest' })
								WonEvent.watch(function(error, wonBets){
									if (error)
										console.log('Error in myEvent event handler: ' + error);
									else{
										console.log("Won Event : ",JSON.stringify(wonBets.args))
										for(var i=0;i<activeBettings.length;i++){
											if(parseInt(wonBets.args.betId) ==activeBettings[i].betId){
												activeBettings.splice(i,1);
												console.log("After Won events",activeBettings)
											}
										}
									}
								})*/
							}
						})
					
				}
			
			})
			res.send(true)
			return;
		}else if(acc+1 == accounts.lenght){
			console.log("Not Equal",accounts[acc],req.body.Address);
			res.send(false);
			return;
		}
	}

})

var contract_address = "0x1a3ec28c5b8a3a77c9db98bd614e8890a48c0074";
var contract_abi = JSON.parse('[{"constant":false,"inputs":[{"name":"bettingID","type":"uint256"},{"name":"guessNumber","type":"uint256"},{"name":"betTokens","type":"uint256"}],"name":"BetForNumber","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"BaseBetTokens","type":"uint256"},{"name":"MaxBetTokens","type":"uint256"},{"name":"Multiple","type":"uint256"},{"name":"NumberToBet","type":"uint256"}],"name":"PlaceBet","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"balanceGameCoins","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Bets","outputs":[{"name":"BettingPlacedBy","type":"address"},{"name":"InitialBetTokens","type":"uint256"},{"name":"MaxBettingTokens","type":"uint256"},{"name":"MultipleForBetTokens","type":"uint256"},{"name":"IsActive","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"Bettings","outputs":[{"name":"BettingTokens","type":"uint256"},{"name":"bettingAdress","type":"address"},{"name":"isWon","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"TransferToMyAccount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"priceOfEachGameCoin","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"BuyGameCoins","outputs":[{"name":"","type":"string"}],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"freezedTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"Owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coinBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"supply","type":"uint256"},{"name":"price","type":"uint256"}],"payable":true,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"error","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyedBy","type":"address"},{"indexed":false,"name":"amountPayed","type":"uint256"},{"indexed":false,"name":"AmountOfCoins","type":"uint256"}],"name":"BuyingCoinsEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"FreezedAccount","type":"address"},{"indexed":false,"name":"FreezedAmount","type":"uint256"}],"name":"FreezingCoinsEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"NotEnoughtCoinsError","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"Message","type":"string"}],"name":"errorInBetPlacing","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"BetNumber","type":"uint256"},{"indexed":true,"name":"by","type":"address"},{"indexed":false,"name":"BaseBetTokens","type":"uint256"},{"indexed":false,"name":"MaxBetTokens","type":"uint256"},{"indexed":false,"name":"Multiple","type":"uint256"}],"name":"BettingPlacedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"betId","type":"uint256"},{"indexed":true,"name":"betBy","type":"address"},{"indexed":false,"name":"betAmount","type":"uint256"},{"indexed":true,"name":"isWon","type":"bool"},{"indexed":false,"name":"AmountLostOrGained","type":"uint256"}],"name":"bettingEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"NotAllowedToBet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"MoneyTransferedToOwner","type":"event"}]')
var contract_instance = web3.eth.contract(contract_abi).at(contract_address);
contract_instance.balanceGameCoins(function(err,data){
	console.log(data)
})
app.get('/myCoins',function(req,res){
	var coinBalance={}
	contract_instance.coinBalance(signingAccount,function(err,data){
		if(err){
			console.log(err);
		}else{
			coinBalance.currentCoins = data;
			contract_instance.freezedTokens(signingAccount,function(err,data1){
				if(err){
					console.log(err);
				}else{
					coinBalance.freezedCoins = data1;
					res.send(coinBalance)
				}
			})
		}
	})
	
})
app.get('/priceOfEachCoin',function(req,res){
	contract_instance.priceOfEachGameCoin(function(err,data){
		if(err){
			console.log(err);
		}else{
			res.send(data);
		}
	})
})
app.post('/buyGameCoins',function(req,res){
	var txhash;
	var price = req.body.price*1e18;
	console.log(price,web3.toWei(price,'ether'))
	web3.personal.unlockAccount(signingAccount,req.body.PassKey);
	contract_instance.BuyGameCoins({from:signingAccount,value:price,gas:300000},function(error,result){
		if(error){
			console.log(error)
			res.send(error)
		}else{
			console.log("result ",result)
			txhash = result;
			console.log("txhash",txhash);
			checkIsMined(txhash,res,BuyCoins,null);
		}
	})
})
function BuyCoins(){
	return "succesfully bought game coins"
}
app.post('/placeBetting',function(req,res){
	var txhash;
	var price = req.body.price*1e18;
	console.log(price,web3.toWei(price,'ether'))
	web3.personal.unlockAccount(signingAccount,req.body.PassKey);
	contract_instance.PlaceBet(req.body.minCoins,req.body.maxCoins,req.body.multiple,req.body.secretNumber,{from:signingAccount,gas:300000},function(error,result){
		if(error){
			console.log(error)
			res.send(error)
		}else{
			console.log("result ",result)
			txhash = result;
			console.log("txhash",txhash);
			checkIsMined(txhash,res,placeBetting,null);
		}
	})
})
function placeBetting(){
	return "successfully Placed Betting"
}
function checkIsMined(tx,res,callback,betId){
	web3.eth.getTransactionReceipt(tx,function(error,result){
		if (error){
			console.error("mining error");
		}else{
			if(result == null){
				setTimeout(function() {
					checkIsMined(tx,res,callback,betId)
				}, 300);
			}else{

				res.send(callback(betId))
			}
		}
	})
}





app.get('/activeBettings',function(req,res){
	res.send(activeBettings);
})
function BetForNumber(betId){
	contract_instance.bettingEvent({betId:betId,betBy:signingAccount,isWon:true},{ fromBlock: 'latest', toBlock: 'latest' }).get(function(err,data){
		if(data.length>0){
			for(var i=0;i<myBettings.length;i++){
				if(myBettings[i].betId == betId){
					myBettings[i].isActive=false;
				}
			}
			
			return "succesfully placed betting and you won "
		}else{
			return "succesfully placed betting but you lost";
		}
	})
	
}
app.post('/betForNumber',function(req,res){
	web3.personal.unlockAccount(signingAccount,req.body.PassKey)
	console.log(req.body.betId,req.body.guessNumber,req.body.BetTokens,signingAccount)
	contract_instance.BetForNumber(req.body.betId,req.body.guessNumber,req.body.BetTokens,{from:signingAccount,gas:300000},function(err,result){
		if(err){
			console.log(err);
		}else{
			console.log("result ",result)
			txhash = result;
			console.log("txhash",txhash);
			checkIsMined(txhash,res,BetForNumber,req.body.betId);
		}
	})
})

app.get('/getProfile',function(req,res){
	console.log("Profile Account :",signingAccount)
	bettingsParticipated =[];
	contract_instance.bettingEvent({betBy:signingAccount},{ fromBlock: '0', toBlock: 'latest' }).get(function(err,data){
		var totalWins = 0;
		var totallost= 0;
		var totalAmountWon = 0;
		var totalAmountLost = 0;
		console.log("Toatal wins :",data)
		var toTest = [];

		if(data.length>0){
			console.log(" IS entering into if: ",(data.length))
			tatalGamesParticipated  = data.length;
			for(var tws=0;tws<data.length;tws++){
				bettingsParticipated.push({"betid":parseInt(data[tws].args.betId),"isWon":data[tws].args.isWon,"AmountLostOrGained":parseInt(data[tws].args.AmountLostOrGained)});
				if(data[tws].args.isWon == true){
					totalWins++; 
					totalAmountWon += parseInt(data[tws].args.AmountLostOrGained);
				}else{
					totallost++;
					totalAmountLost += parseInt(data[tws].args.AmountLostOrGained);
				}
				if(tws==data.length-1){
					var ProfileDetails = {"myBettings":myBettings,"bettingsParticipated":bettingsParticipated,"totalWins":totalWins,"totallost":totallost,"totalAmountWon":totalAmountWon,"totalAmountLost":totalAmountLost};
					res.send(ProfileDetails);
				}
			}
		}else{
			var ProfileDetails1 = {"myBettings":myBettings,"bettingsParticipated":null,"totalWins":totalWins,"totallost":totallost,"totalAmountWon":totalAmountWon,"totalAmountLost":totalAmountLost};
			console.log("from profit else : " ,ProfileDetails1)
			res.send(ProfileDetails1);
		}
	})
})
// Console will print the message
console.log('Server running at http://127.0.0.1:9000/');