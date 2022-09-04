#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
let username;
const sleep = (ms=2000)=> new Promise((r)=>setTimeout(r,ms));
async function welcome(){
    const rainbowTitle=chalkAnimation.rainbow(
        'The epic C quiz.'
    );
    await sleep();
    rainbowTitle.stop();
    console.log(`
        ${chalk.bgRed('HOW TO PLAY')}
        I just became a process on your computer.
        I can kill anything I want.
        If you answer wrong, i'll ${chalk.redBright('kill')} the process of your entire ${chalk.red('system')}
        Just answer everything correctly, and i\'ll let you go!
    `);
}
async function askName(){
    const answers = await inquirer.prompt({
        name: 'username',
        type: 'input',
        message: 'Enter your username.',
        default(){
            return 'user';
        },
    });
    username = answers.username;
}
async function q1(){
    const answers = await inquirer.prompt({
        name: 'q1',
        type: 'list',
        message: `C was created by...\n`,
        choices:[
            'Charles Renlett Flint',
            'Dennis Ritchie',
            'George Washington',
            `${username}`
        ],
    });
    return handleAnswer(answers.q1 == 'Dennis Ritchie');
}
async function q2(){
    const answers = await inquirer.prompt({
        name: 'q2',
        type: 'list',
        message: `Semicolons are required by C\n`,
        choices:[
            'Yes',
            'No'
        ],
    });
    return handleAnswer(answers.q2 == 'Yes');
}
async function q3(){
    const answers = await inquirer.prompt({
        name: 'q3',
        type: 'list',
        message: `And lastly, is C interpreted, or compiled?`,
        choices:[
            'Compiled',
            'Interpreted',
            'Interpiled'
        ],
    });
    return handleAnswer(answers.q3 == 'Compiled');
}
async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if(isCorrect){
        spinner.success({ text: 'Good job, ROLL THE NEXT QUESTION!' });
    }else{
        spinner.error({ text: `Nice try ${username}, IT'S TIME TO- i'm just kidding i'm not actually a virus.` });
        process.exit(1);
    }
}
function winner(){
    console.clear();
    console.log(`Nice! ${username}, good job. I will rest back in my JS file. It's been fun.`);
    const fmsg = `B y e !`;
    figlet(fmsg,(err,data)=>{
        console.log(gradient.pastel.multiline(data));
    });
}
await welcome();
await askName();
await q1();
await q2();
await q3();
await winner();
