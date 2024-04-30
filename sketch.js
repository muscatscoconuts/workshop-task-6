let font1;


let userInput;
let button;
let userLine;
let response;

let poem = [];

function preload(){
  font1 = loadFont ('Jacquard12Charted-Regular.ttf');
  userInput = createInput();
  userInput.position (40,50);
  button = createButton ('add to poem');
  button.position(userInput.x, userInput.y + 20);
  button.mousePressed (newline);
}


function setup() {
  createCanvas(400, 400);
  textFont(font1);
}

function draw() {
  background(163, 255, 246);
  writePoem();

}

function newline (){
  userLine = userInput.value();
  userInput.value('');


  let words = RiTa.tokenize(userLine);
  userLine = '';
  for(x=0; x < words.length; x ++){
    if (RiTa.isNoun(words[x])){
      userLine += RiTa.randomWord({pos: "nn"});
      
    } else {
        userLine += RiTa.randomWord({numSyllables: 5, maxLength: 12});
        
      }
      userLine += ' ';


    }
  poem.push(userLine);

  let r = floor (random(0, words.length));
  let rhymes = RiTa.rhymesSync(words[r]);
  if (rhymes.length === 0){
    poem.push(userLine);
  } else {  
    let changedWord = random(rhymes);
    words[r]= changedWord;
    userLine = RiTa.untokenize(words);
    poem.push(userLine);

  }
 
  }

 

function writePoem (){
  for(x = 0; x < poem.length; x++){
    fill(random(0,255), random(0,255), random(0,255))
    text(poem[x], 40, 110 + x * 20);

  }
}