//Lexical analyzer - removes unwanted symbols and uppercase letters
function lexer(expr,format) {
    //LOAD OBJECTS WITH TYPE AND VALUE INFO IN THERE
    let tokens = [];
    let count = 0;
  
    //nothing
    if (expr.length == 0) {
      console.log("Nothing.");
      return tokens;
    }
  
    console.log(
      "\n////////////////TOKENIZING VALID CHARACTERS////////////////////"
    );
    for (let read = 0; read < expr.length; read++) {
      //START FROM BEGINNING
      let el = expr[read];
  
      //LOWERCASE LETTER HANDLER
      const letters = /[a-z]/;
      if (letters.test(el)) {
        let character = "";
  
        while (true) {
          character += el;
          //if EOI or next input character is not a letter type of unit keyword
          if (read + 1 == expr.length || !letters.test(expr[1 + read])) {
            break;
          }
          el = expr[++read];
        }
  
        tokens.push({ id: "C", value: character });
        count++;
        continue;
      }
      //DIGIT HANDLER
      const digits = /[0-9]/;
      if (digits.test(el)) {
        let number = "";
  
        while (true) {
          number += el;
          //if EOI or next input character is not a digit type
          if (read + 1 == expr.length || !digits.test(expr[1 + read])) {
            break;
          }
          el = expr[++read];
        }
  
        tokens.push({ id: "N", value: number });
        count++;
        continue;
      }
      //OPERATORS
      if (/[-\+\*\/]/.test(el)) {
        tokens.push({ id: "O", value: el });
        count++;
        continue;
      }
      //PARENTHESES
      if (/[\(\)]/.test(el)) {
        tokens.push({ id: "P", value: el });
        count++;
        continue;
      }
      //DECIMAL POINT
      if (/\./.test(el)) {
        tokens.push({ id: "D", value: el });
        count++;
        continue;
      }
      //WHITESPACES
      if (/[ ]/.test(el)) {
        console.log(`Ignoring whitespace on index ${read}`);
        continue;
      }
      //INVALID CHARACTERS
      console.log(
        `Invalid character found at index #${read}[${el}]\ninput expr [${expr}] rejected.\nTotal of lexical structures: ${count} `
      );
      tokens = []; //clear array
      return tokens;
    }
  
    console.log(
      `input expr: ${expr}\nUnit of measurement for this project: ${format}`
    );
    console.log(
      `**LEXER**\nTotal of lexical structures: ${count}\nSend to parser`
    );
    console.log(tokens);
  
    return tokens;
  }
  
  ///////LEXER END/////////

  module.exports = { lexer }