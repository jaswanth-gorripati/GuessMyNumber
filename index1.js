var app =  angular.module("gmn",[])
app.controller("mainCtrl",['$log','$scope','$http','$timeout',function($log,$scope,$http,$timeout){

	console.log(web3)
	//var contract_address = "0x1a3ec28c5b8a3a77c9db98bd614e8890a48c0074";
	var contract_address = "0xd9d63c8fbfcc4ef631580e2ee73e5e1d3a6bd5d8";
	//var contract_abi = JSON.parse('[{"constant":false,"inputs":[{"name":"bettingID","type":"uint256"},{"name":"guessNumber","type":"uint256"},{"name":"betTokens","type":"uint256"}],"name":"BetForNumber","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"BaseBetTokens","type":"uint256"},{"name":"MaxBetTokens","type":"uint256"},{"name":"Multiple","type":"uint256"},{"name":"NumberToBet","type":"uint256"}],"name":"PlaceBet","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"balanceGameCoins","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Bets","outputs":[{"name":"BettingPlacedBy","type":"address"},{"name":"InitialBetTokens","type":"uint256"},{"name":"MaxBettingTokens","type":"uint256"},{"name":"MultipleForBetTokens","type":"uint256"},{"name":"IsActive","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"Bettings","outputs":[{"name":"BettingTokens","type":"uint256"},{"name":"bettingAdress","type":"address"},{"name":"isWon","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"TransferToMyAccount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"priceOfEachGameCoin","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"BuyGameCoins","outputs":[{"name":"","type":"string"}],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"freezedTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"Owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coinBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"supply","type":"uint256"},{"name":"price","type":"uint256"}],"payable":true,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"error","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyedBy","type":"address"},{"indexed":false,"name":"amountPayed","type":"uint256"},{"indexed":false,"name":"AmountOfCoins","type":"uint256"}],"name":"BuyingCoinsEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"FreezedAccount","type":"address"},{"indexed":false,"name":"FreezedAmount","type":"uint256"}],"name":"FreezingCoinsEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"NotEnoughtCoinsError","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"Message","type":"string"}],"name":"errorInBetPlacing","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"BetNumber","type":"uint256"},{"indexed":true,"name":"by","type":"address"},{"indexed":false,"name":"BaseBetTokens","type":"uint256"},{"indexed":false,"name":"MaxBetTokens","type":"uint256"},{"indexed":false,"name":"Multiple","type":"uint256"}],"name":"BettingPlacedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"betId","type":"uint256"},{"indexed":true,"name":"betBy","type":"address"},{"indexed":false,"name":"betAmount","type":"uint256"},{"indexed":true,"name":"isWon","type":"bool"},{"indexed":false,"name":"AmountLostOrGained","type":"uint256"}],"name":"bettingEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"NotAllowedToBet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"MoneyTransferedToOwner","type":"event"}]')
	var contract_abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "bettingID", "type": "uint256" }, { "name": "guessNumber", "type": "uint256" }, { "name": "betTokens", "type": "uint256" } ], "name": "BetForNumber", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "betId", "type": "uint256" } ], "name": "getAllBettingNumbers", "outputs": [ { "name": "", "type": "uint256[]", "value": [] } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "BaseBetTokens", "type": "uint256" }, { "name": "MaxBetTokens", "type": "uint256" }, { "name": "Multiple", "type": "uint256" }, { "name": "NumberToBet", "type": "uint256" } ], "name": "PlaceBet", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "balanceGameCoins", "outputs": [ { "name": "", "type": "uint256", "value": "1000000000000000000" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "Bets", "outputs": [ { "name": "BetId", "type": "uint256", "value": "0" }, { "name": "BettingPlacedBy", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "InitialBetTokens", "type": "uint256", "value": "0" }, { "name": "MaxBettingTokens", "type": "uint256", "value": "0" }, { "name": "MultipleForBetTokens", "type": "uint256", "value": "0" }, { "name": "IsActive", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getAllBetIds", "outputs": [ { "name": "", "type": "uint256[]", "value": [] } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "name": "Bettings", "outputs": [ { "name": "BettingId", "type": "uint256", "value": "0" }, { "name": "BettingTokens", "type": "uint256", "value": "0" }, { "name": "bettingAdress", "type": "address", "value": "0x" }, { "name": "isWon", "type": "bool", "value": false }, { "name": "coinsWonOrLost", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "TransferToMyAccount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "priceOfEachGameCoin", "outputs": [ { "name": "", "type": "uint256", "value": "1000000000000000" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "BuyGameCoins", "outputs": [ { "name": "", "type": "string" } ], "payable": true, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "freezedTokens", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "Owner", "outputs": [ { "name": "", "type": "address", "value": "0xe7c0ae12d36dfd72fb20fdfc717a6ee9853d9cdd" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "coinBalance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "inputs": [ { "name": "supply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "supply", "template": "elements_input_uint", "value": "1e18" }, { "name": "price", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "price", "template": "elements_input_uint", "value": "1e15" } ], "payable": true, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "supply", "type": "uint256" }, { "indexed": false, "name": "price", "type": "uint256" }, { "indexed": false, "name": "moneySent", "type": "uint256" } ], "name": "ConstructorInitiated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "message", "type": "string" } ], "name": "error", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "buyedBy", "type": "address" }, { "indexed": false, "name": "amountPayed", "type": "uint256" }, { "indexed": false, "name": "AmountOfCoins", "type": "uint256" } ], "name": "BuyingCoinsEvent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "FreezedAccount", "type": "address" }, { "indexed": false, "name": "FreezedAmount", "type": "uint256" } ], "name": "FreezingCoinsEvent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "message", "type": "string" } ], "name": "NotEnoughtCoinsError", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Message", "type": "string" } ], "name": "errorInBetPlacing", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "BetNumber", "type": "uint256" }, { "indexed": true, "name": "by", "type": "address" }, { "indexed": false, "name": "BaseBetTokens", "type": "uint256" }, { "indexed": false, "name": "MaxBetTokens", "type": "uint256" }, { "indexed": false, "name": "Multiple", "type": "uint256" } ], "name": "BettingPlacedEvent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "betId", "type": "uint256" }, { "indexed": true, "name": "betBy", "type": "address" }, { "indexed": false, "name": "betAmount", "type": "uint256" }, { "indexed": true, "name": "isWon", "type": "bool" }, { "indexed": false, "name": "AmountLostOrGained", "type": "uint256" } ], "name": "bettingEvent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "message", "type": "string" } ], "name": "NotAllowedToBet", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "MoneyTransferedToOwner", "type": "event" } ]')
	var contract_instance = web3.eth.contract(contract_abi).at(contract_address);
	console.log(contract_instance);
	
	var vm =  this;
	/*if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		// set the provider you want from Web3.providers
		web3 = new Web3(new Web3.providers.$httpProvider("http://localhost:8545"));
	}*/
	vm.myBettings = [];
	vm.activeBettings=[];
	vm.isLoggedIn = false;
	$scope.logIn = function(){
		$scope.signingAccount = web3.eth.accounts[0];
		console.log($scope.signingAccount)
		if($scope.signingAccount!=undefined){
			vm.isLoggedIn = true;
			priceOfcoin()
			ActiveBettings();
			MyCurrentCoinBalance();
			$scope.displayDivs(0);
			console.log(vm.isLoggedIn)
			myProfile();
			//$scope.displayDivs(0);
			/*$scope.Bettings = contract_instance.BettingPlacedEvent({},{ fromBlock: '0', toBlock: 'latest' })
			$scope.Bettings.watch(function(error, bets){
				if (error)
					console.log('Error in myEvent event handler: ' + error);
				else{
					console.log("Betting placed Events: ",JSON.stringify(bets.args))
					console.log($scope.signingAccount )
					//if(bets.args.by === signingAccount){
					console.log("...........")
					contract_instance.Bets(parseInt(bets.args.BetNumber),function(err,dataActive){
						if(err){
							console.log(err);
						}else{
							if(bets.args.by === $scope.signingAccount ){
								console.log("---->",dataActive,dataActive[5])
								vm.myBettings.push({"betId":parseInt(bets.args.BetNumber),"By":bets.args.by,"minimumCoins":parseInt(bets.args.BaseBetTokens),"maximumCoins":parseInt(bets.args.MaxBetTokens),"multiple":parseInt(bets.args.Multiple),"isActive":dataActive[5]})
								console.log(vm.myBettings);
							}else{
								vm.activeBettings.push({"betId":parseInt(bets.args.BetNumber),"By":bets.args.by,"minimumCoins":parseInt(bets.args.BaseBetTokens),"maximumCoins":parseInt(bets.args.MaxBetTokens),"multiple":parseInt(bets.args.Multiple)});
								console.log("activeBettings:",vm.activeBettings)
								var WonEvent = contract_instance.bettingEvent({isWon:true},{ fromBlock: '0', toBlock: 'latest' })
								WonEvent.watch(function(error, wonBets){
									if (error)
										console.log('Error in myEvent event handler: ' + error);
									else{
										console.log("Won Event : ",JSON.stringify(wonBets.args))
										for(var i=0;i<vm.activeBettings.length;i++){
											if(parseInt(wonBets.args.betId) ==vm.activeBettings[i].betId){
												vm.activeBettings.splice(i,1);
												console.log("After Won events",vm.activeBettings)
											}
										}
									}
								})
							}
						}
					})
				}
			})*/	
		}else{
			alert("Address cannot found");
		}
	}
	$scope.canCheck = 0;
	function myProfile(){
		contract_instance.getAllBetIds({from:$scope.signingAccount},function(err,data){
			if(err){
				console.log(err);
			}else{

				console.log(" All BettingIDs",data)
				$scope.allBettingIds=data;
				console.log("$scope.allBettingIds : ",$scope.allBettingIds)
				console.log($scope.canCheck,$scope.allBettingIds.length)
				if($scope.canCheck<$scope.allBettingIds.length){
					for(var i=$scope.canCheck;i<$scope.allBettingIds.length;i++){
						console.log(" id -----> ",parseInt($scope.allBettingIds[i]),i);
						$scope.toStop = false;
						contract_instance.Bets($scope.allBettingIds[i],function(err2,betsdata){
							if(err2){
								console.log(err2);
							}else{
								var temp ;
								console.log(" id2 -----> ",parseInt($scope.allBettingIds[i]),i);
								console.log("betsdata : ",betsdata)
								if(betsdata[1] === $scope.signingAccount ){
									console.log("---->",betsdata[4])
									vm.myBettings.push({"betId":parseInt(betsdata[0]),"By":betsdata[1],"minimumCoins":parseInt(betsdata[2]),"maximumCoins":parseInt(betsdata[3]),"multiple":parseInt(betsdata[4]),"isActive":betsdata[5]})
									console.log(vm.myBettings);
								}else if (betsdata[5] === true){

									vm.activeBettings.push({"betId":parseInt(betsdata[0]),"By":betsdata[1],"minimumCoins":parseInt(betsdata[2]),"maximumCoins":parseInt(betsdata[3]),"multiple":parseInt(betsdata[4])});
									console.log("activeBettings:",vm.activeBettings)
									var WonEvent = contract_instance.bettingEvent({isWon:true},{ fromBlock: '0', toBlock: 'latest' })
									WonEvent.watch(function(error, wonBets){
										if (error)
											console.log('Error in myEvent event handler: ' + error);
										else{
											console.log("Won Event : ",JSON.stringify(wonBets.args))
											for(var i=0;i<vm.activeBettings.length;i++){
												if(parseInt(wonBets.args.betId) ==vm.activeBettings[i].betId){
													vm.activeBettings.splice(i,1);
													console.log("After Won events",vm.activeBettings)
												}
											}
											for(var i=0;i<vm.activeBettings.length;i++){
												if(parseInt(wonBets.args.betId) ==vm.myBettings[i].betId){
													vm.vm.myBettings[i].isActive =false;
													console.log("After Won events",vm.activeBettings)
												}
											}
										}
									})
								}
							}
						})
					}
					$scope.canCheck = data.length;		
				}
			}
		})
	}
	function ActiveBettings(){
		vm.bettings=vm.activeBettings;
	}
	
	function MyCurrentCoinBalance(){
		contract_instance.coinBalance($scope.signingAccount,function(err,data){
			if(err){
				console.log(err);
			}else{
				$scope.currentCoins=parseInt(data);
				contract_instance.freezedTokens($scope.signingAccount,function(err,data1){
					if(err){
						console.log(err);
					}else{
						$scope.freezedCoins = parseInt(data1);
						console.log("current coin balance : ",$scope.currentCoins,$scope.freezedCoins)
					}
				})
			}
		})
	}
	
	function priceOfcoin(){
		contract_instance.priceOfEachGameCoin(function(err,data){
			if(err){
				console.log(err);
			}else{
				$scope.PricePerCoin =data/1e18;
				console.log("Price Of each Coin",$scope.PricePerCoin);
			}
		})
	}
	$scope.displayDiv = [true,false,false,false,false]
	$scope.displayDivs = function(index){
		if(index==2){
			ActiveBettings();
		}
		if(index==0){
			$scope.Profile();
		}
		for(var i=0;i<5;i++){
			if(i===index)
				$scope.displayDiv[i] = true;
			else
				$scope.displayDiv[i] = false;
		}
	}
	
	$scope.buyGameCoins = function(){
		vm.priceToPay={}
		if(vm.inGameCoins != undefined){
			alert("Total cost Of the Game Coins Is : "+(vm.inGameCoins*$scope.PricePerCoin)+" ether")
			vm.priceToPay.price = vm.inGameCoins*$scope.PricePerCoin;	
		}
		if(vm.inEther != undefined){
			alert("Total coins You can Buy : "+(vm.inEther/$scope.PricePerCoin)+" Game Coins")
			vm.priceToPay.price = vm.inEther;	
		}
		//vm.priceToPay.PassKey = "jaswanth";
		console.log(vm.priceToPay.price);
		contract_instance.BuyGameCoins({from:$scope.signingAccount,value:web3.toWei(vm.priceToPay.price,'ether'),gas:300000},function(error,result){
			if(error){
				console.log(error)
			}else{
				console.log("result ",result)
				vm.txhash = result;
				console.log("txhash",vm.txhash);
				checkIsMined(vm.txhash,BuyCoins,null);
			}
		})
	}
	function BuyCoins(){
		MyCurrentCoinBalance();
		alert("succesfully bought game coins");
	}
	function checkIsMined(tx,callback,betId){
		web3.eth.getTransactionReceipt(tx,function(error,result){
			if (error){
				console.error("mining error");
			}else{
				if(result == null){
					setTimeout(function() {
						checkIsMined(tx,callback,betId)
					}, 300);
				}else{
					callback(betId)
				}
			}
		})
	}
	vm.clickedBet;
	vm.DoBettingOn = function(index){
		$scope.displayDivs(4);
		vm.clickedBet = vm.bettings[index];
		console.log(vm.clickedBet)
	}
	$scope.betCancel = function(){
		vm.clickedBet =""
		$scope.displayDivs(2);
	}
	$scope.BetForNumber= function(){
		alert(vm.clickedBet.GuessedNumber)
	}
	vm.PlaceMyBetting = function(){
		console.log("Betting details",vm.BettingToBePlaced);
		//vm.BettingToBePlaced.PassKey = "jaswanth";
		contract_instance.PlaceBet(vm.BettingToBePlaced.minCoins,vm.BettingToBePlaced.maxCoins,vm.BettingToBePlaced.multiple,vm.BettingToBePlaced.secretNumber,{from:$scope.signingAccount,gas:222222},function(error,result){
			if(error){
				console.log(error)
			}else{
				console.log("result ",result)

				vm.txhash1 = result;
				console.log("txhash",vm.txhash1);
				
				checkIsMined(vm.txhash1,placeBetting,null);
			}
		})
	}
	function placeBetting(){
		
		vm.BettingToBePlaced =[];
		MyCurrentCoinBalance();
		myProfile();
		alert("successfully Placed Betting");
	}
	$scope.betForNumber = function(){
		console.log(vm.clickedBet);
		//vm.clickedBet.PassKey = "jaswanth";
		
		contract_instance.BetForNumber(vm.clickedBet.betId,vm.clickedBet.guessNumber,vm.clickedBet.BetTokens,{from:$scope.signingAccount,gas:300000},function(err,result){
			if(err){
				console.log(err);
			}else{
				console.log("result ",result)
				vm.txhash2 = result;
				console.log("txhash",vm.txhash2);
				vm.clickedBet = [];
				checkIsMined(vm.txhash2,BetForNumber,vm.clickedBet.betId);
			}
		})
	}
	function BetForNumber(betId){
		vm.clickedBet = [];
		contract_instance.bettingEvent({betId:betId,betBy:$scope.signingAccount,isWon:true},{ fromBlock: 'latest', toBlock: 'latest' }).get(function(err,data){
			if(data.length>0){
				for(var i=0;i<vm.myBettings.length;i++){
					if(vm.myBettings[i].betId == betId){
						vm.myBettings[i].isActive=false;
					}
				}
				myProfile();
				$scope.betCancel();
				alert("succesfully placed betting and you Won :)")

			}else{
				myProfile();
				$scope.betCancel();
				alert("succesfully placed betting but you Lost :(")
			}
		})	
	}

	$scope.Profile = function(){
		myProfile();
		vm.myBettings = vm.myBettings;
		/*$scope.bettingsParticipated = data.bettingsParticipated;
		$scope.betsWon = data.totalWins;
		$scope.betsLost =data.totallost;
		$scope.coinsWon = data.$scope.coinsWon ;
		$scope.coinsLost =data.$scope.coinsLost;*/

		/*var BettingEvent = contract_instance.bettingEvent({betBy:$scope.signingAccount},{ fromBlock: '0', toBlock: 'latest' })
		BettingEvent.watch(function(err,data){
			$scope.betsWon = 0;
			$scope.betsLost= 0;
			$scope.coinsWon  = 0;
			$scope.coinsLost = 0;
			vm.bettingsParticipated = [];
			console.log("Toatal wins :",data)
			var toTest = [];
			if(data!=undefined){
			if(data.length>0){
				console.log(" IS entering into if: ",(data.length))
				var tatalGamesParticipated  = data.length;
				for(var tws=0;tws<data.length;tws++){
					var isWonTemp;
					if(data[tws].args.isWon == true){
						isWonTemp="Won"
					}else{
						isWonTemp = "Lost"
					}
					vm.bettingsParticipated.push({"betid":parseInt(data[tws].args.betId),"isWon":isWonTemp,"AmountLostOrGained":parseInt(data[tws].args.AmountLostOrGained)});
					console.log(vm.bettingsParticipated);
					if(data[tws].args.isWon == true){
						$scope.betsWon++; 
						$scope.coinsWon  += parseInt(data[tws].args.AmountLostOrGained);
					}else{
						$scope.betsLost++;
						$scope.coinsLost += parseInt(data[tws].args.AmountLostOrGained);
					}
				}
			}
			}
		})*/

		contract_instance.getAllBetIds({from:$scope.signingAccount},function(err,iDdata){
			$scope.betsWon = 0;
			$scope.betsLost= 0;
			$scope.coinsWon  = 0;
			$scope.coinsLost = 0;
			vm.bettingsParticipated = [];
			if(err){
				console.log(err);
			}else{
				console.log("ajsdhgjhgfjdhgfdsjhbvhjb.......",iDdata)
				for(var i=0;i<iDdata.length;i++){
				contract_instance.getAllBettingNumbers(iDdata[i],{from:$scope.signingAccount},function(err,betsLength){
				$scope.tr = parseInt(iDdata[i])
				console.log("------>",$scope.tr,iDdata,parseInt(betsLength[0]),parseInt(betsLength[1]))
				if(err){
					console.log(err);
				}else{
					//console.log(parseInt(betsLength))
					for(var j=0;j<parseInt(betsLength[1]);j++){
						//$scope.stopIt = false;
						//for(j=0;$scope.stopIt == false;j++){
							console.log("................",$scope.tr,parseInt(betsLength[j]))
							contract_instance.Bettings(parseInt(betsLength[0]),j,function(err,bettingsData){
								if(err){
									console.log(err);
								}else{
									console.log("bettongs List : ",bettingsData)
									if(bettingsData[2]!= "0x" && bettingsData[2]==$scope.signingAccount){
										var StrWonLoss;
										if(bettingsData[3] == true){
											$scope.betsWon++;
											$scope.coinsWon  += parseInt(bettingsData[4]);
											StrWonLoss = "Won"
										}else if(bettingsData[3] == false){
											$scope.betsLost++;
											$scope.coinsLost  += parseInt(bettingsData[4]);
											StrWonLoss = "Lost"
										}
										vm.bettingsParticipated.push({"betid":parseInt(bettingsData[0]),"isWon":StrWonLoss,"AmountLostOrGained":parseInt(bettingsData[4])});
									}
								}
							})
						//}
					}
				}
			})
			}
		}
	})
	}
}])