var arraySplit = ""; // Used to translate input array back to the user as a string with slice
var exitApplication = false; // on/off switch for running the app
var userInput = ""; // Important - will be used to generate password based on criteria
var finalPassword = ""; // Important - used as a variable to store temporatly a random passoword.
var displayPassword = ""; // Impoprtant- used to display the final password on the text area of the HTML element.

// Mutlidimenional object to use later for criteria and random generating strings.
var pCriteria = {
  lowercase: { indexNumber: 0 , criteria: "abcdefghijklmnopqrstuvwxyz"
  },
  uppercase: { indexNumber: 1, criteria: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  numeric: { indexNumber: 2, criteria: "0123456789"
  },
    symbols: { indexNumber: 3, criteria: "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~"
  }
}

// Call function to generate password criterias and adoption to our code
var generatePassword = function() {
  // Alert user for criteria
  window.alert("The criteria for password generator are lowercase, uppercase, numeric, and/or special characters.");

  // Take user input
    userInput = window.prompt("Select criteria for password (you can select more than one) (use space): 1=lowercase 2=uppercase 3=numeric 4=special characters.\n");
  // If user press cancel while trying to split it will fail, hence we need split after the fact.
  // If user enters exit, let us exit the application.
  // If statement required to split 
  debugger;
  if (!userInput) {
    window.alert("If you wish to close the application, please close this password generator tab.")
    generatePassword();
  } else {
    // Continue with the application. User put a valid input to try to split to array. We can now continue to slice to show the output to user
    userInput = userInput.split(" ");
    // Take the userInput array and slice it from positon 0 to the lenght of the array in order to display it back to the user as string.
    arraySplit = userInput.slice(0,userInput.length);
  }



  // Tell the user what they have selected. 
  window.alert("You have selected: " + arraySplit);

 // Create a for loop to iterate the user input to determine if valid criteria input passed.
 for (var i = 0; i < userInput.length; i++) {
  // Take one item/index from the user input and and moved to an integer for our switch case.
  var inputCriteria = userInput[i];
  // Convert this output into integer for further validation
  var inputCriteriaInteger = parseInt(inputCriteria);
  // Switch case with fall through logic to arrive at conclusions
  switch(inputCriteriaInteger) { // fall through takes care of at least one option is selected.
    case 1:
    case 2:
    case 3:
    case 4:
      //Our array is clean every time we fall through here. We then break to check the next index based on userInput.lenght
      break;
    default: // Anything else that is not our case 1-4 as integers (catch non integers here)
      if (!inputCriteriaInteger) { // We are catching Nulls NaN etc. We will divert it for a !inputCriteriaInteger conditional statement.
        window.alert("Please select a criteria using numbers and only from 1-4 seprated by one space.\nRestarting application");
        generatePassword(); // Recursion back to our function to start the criteria selection again.
      }
      else { // If not !inputCriteriaInteger means that we have non integers here.
        window.alert(" Please select a criteria using numbers and only from 1-4 seprated by space.\n\n" + "User input: " + inputCriteria + " is invalid");
        generatePassword(); // Recursion back to our function to start the criteria selection again.
      } 
  }
}


  // Validate for duped entries by checking the userInput
  var duplicatePassState = true;
  // Arrays, objects and functions are mutable ojbects so "copy" will reference and modify the original.
  // We need to "clone" it by creating an empty array and assigned the same values to our "cloned" array for validation.
  var validateInput = [];
  var round1Shift = "";
  var round1Pop = "";
  var criteria3 = "";
  var criteria4 = "";
  var validateInputArray = []

  // Check first if only one input was proviced to avoid checking for duplicity of criteria numbers.
  if (userInput.length == 1) {
    duplicatePassState = false;
  }

  // Check for duplicity of numbers and send the user back to the generatePassword(); function.
  while (duplicatePassState) {

    //Create array using values
    var tempVar = "";
    for (var i = 0; i < userInput.length; i++) {
      tempVar = userInput[i];
      validateInput.push(tempVar);
    }

    // First check will pass, then second will be checked for duplications
    // nested if statement on else will be used for tis
    round1Shift = validateInput.shift();
    round1Pop = validateInput.pop();
    if (round1Shift === round1Pop) {
      window.alert("Duplication detected, please check criteria rules.");
      generatePassword();
    } 
     
    else {
      // Logic is that if you shift and pop you will be left with 4 items, more than is also validated on other sections.
      // If e.g 1, 2, 1, 3. shift and pop are 1 3 then those are compared with the round do of shift and pop which is 2 and 1.
       debugger;
      var round2Shift = "";
      var round2Pop = "";
      round2Shift = validateInput.shift();
      round2Pop = validateInput.pop();

      // Validate undefined shift and pop. This will then say that first pass was ok. and there is nothing else to check

      if(!round2Shift || !round2Pop) {
        duplicatePassState = false;
        break;
      }


      if (round1Shift === round2Shift) {
        window.alert("Duplication detected, please check criteria rules.");
        generatePassword();
      } else if (round1Pop === round2Pop) {
        window.alert("Duplication detected, please check criteria rules.");
        generatePassword();
      } else if (round1Shift === round2Pop) {
        window.alert("Duplication detected, please check criteria rules.");
        generatePassword();
      } else if (round1Pop === round2Shift) {
        window.alert("Duplication detected, please check criteria rules.");
        generatePassword();
      } // Should not be needed but left in case as it was done on previou if statement.
        else if (round1Shift === round1Pop) {
        window.alert("Duplication detected, please check criteria rules.");
        generatePassword();
      } else if (round2Shift === round2Pop) {
        window.alert("Duplication detected, please check criteria rules.");
        generatePassword();
      } 
      else {
        // Validation has been passed for duplication. Further validation below for numbers not on our case 1-4 and non integer values entered like "r".
        duplicatePassState = false;
      }
    } 
  }

 
   
  // Once we have achived valid criteria input, we want to tell the user what lenght they want from 8-128 characters.
  // Call Function to validate length
  var pLenght = passLenght();

  // We are back from our passLenght() function with sucess.
  // We are now ready to gather our final pssword based on criteia and lenght. 
  // We then use our global variable displayPassword to store the output of our global finalPassword.
  // We then pass the valid userInput and Lenght selected by the user.
  displayPassword = generatePasswordRandomness(userInput,pLenght);

  function generatePasswordRandomness(userInput, pLenght) {
    // Sample will be 8 characters for our test
    // I need it to be from e.g 8--> 0 - 7 for my indexing array to be checked and printed later.
    var valueRandom = 0;
     
    //var counter = 1; // Counter for the while loop
    // We need to at a minimum use the criteria from user first as a "round"
    // E.g 8 lenght selected by user. First round of user input e.g 1 2, lenght of 2 is the array. Therefore I need sample 8 (lenght selected by user)-2(User-input).
    // Round of 2 (strict random in order) and 6 (random after round)
    var counter = userInput.length // Use as our while loop topmost.
    var UserCounter = userInput.length // Counter to say in line with the user input index to avoid undefines random attempts.
    var finalPassword = "";  // Used to stored concatenate the strings together to finally assign to our displayPassword.

    // We need to guarantee user.lenth criteria rounds of purely criteria with random
    for (var i = 0; i < userInput.length; i++) {

      var guaranteedCriteria = userInput[i];
      // Produce string randomness around the userInput criteria of 1-4.
      if (guaranteedCriteria === "1") {
        //Round to the lowest number(Math.floor) after a random(Math.random) all possible alphabetical characters of 26 which will yield 0-25 (note we have 0 index on our objects, so we are good)
        valueRandom = Math.floor(Math.random() * 26);
        // call the pCritera uppercase object and pick a random index and concatenate to our finalPassword variable.
        finalPassword += pCriteria.lowercase.criteria[valueRandom];

      } else if (guaranteedCriteria === "2") {
        
        valueRandom = Math.floor(Math.random() * 26);
        finalPassword += pCriteria.uppercase.criteria[valueRandom];

      } else if (guaranteedCriteria === "3") {

        //Round to the lowest number(Math.floor) after a random(Math.random) of all possible numerals 0-9.
        valueRandom = Math.floor(Math.random() * 10);
        finalPassword += pCriteria.numeric.criteria[valueRandom];

      } else if (guaranteedCriteria === "4") {

        ///Round to the lowest number(Math.floor) after a random(Math.random) of all possible symbols 30 which will yield 0-19.
        valueRandom = Math.floor(Math.random() * 31);
        finalPassword += pCriteria.symbols.criteria[valueRandom];
      } 
    }

    // Now that we finish and concatenaed our strinc user input criteria randomness, we move to finish with the rest of the p.lenght. Our example of 8 range is now 6 left or while  2 < 8.
    while ( counter < pLenght )  {

      // Take one item/index from the user input
      // Lenght is 4 but the index is 3. We need plus 1 to actually inclue the number they selected using the Math.floor and Math.random selected.
      // Catch any undefined or Nan and reduce the UserCounter in order to randomize. Will probably not be required because of prior validations.
      if (!userInput[(UserCounter - 1)]) {
        // E.g (without the +1) 0 3 but will not include 3, therefore we need +1. That will be 0-4 round down to 3.
        // We are now at position undefined, therefore we need to remove one to be inside the userInput array.
        UserCounter -= Math.floor( ( (Math.random() * userInput.length) + 1) );
        counter += 1;
    
      } else {
        // Generate randomness for first round of randomness and add the counter for the random switch cases @ switch(inputCriteriaInteger)
        UserCounter = Math.floor( ( (Math.random() * userInput.length) + 1) );
        counter += 1;
      }

      // Lenght is 4 but the index is 3. Hence -1. 
      //UserCounter used as the random index to tacke the cases which will then randomly get the criteria from the pCriteria object.
      var inputCriteria = userInput[(UserCounter - 1)];
      
      // Make sure the input is an integer (it was validated in other areas of our code.)
      var inputCriteriaInteger = parseInt(inputCriteria);

      switch(inputCriteriaInteger) { // Switch case with inputCriteriaInteger to check our userInput criteria. 
        case 1:
          // Same logic as above but now for the rest of the lenght provided by user. On our case 8 times.
          valueRandom = Math.floor(Math.random() * 26);
          finalPassword += pCriteria.lowercase.criteria[valueRandom];
            break; // Completed, and check for next counter.
        case 2:
          valueRandom = Math.floor(Math.random() * 26);
          finalPassword += pCriteria.uppercase.criteria[valueRandom];
          break;
        case 3:
          valueRandom = Math.floor(Math.random() * 10);
          finalPassword += pCriteria.numeric.criteria[valueRandom];
          break;
        case 4:
          valueRandom = Math.floor(Math.random() * 31);
          finalPassword += pCriteria.symbols.criteria[valueRandom];
          break;
      }
    }
    // Our final password is ready to be returned! --> finalPassword back to displayPassword
    return finalPassword;
  }

  function passLenght () { // This functions validate the user input for lenght of characters from 8-128
    
    // Ask user for lenght of password.
    window.alert("How long do you want your password to be from 8-128 characters.\n E.g 20");
    var pLenght = parseInt(window.prompt("Please enter lenght")); // Convert to ingteger to check valid input.
    if (pLenght < 8 || pLenght > 128) {
      
      window.alert("Please enter a valid number between 8-128");
      passLenght();

    } else if (!pLenght) { // If null or Nan we will send the user back to the passLenght() function.
      window.alert("Please enter a valid number between 8-128")
      passLenght(); // Recurcion back to our function the get lenght.
    } else {
      window.alert("You have entered a valid lenght of: " + pLenght + "\n Password will now be generated");
      return pLenght; // We have a valid lengh, lets return our pLenght value.
    }
  }
}

// Write password to the #password input
function writePassword() {
 
  //initilaize all global variables
  arraySplit = ""; // Used to translate input array back to the user as a string with slice
  exitApplication = false; // on/off switch for running the app
  userInput = ""; // Important - will be used to generate password based on criteria
  finalPassword = ""; // Important - used as a variable to store temporatly a random passoword.
  displayPassword = ""; // Impoprtant- used to display the final password on the text area of the HTML element.
  window.alert(" Lets check our password criteria options");
  var password = generatePassword(); // Call the generatePassword(). Global variable used instead for displayPassword.
  var passwordText = document.querySelector("#password"); // Part of the placholder text querySelectors will be part of later modules.
  
  //passwordText.value = password;
  document.getElementById("password").readOnly = false; // Text in enabled to allow the code to insert password into the text area.
  document.getElementById("password").value = displayPassword; // Display password in text area.
  document.getElementById("password").readOnly = true; // Disable the text area so user can only copy paste and not touch or modify the password provided.
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Verify if we should start the application or not.
function exitApplicationForm () {
   if (exitApplication === true) {
     // Exit the application by doing nothing.
   } else {
     // Start the application
     // To initilze if refreshing
    // exitApplication = false;
     writePassword(); // This is the same function used by the click Generate Password button.
    }
}