// const
const inquirer = require(`inquirer`);
const generateMarkdown = require(`./utils/generateMarkdown`);
// const futureConstHere

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
        // validate(value) {
        //     const pass = value.match(
        //     /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i,
        //     );
        //     if (pass) {
        //         return true;
        //     }
        //     return 'Please enter a valid phone number';
        // },
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
    }
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
