module.exports = {
    default: {
        requireModule: ["ts-node/register"],

        require: [
            "src/test/steps/**/*.ts",
            "src/test/hooks/**/*.ts"
        ],


        order:"defined",

        paths: [
            "src/test/features/**/*.feature"
        ],

        order: "defined",

        formatOptions: {
            snippetInterface: "async-await",
            resultsDir: "allure-results" 
        },

        publishQuiet: true,
        dryRun: false,

        format: [
    "allure-cucumberjs/reporter",
    "json:reports/cucumber-report.json",
    "html:reports/cucumber-report.html",
    "rerun:rerun/@rerun.txt"
    ],
        parallel: 1
    },

    rerun: {
        requireModule: ["ts-node/register"],

        require: [
            "src/test/steps/**/*.ts",
            "src/test/hooks/**/*.ts"
        ],

        paths: [
            "@rerun.txt"
        ],

        order: "defined",

        formatOptions: {
            snippetInterface: "async-await",
            resultsDir: "allure-results"
        },

        publishQuiet: true,
        dryRun: false,

        format: [
    "allure-cucumberjs/reporter",
    "json:reports/cucumber-report.json",
    "html:reports/cucumber-report.html",
    "rerun:rerun/@rerun.txt"
    ],
        parallel: 1
    }
};