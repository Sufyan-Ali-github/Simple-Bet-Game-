// 1.Dopisit Some Money
// 2.Determine the number of lines to bet on
// 3.Collect the a bet ammount
// 4.Spin the Slot
// 5.Check if the user won
// 6.Give the user their winning
// 7.Play again

const prompt=require("prompt-sync")();


const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT={
    "A":2,
    "B":4,
    "C":6,
    "D":8
};

const SYMBOLS_VALES={
    "A":5,
    "B":4,
    "C":3,
    "D":2
};




const Deposit=() => {
    while(true){
    const DepositAmount=prompt("Enter the Amount Are you Deposit: ");
    const NumberDeposit=parseFloat(DepositAmount);
    if(isNaN(NumberDeposit) || NumberDeposit <=0 ){
        console.log("Invalid Deposit Amount,Try Again");
    }else{
        return NumberDeposit;
    }
}
}


const getNumberOfLines=()=>{
    while(true){
        const lines=prompt("Enter the Number of lines to Bet on (1-3): ");
        const Numberlines=parseFloat(lines);
        if(isNaN(Numberlines) || Numberlines <= 0 || Numberlines > 3 ){
            console.log("Invalid Number of Lines,Try Again");
        }else{
            return Numberlines;
        }
    }

}

const betAmount=(Balance,Lines)=>{
    while(true){
        const betMoney=prompt("Enter the Amount of your Bet: ");
        const NumberBet=parseFloat(betMoney);
        if(isNaN(NumberBet) || NumberBet <= 0 ||  NumberBet > Balance / Lines ) {
            console.log("Invalid Bet Amount,Try Again");
        }else{
            return NumberBet;
        }
    }

}


const spin=()=>{
    const symbols=[];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
    }
    const reels=[];
    for(let i=0; i<COLS; i++){
        reels.push([]);
        const reelsSymbols=[...symbols];
        for(let j=0; j<ROWS; j++){
            const randomIndex=Math.floor(Math.random() * reelsSymbols.length);
            const selectedSymbol=reelsSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelsSymbols.splice(randomIndex,1);
            
        }
    }
    return reels;
}

const transpose=(reels) =>{
    const rows=[];
    for(let i=0; i<ROWS ; i++){
        rows.push([])
        for(let j=0; j<COLS ; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows=(rows) =>{
    for(const row of rows){
        let rowString=" ";
        for(const [i,symbol] of row.entries() ){
            rowString += symbol;
            if( i != row.length -1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }

}

const getWinning=(reelsResult,betOfAmount,numberLines) =>{
    let winnings=0;
    for(let row=0; row <numberLines ; row++){
        const symbols=reelsResult[row];
        let allSame=true;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winnings += betOfAmount * SYMBOLS_VALES[symbols[0]]
        }
    }
    return winnings;
}


const game=()=>{

let Balance=Deposit();
while(true){
    console.log("You have a balance of $ " + Balance);
const numberLines=getNumberOfLines();
const betOfAmount=betAmount(Balance,numberLines);
Balance -=betOfAmount * numberLines;
const reels=spin();

const reelsResult=transpose(reels);

printRows(reelsResult);

const winning=getWinning(reelsResult,betOfAmount,numberLines);
Balance -=betOfAmount * numberLines;
console.log("You won , $ " + winning.toString());
if(Balance <=0){
    console.log("You ran out of money");
    break;
}
const playAgain=prompt("Are u Play again (y/n) ? ");

if(playAgain != "y"){
    break;
}

}


}

game();

