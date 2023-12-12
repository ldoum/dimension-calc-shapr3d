const {lexer} = require("./calc_logic/lexical.js");
const {clarifier} = require("./calc_logic/syntactical.js");
const {parser} = require("./calc_logic/postfix.js");
const {solver} = require("./calc_logic/mathcore.js");

let format = "in";

//INPUT
var input = "5+10*3*3-12"; //return 5

//////CONNECT ALL FUNCTIONS///////////
function user(equation_expr,format) {
  const lex = lexer(equation_expr,format);
  const gramm = clarifier(lex, format);
  const parse = parser(gramm);
  return solver(parse);
}
////////////////////////////

console.log(`\nThe answer is: ${user(input, format)} ${format}`);


module.exports = {user};
