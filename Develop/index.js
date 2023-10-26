// const
const fs = require(`fs`);
const inquirer = require(`inquirer`);
const generateMarkdown = require(`./utils/generateMarkdown`);

const licenses = {
    none: `None`,
    MIT: `MIT // Massachusetts Institute of Technology License`,
    BSD: `BSD // Berkeley Software Distribution License`,
    ISC: `ISC // Internet Software Consortium License`,
    GPL: `GPL // GNU General Public License`,
    APACHE: `APACHE // Apache License`,
}

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
    // Does this app need testing
    // is this a team project?
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
        message: `Enter your Github Username.`, 
    },
    {
        type: `confirm`,
        name: `ifPreview`,
        message: `Do you have a valid link to either an Image, GIF, or Video of the Application?`,
        default: false,
    },
    {
        type: `input`,
        name: `preview`,
        message: `Please enter the link of the image, GIF, or Video of the Application.`,
        // When is a method of Inquirer, conditionally adds questions depending on what the user said previously
        when(response) {
            return response.ifPreview == true;
        },
    },
    {
        name: `installation`,
        type: `input`,
        message: `What are the Application Installation Instructions?`,
        default: `NPM Install`
    },
    {
        name: `usage`,
        type: `input`,
        message: `What are the Directions for Usage?`,
        default: `Node.js`
    },
    {
        type: `list`,
        name: `license`,
        message: `What license does this application utilize?`,
        choices: [
            licenses.none,
            licenses.MIT,
            licenses.BSD,
            licenses.ISC,
            licenses.GPL,
            licenses.APACHE,
        ],
        default: 1,
    },
];

// TODO: Create a function to write README file
// you can not do fs without node
// fs stands for file system (file system library)
// fs has methods, such as writeFile, read, etc
const writeToFile = (fileName, template) => {
    fs.writeFile(fileName, template, (error => {
            error ? console.log(error) : console.log(`README Successfully Generated! You can find it within this folder!`);
        })
    )
};

const askQuestions = () => {
    inquirer.prompt(questions).then((answers) => {
        console.log(`answers to questions:`, answers);
        // use the answers object to inject variables into the readme template which we will generate
        let generatedMarkdownTemplate = generateMarkdown(answers);
        writeToFile(`GeneratedREADME.md`, generatedMarkdownTemplate);
    }).catch((error) => {
        if (error.isTtyError) {
          console.log(`Prompt couldn't be rendered in the current environment`);
        } else {
          console.log(`Something else went wrong`);
        }
    });
};

// TODO: Create a function to initialize app
const init = () => {
    askQuestions();
};

// Function call to initialize app
init();
