// Knapsack Calculator 
var rownum
var kpcapacity

var kpResultantProfitId = document.getElementById("kpResultantProfit")
var kpProfitId = document.getElementById("kpProfit")
var kpWeightId = document.getElementById("kpWeight")
var kpProfitWeightId = document.getElementById("kpProfitWeight")
var kpResultantSolutionId = document.getElementById("kpResultantSolution")
var kp01ResultantProfitId = document.getElementById("kp01ResultantProfit")
var kp01ProfitId = document.getElementById("kp01Profit")
var kp01WeightId = document.getElementById("kp01Weight")

var weightValue, profitValue
var profit = [];
var weight = [];
var profit_weight = []
var tempList = []
var resultantSolution = []
var i, j, knapsackResultantProfit = 0;

function createtable() 
{
    kpcapacity = document.getElementById('capacity').value;
    rownum
 = document.getElementById('rows').value;
    var theader = '<table class="table table-bordered" id="table"> <tr><th scope="col">Items</th> <th scope="col">Profit</th> <th scope="col">Weight</th></tr>';
    var tbody = '';

    for (var i = 0; i < rownum
    ; i++) 
    { 
        tbody += '<tbody><tr>';
        tbody += '<td>';
        tbody += 'Item ' + i
        tbody += '</td>'
        for (var j = 0; j < 2; j++) 
        {
            tbody += '<td>';
            tbody += '<input type="number" class="form-control" placeholder="Value"/>'
            tbody += '</td>'
        }
        tbody += '</tr></tbody>\n';
    }
    var tfooter = '</table>';
    document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
}

function loadresult() 
{
    kpcapacity = document.getElementById('capacity').value;
    rownum
 = document.getElementById('rows').value;
    
    knapsackResultantProfit = 0;
    profit = [];
    weight = [];
    profit_weight = []
    tempList = []

    var resultclass = document.getElementsByClassName("result");
    console.log(resultclass.length);
    
    for (i = 0; i < resultclass.length; i++) {
        resultclass[i].style.visibility = "visible";
    }

    var tableId = document.getElementById("table")
    for (var i = 1; i <= rownum
    ; i++) {
        profitValue = tableId.rows[i].cells[1].children[0].value;
        profit.push(profitValue)
        tempList.push(profitValue)
        weightValue = tableId.rows[i].cells[2].children[0].value;
        weight.push(weightValue)        
    }
    kpalgorithm01()
    sortlists()

    console.log("profit = " + profit);
    console.log("weight = " + weight);
    console.log("profit/weight = " + profit_weight);
    kpalgorithmfract()
    console.log(knapsackResultantProfit);

}


function sortlists()
{
    // to find profit/weight
    for (i = 0; i < rownum
    ; i++) {
        profit_weight[i] = (profit[i] / weight[i])
    }       
    console.log(tempList);
    // to sort profit/weight in decreasing order along with profit and weight list
    var list = [];
    for (i = 0; i < rownum
    ; i++)
        list.push({ 'profit_weight': profit_weight[i], 'profit': profit[i], 'weight': weight[i] });


    list.sort(function (a, b) {
        return ((a.profit_weight > b.profit_weight) ? -1 : ((a.profit_weight == b.profit_weight) ? 0 : 1));
    });

    for (i = 0; i < rownum
    ; i++) {
        profit_weight[i] = +(list[i].profit_weight).toFixed(3)
        profit[i] = list[i].profit;
        weight[i] = list[i].weight;
    }
}

// fractional knapsack algorithm
function kpalgorithmfract() 
{

    for (i = 0; i < rownum; i++) 
    {
        if (weight[i] <= kpcapacity)
        {
            kpcapacity -= weight[i]
            knapsackResultantProfit += +profit[i]
            tempList[tempList.indexOf(profit[i])] = 1
        }
        else if(kpcapacity != 0) {
            knapsackResultantProfit = +knapsackResultantProfit + +(profit[i] * (kpcapacity / weight[i]))
            tempList[tempList.indexOf(profit[i])] = kpcapacity + "/" + weight[i]
            kpcapacity = 0
        }
        else {
            tempList[tempList.indexOf(profit[i])] = 0
        }
    }

    kpResultantProfitId.innerHTML = +knapsackResultantProfit.toFixed(3)
    kpProfitId.innerHTML = profit
    kpWeightId.innerHTML = weight
    kpProfitWeightId.innerHTML = profit_weight
    kpResultantSolutionId.innerHTML = tempList
}

// 0/1 knapsack algorithm
function kpalgorithm01() 
{
    var kptable = new Array(rownum)
    for (i = 0; i <= rownum; i++) 
    {

        kptable[i] = Array(kpcapacity)
        for (j = 0; j <= kpcapacity; j++) 
        {
            kptable[i][j] = 0
        }
    }

    var theader = '<table class="table table-bordered">';
    var tbody = '';

    for (i = 1; i <= rownum ; i++) 
    {
        for (j = 0; j <= kpcapacity; j++) 
        {
            if (weight[i - 1] <= j) {
                kptable[i][j] = (Math.max(kptable[i - 1][j], +kptable[i - 1][j - weight[i - 1]] + +profit[i - 1]));
                tbody += '<td>';
                tbody += kptable[i][j];
                tbody += '</td>'
            }
            else {
                kptable[i][j] = kptable[i - 1][j]
                tbody += '<td>';
                tbody += kptable[i][j];
                tbody += '</td>'
            }
        }
        tbody += '</tr></tbody>\n';
    }

    var tfooter = '</table>';
    document.getElementById('kptable').innerHTML = theader + tbody + tfooter;
    console.log(kptable);
    console.log(kptable[rownum][kpcapacity]);

    kp01ResultantProfitId.innerHTML = kptable[rownum][kpcapacity]
    kp01ProfitId.innerHTML = profit
    kp01WeightId.innerHTML = weight
}