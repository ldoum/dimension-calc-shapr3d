///////////////////////HELPER/////////////
function pre(op) {
    switch (op) {
      case "-":
      case "+":
        return 1;
      case "/":
      case "*":
        return 2;
      default: //open parentheses
        return 0;
    }
  }
  //////////////PARSER BEGIN/////////////////
function parser(into) {
    let postfix = [];
    let stack = [];
  
    console.log("\n///////////SHUFFLING INPUT EXPRESSION AROUND/////////////");
  
    for (let i = 0; i < into.length; i++) {
      switch (into[i].type) {
        case "operand":
          postfix.push(into[i]);
  
          console.log(`\n[Ind ${i}]`);
          console.log(`postfix: `);
          console.log(postfix);
          console.log(`stack: `);
          console.log(stack);
          break;
  
        case "operator":
          //if stack is empty
          if (stack.length == 0) {
            stack.push(into[i]);
  
            console.log(`\n[Ind ${i}]`);
            console.log(`postfix: `);
            console.log(postfix);
            console.log(`stack: `);
            console.log(stack);
            continue;
          }
  
          //scanned op has same precedence as topmost op
          if (pre(stack[stack.length - 1].value) == pre(into[i].value)) {
            postfix.push(stack.pop()); //send ops to postfix
            stack.push(into[i]); //push low precedent into stack
  
            console.log(`\n[Ind ${i}]`);
            console.log(`postfix: `);
            console.log(postfix);
            console.log(`stack: `);
            console.log(stack);
            continue;
          }
  
          //scanned op has high precedence than topmost op
          if (pre(stack[stack.length - 1].value) < pre(into[i].value)) {
            stack.push(into[i]); //push high precedent into stack
  
            console.log(`\n[Ind ${i}]`);
            console.log(`postfix: `);
            console.log(postfix);
            console.log(`stack: `);
            console.log(stack);
            continue;
          }
  
          //scanned op has precedence lower than topmost op
          if (pre(stack[stack.length - 1].value) > pre(into[i].value)) {
            //in case either theres 1 op of high precedence or 2 ops where the bottom is low prcedence and the top is high
            postfix.push(stack.pop()); //send all ops to postfix
  
            //if stack is not empty and new topmost operator has same precedence as scanned operator
            if (
              stack.length != 0 &&
              pre(stack[stack.length - 1].value) == pre(into[i].value)
            ) {
          
              postfix.push(stack.pop());
            }
  
            stack.push(into[i]); //push low precedent into stack
  
            console.log(`\n[Ind ${i}]`);
            console.log(`postfix: `);
            console.log(postfix);
            console.log(`stack: `);
            console.log(stack);
            continue;
          }
  
        case "parentheses":
          if (into[i].value == "(") {
            stack.push(into[i]); //push this into stack
  
            console.log(`\n[Ind ${i}]`);
            console.log(`postfix: `);
            console.log(postfix);
            console.log(`stack: `);
            console.log(stack);
            continue;
          }
  
          if (into[i].value == ")") {
            //send ops after (
            for (let r = stack.length; stack[r - 1].value != "("; r--) {
              postfix.push(stack.pop());
            }
  
            stack.pop(); //scrap open parentheses
  
            console.log(`\n[Ind ${i}]`);
            console.log(`postfix: `);
            console.log(postfix);
            console.log(`stack: `);
            console.log(stack);
            continue;
          }
      }
    }
  
    //if operators still remain in stack after the infix expression token stream is read
    if(stack.length != 0){
    for (let x = stack.length; x > 0; x--) {
      postfix.push(stack.pop()); //send all ops to postfix
    }
  
    console.log(`\n[Ind ${into.length - 1}] *stack has operand(s) left over*`);
    console.log(`postfix: `);
    console.log(postfix);
    console.log(`stack: `);
    console.log(stack);
  }
  
    let note = [];
    for (let n = 0; n < postfix.length; n++) {
      note.push(postfix[n].value);
    }
    console.log(`\nPostfix notation: ${note}`);
  
    return postfix;
  }
  //////////////PARSER END/////////////////

  module.exports = { parser  }