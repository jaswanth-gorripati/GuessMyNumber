var app =  angular.module("gmn",[])
app.controller("mainCtrl",['$log','$scope','$http',function($log,$scope,$http){

	var vm =  this;
	/*if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		// set the provider you want from Web3.providers
		web3 = new Web3(new Web3.providers.$httpProvider("http://localhost:8545"));
	}*/
	vm.Account={};
	vm.isLoggedIn = false;
	$scope.logIn = function(){
		$http.post("/login",vm.Account).success(function(data){
			console.log(data)
			if(data=true){
				vm.isLoggedIn = true;
				ActiveBettings();
				MyCurrentCoinBalance();
				$scope.displayDivs(0);
				console.log(vm.isLoggedIn)
			}else{
				alert("Invalid Account Address Try Again")
			}
		}).error(function(err){
			console.log(err)
		})
	}
	
	function ActiveBettings(){
		$http.get("/activeBettings").success(function(data){
			console.log(data)
			vm.bettings=data;
			console.log("Bettings",vm.bettings);
		}).error(function(error){
			console.log("error",error)
		})
	}
	
	function MyCurrentCoinBalance(){
		$http.get("/myCoins").success(function(data){
			console.log(data)
			$scope.currentCoins=data.currentCoins;
			$scope.freezedCoins = data.freezedCoins;
			console.log("currentCoins",$scope.currentCoins);
			console.log("freezedCoins",$scope.freezedCoins);
		}).error(function(error){
			console.log("error",error)
		})
	}
	
	$http.get("/priceOfEachCoin").success(function(data){
		$scope.PricePerCoin =data/1e18;
		console.log("Price Of each Coin",$scope.PricePerCoin);
	}).error(function(error){
		console.log("error",error)
	})
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
			alert("Total coins You can Buy : "+(vm.inEther/$scope.PricePerCoin)+"")
			vm.priceToPay.price = vm.inEther;	
		}
		vm.priceToPay.PassKey = "jaswanth";
		$http.post('/buyGameCoins',vm.priceToPay).success(function(data){
			console.log("msg",data);
			MyCurrentCoinBalance();
			alert(data);
		}).error(function(error){
			console.log("error",error)
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
		vm.BettingToBePlaced.PassKey = "jaswanth";
		$http.post('/placeBetting',vm.BettingToBePlaced).success(function(data){
			console.log("Plac Betting",data);
			vm.BettingToBePlaced=""
			MyCurrentCoinBalance();
			alert(data);
		}).error(function(error){
			console.log("error",error)
		})
	}
	$scope.betForNumber = function(){
		console.log(vm.clickedBet);
		vm.clickedBet.PassKey = "jaswanth";
		$http.post('/betForNumber',vm.clickedBet).success(function(data){
			console.log(data)
			$scope.betCancel()
			MyCurrentCoinBalance();
		}).error(function(error){
			console.log("error",error)
		})
	}
	$scope.Profile = function(){
		$http.get('/getProfile').success(function(data){
			console.log("Got Profile",data)
			$scope.myBettings = data.myBettings;
			$scope.bettingsParticipated = data.bettingsParticipated;
			$scope.betsWon = data.totalWins;
			$scope.betsLost =data.totallost;
			$scope.coinsWon = data.totalAmountWon;
			$scope.coinsLost =data.totalAmountLost;
		}).error(function(error){
			console.log("error",error)
		})
	}
}])