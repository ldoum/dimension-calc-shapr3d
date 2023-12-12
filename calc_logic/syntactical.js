//Helpers//
//helper function for grammarizer that takes a unit you selected and returns a constant for the unit format of the project
////////////////////////////UNIT CONVERSION DICTIONARY BEGIN////////////////////////////

function unit_conv(target_unit) {
    switch (format) {
      case "mm":
        switch (target_unit) {
          case "cm":
            return "10";
  
          case "m":
            return "1000";
  
          case "in":
            return "25.4";
  
          case "ft":
            return "304.8";
  
        }
  
      case "cm":
        switch (target_unit) {
          case "mm":
            return "0.1";
  
          case "m":
            return "100";
  
          case "in":
            return "2.54";
  
          case "ft":
            return "30.48";
      
        }
      case "m":
        switch (target_unit) {
          case "mm":
            return "0.001";
  
          case "cm":
            return "0.01";
  
          case "in":
            return "0.0254";
  
          case "ft":
            return "0.3048";
    
        }
      case "in":
        switch (target_unit) {
          case "mm":
            return "0.03937";
  
          case "cm":
            return "0.3937";
  
          case "m":
            return "39.3701";
  
          case "ft":
            return "12";
          
        }
      case "ft":
        switch (target_unit) {
          case "mm":
            return "0.003281";
  
          case "cm":
            return "0.03281";
  
          case "m":
            return "3.2808";
  
          case "in":
            return "0.08333";
         
        }
      
    }
  }
  
  ////////////////////////////UNIT CONVERSION DICTIONARY END////////////////////////////
  
  //////////clarifier BEGIN//////////////
  
function clarifier(tokens, format) {
    let grammar = [];
    let params = 0;
    let operands = 0;
    let operators = 0;
    let negs = 0;
    let parse_ct = 0;
    let error_flags = 0;
    let error_stats = "";
  
    console.log(
      "\n////////////////CHECKING FOR PROPER GRAMMAR///////////////////"
    );
    //Checkpoint 1
    for (let scroll = 0; scroll < tokens.length; scroll++) {
      //check for neg sign in beginning of expr
      if (scroll == 0 && tokens[0].value == "-") {
        //grammar.push({ type: "unary", value: tokens[0].value }); //tag
        grammar.push(
          { type: "operand", value: "-1" },
          { type: "operator", value: "*" }
        );
        negs++;
        operands++;
        operators++;
        parse_ct += 2;
        continue;
      }
  
      //if op token exists but is not -
      if (scroll == 0 && tokens[0].id == "O" && tokens[0].value != "-") {
        error_stats += `#${++error_flags}: Improper operator key. Error id C1A\n`;
      }
  
      //if unit token is found at beginning of expr
      if (scroll == 0 && tokens[0].id == "C") {
        error_stats += `#${++error_flags}: Improper unit key. Error id C1B\n`;
      }
  
      //Cases O, N, C, P
      switch (tokens[scroll].id) {
        case "O":
          let math = "";
          while (true) {
            //first element in
            math += tokens[scroll].value;
  
            //stop if next id is not an operator
            if (
              scroll + 1 == tokens.length ||
              /[^O]/.test(tokens[1 + scroll].id)
            ) {
              break;
            }
            //NEXT TOKEN
            scroll++;
          }
  
          //OPERATORS AND UNARY
          if (math.length == 2 && math[1] == "-") {
            grammar.push(
              {
                type: "operator",
                value: math[0],
              },
              { type: "operand", value: "-1" },
              { type: "operator", value: "*" }
            );
  
            negs++;
            operators += 2;
            operands++;
            parse_ct += 3;
            continue;
          }
          //OPERATOR
          if (math.length == 1 && tokens[scroll - 1].value != "(") {
            grammar.push({
              type: "operator",
              value: math,
            });
            operators++;
            parse_ct++;
            continue;
          }
  
          //- OPERATOR AND OPEN PARENTHESES
          if (
            math.length == 1 &&
            tokens[scroll - 1].value == "(" &&
            math == "-"
          ) {
            grammar.push(
              { type: "operand", value: "-1" },
              { type: "operator", value: "*" }
            );
            negs++;
            operators++;
            operands++;
            parse_ct += 2;
            continue;
          }
  
          //ELSE
          error_stats += `#${++error_flags}: Improper lexical structure for operator. Error id C1C\n`;
  
        case "C":
          //if this character is not a unit
          if (!/^(mm|m|cm|in|ft)$/.test(tokens[scroll].value)) {
            error_stats += `#${++error_flags}: This sequence [${tokens[scroll].value}] is not a unit. Error id C1D\n`;
            
          } else {
  
          let my_unit = tokens[scroll].value;
  
          grammar.push(
            { type: "operator", value: "*" },
            {
              type: "operand",
              value: format != my_unit ? unit_conv(my_unit) : "1",
            }
          );
  
          operands++; //constant is treated as an operand
          operators++;
          parse_ct += 2;
      }
          break;
  
        case "N":
          let oppy = "";
          while (true) {
            oppy += tokens[scroll].value;
  
            //stop if next id is not a number or dot
            if (
              scroll + 1 == tokens.length ||
              /[OPC]/.test(tokens[1 + scroll].id)
            ) {
              break;
            }
  
            //NEXT TOKEN
            scroll++;
          }
  
          //validator and new token maker
          if (/^(\d+|\d+\.\d+)$/.test(oppy)) {
            grammar.push({ type: "operand", value: oppy });
            operands++;
            parse_ct++;
            continue; //jump to next indice
          }
  
          //ELSE
          error_stats += `#${++error_flags}: Improper lexical structure for operand. Error id C1E\n`;
  
        case "P":
          if (tokens[scroll].value == "(") {
            grammar.push({ type: "parentheses", value: tokens[scroll].value });
            params++;
            parse_ct++;
            continue;
          }
  
          if (tokens[scroll].value == ")") {
            grammar.push({ type: "parentheses", value: tokens[scroll].value });
            params--;
            parse_ct++;
            continue;
          }
  
        default:
          error_stats += `#${++error_flags}: Improper grammar. Error id C1F\n`;
      }
    }
  
    //PARENTHESES STATUS//
  
    //Checkpoint 2
    if (params > 0) {
      error_stats += `#${++error_flags}: Too many ( . ${params} over. Error id C2A\n`;
    }
    if (params < 0) {
      error_stats += `#${++error_flags}: Too many ) . ${
        -1 * params
      } over. Error id C2B\n`;
    }
  
    /*     Final checkpoint
    If operands odd and operators even or operands even and operators odd, accept the grammar. Otherwise, dump grammar tokens array 
  
    */
  
    if (
      !(
        (operands % 2 == 1 && operators % 2 == 0) ||
        (operands % 2 == 0 && operators % 2 == 1)
      )
    ) {
      error_stats += `#${++error_flags}: Pattern error!!! [${operands} operands > ${operators} operators]\n`;
      //error_flags++;
    }
  
    if (error_flags > 0) {
      console.log("Errors found: ");
      console.log(error_stats);
      console.log("Grammar rejected.");
      grammar = []; //clear array
      return grammar;
    }
  
    //FINISH
    console.log(`Grammar accepted!!! [${operands} > ${operators}] `);
  
    //Grammar array
    console.log(`Total of syntactical structures: ${parse_ct}`);
    console.log(grammar);
  
    //SEQUENCE STATUS//
    console.log(`Total operands: ${operands}`);
    console.log(`Total operators: ${operators}`);
    console.log(`Total negs: ${negs}`);
  
    let human = [];
    for (let i = 0; i < grammar.length; i++) {
      human.push(grammar[i].value);
    }
    console.log(`\nInfix notation: ${human}`);
  
    return grammar;
  }
  
  //////////GRAMMARIZER END//////////////

  module.exports = { clarifier  }