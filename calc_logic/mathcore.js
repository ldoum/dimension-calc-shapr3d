//////////////CORE////////////////
function calculator(operand1, operand2, op_key) {
    switch (op_key) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
    }
  }
  
  ///////////////SOLVER///////////////
function solver(math) {
    let answer = [];
  
    console.log("\n///////////GENERATING ANSWER/////////////");
  
    for (let j = 0; j < math.length; j++) {
      if (math[j].type == "operand") {
        answer.push(Number(math[j].value));
        console.log(`\nAdding element [${math[j].value}] to stack.`);
        console.log("Answer stack: ");
        console.log(answer);
      } else {
        console.log(
          `\nOperator [${math[j].value}] found! Popping operands [${
            answer[answer.length - 2]
          }] and [${answer[answer.length - 1]}] off.`
        );
        let second = answer.pop();
        let first = answer.pop();
        answer.push(calculator(first, second, math[j].value));
        console.log(
          `Pushing new operand [${calculator(first, second, math[j].value)}] in.`
        );
        console.log("Answer stack: ");
        console.log(answer);
      }
    }
  
    return answer;
  }
  
  module.exports = { solver }