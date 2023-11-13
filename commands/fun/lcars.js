//this is what allows us to make this SlashCommand work, This tells discord.js that we want it to read this files as a SlashCommand
const { SlashCommandBuilder } = require('discord.js');
//this is what allows us to use the "wait" item in line 66, This tells node.js that we want to use timers in our command
const wait = require('node:timers/promises').setTimeout;

//this is what allows the following code to work
module.exports = {
    //this is what tells the "SlashCommandBuilder" what our commands information is, Such as name, description, and options 
    data: new SlashCommandBuilder()
        //this is what sets the commands name
        .setName('lcars')
        //this is what sets the commands description
        .setDescription('Access the LCARS computer system!')
        //this is what allows the user to choose what files they want to access
        .addStringOption(option =>
            //this sets the name of the option
            option.setName('category')
                //this sets the discription for the options
                .setDescription('Select the category that you want to search')
                //this makes it required for the user to choose what they want before they run the command
                .setRequired(true)
                //this is what defines the choices for the user
                .addChoices(
                    //this is the choice for the Science files
                    { name: 'Science', value: 'sci' },
                    //this is the choice for the Engineering files
                    { name: 'Engineering', value: 'eng' },
                    //this is the choice for the Tactical files
                    { name: 'Tactical', value: 'tac' },
                    //this is the choice for the Navigation files
                    { name: 'Navigation', value: 'nav' },
                    //this is the choice for the Navigation files
                    { name: 'Command', value: 'cmd' },
                )),

    //this is what allows the following code to function
    async execute(interaction) {
        //this grabs the options from line 8 to line 18 and allows us to pull what choice the user picked
        const category = interaction.options.getString('category');

        //fileres is the first response that get sent to the user it has no link or any other prompts it just acts as a premsg so that way it simulates a loading time
        let fileres = ''
        //fileacc is the second response that get sent to the user allowing the user to access the proper files they requested
        let fileacc = ''

        //Sci stands for Science linking this variable to line 13 when we define the choice for Science in the command
        if (category === 'sci') {
            fileres = '***SCIENCE COMPUTER FILES***'
            fileacc = '***[SCIENCE COMPUTER FILES](https://github.com/ToastedExistence/ToastedBot/blob/main/lcars-database/science-files/report-223a.md)***'
        }

        //eng stands for Engineering linking this variable to line 14 when we define the choice for Engineering in the command
        if (category === 'eng') {
            fileres = '***ENGINEERING COMPUTER FILES***'
            fileacc = '***[ENGINEERING COMPUTER FILES](https://github.com/ToastedExistence/ToastedBot/blob/main/lcars-database/science-files/report-223a.md)***'
        }
        //tac stands for Tactical linking this variable to line 15 when we define the choice for Tactical in the command
        if (category === 'tac') {
            fileres = '***TACTICAL COMPUTER FILES***'
            fileacc = '***[TACTICAL COMPUTER FILES](https://github.com/ToastedExistence/ToastedBot/blob/main/lcars-database/science-files/report-223a.md)***'
        }
        //nav stands for Navigation linking this variable to line 16 when we diffine the choice for Navigation in the command
        if (category === 'nav') {
            fileres = '***NAVIGATION COMPUTER FILES***'
            fileacc = '***[NAVIGATION COMPUTER FILES](https://github.com/ToastedExistence/ToastedBot/blob/main/lcars-database/science-files/report-223a.md)***'
        }
        //Cmd stands for Commmand linking this variable to line 17 when we diffine the choice for Command in the command
        if (category === 'cmd') {
            fileres = '***COMMAND COMPUTER FILES***'
            fileacc = '***[COMMAND COMPUTER FILES](https://github.com/ToastedExistence/ToastedBot/blob/main/lcars-database/science-files/report-223a.md)***'
        }

        //this is the first message sent, This acts a loading screen for now. "fileres" is defined above in line 23, "ephemeral" means that the message will be sent only to the user who sent the command
        await interaction.reply({ content: `## **LOADING:** ${fileres}`, ephemeral: true });
        //this means that the command waits 2000 milliseconds
        await wait(2000);
        //this is the second message sent, This is what allows the user to access the files that they requested. "fileacc" is deffined above in line 23, "interaction.user.username" grabs the username of the user who sent the command and adds it into the message, "ephemeral" means that the message will be sent only to the user who sent the command
        await interaction.followUp({ content: `**GRANTED ACCESS TO:** ${fileacc} **FOR** ***${interaction.user.username}***`, ephemeral: true });
        //this is a logging command that sends to the console what user accessed the command and what category the accesssed
        console.log(`#COMMAND RUN: ${interaction.user.username} RAN LCARS COMMAND ACCESSING: ${category}`);
    },
};