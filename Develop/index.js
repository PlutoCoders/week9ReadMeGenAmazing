// const
const inquirer = require(`inquirer`);
const generateMarkdown = require(`./utils/generateMarkdown`);
// const futureConstHere
const rejexEmailValidation = (value) => {
    let rejexEmailValidationInner = value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return rejexEmailValidationInner;
};

const vanillaJavaScriptValidation = (value) => {
    const validDomains = [`com`, `org`, `gov`, `edu`];
    const errorString = "Please enter a valid email!";
    // includes returns true/false
    let emailHasAt = value.includes(`@`);
    if (emailHasAt == true) {
        // split returns an array
        let emailWebsite = value.split(`@`)[1];
        let emailDomain = emailWebsite.split(`.`)[1];
        let emailHasValidDomain = validDomains.includes(emailDomain);
        // all of these have to be true for the email to be valid
        return value != `` && emailHasValidDomain == true ? true : errorString;
    } else {
        return errorString;
    }
};

// TODO: Include packages needed for this application
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your ReadMe?',
        default: `new Readme`,
    },
    {
        type: 'input',
        name: 'description',
        message: "Enter your application/repo description.",
        default: `New Application`,
    }, 
    // installation instructions
    // Does this app need testing
    // is this a team project?
    // what is the purpose/usage?
    // is there a preview link or image?
    {
        type: `input`,
        name: `email`,
        message: `What is the email linked to your github account?`,
        //even if someone types it all in capital, it will be set to the standard format
        filter(value) {
            return value.toLowerCase();
        },
        //validate comes from inquirer, and gives us a free variable called value
        validate(value) {
         return vanillaJavaScriptValidation(value);
        //  return vanillaJavaScriptValidation(value) && rejexEmailValidation(value);
        },  
    },
    {
        type: `input`,
        name: `username`,
        message: `Enter your Github Username.` 
    },
    {
        type: `list`,
        name: `license`,
        message: `What license does this application utilize?`,
        choices: [
            `none`,
            `MIT // Massachusetts Institute of Technology License`,
            `BSD // Berkeley Software Distribution License`,
            `ISC // Internet Software Consortium License`,
           `GPL // GNU General Public License`,
           `APACHE // Apache License`,
        ],
        default: 1,
    },
];

const askQuestions = () => {
    inquirer.prompt(questions).then((answers) => {
        console.log(`answers to questions:`, answers);
    }).catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
    });
};

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {

};

// TODO: Create a function to initialize app
const init = () => {
    askQuestions();
};

// Function call to initialize app
init();
