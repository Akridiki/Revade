const Discord = require('discord.js-12');

const client = new Discord.Client();

const prefix = 'ri-';

const Captcha = require("@haileybot/captcha-generator");

client.once('ready', () => {
    console.log(client.user.tag + ' is Ready!');
    client.user.setActivity('I am under development! 🔧', {type: "PLAYING"}).catch(console.error)
});
let captcha = new Captcha();
console.log(captcha.value);
 
//developer embed
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#bce249')
	.setTitle('The Revade Developers')
	.setAuthor('Revade', 'https://raw.githubusercontent.com/Akridiki/Revade/main/New%20Project%20(3).png', 'https://discord.js.org')
	.setDescription('These are the developers and all the people who helped/supported this project!')
	.setThumbnail('https://raw.githubusercontent.com/Akridiki/Revade/main/New%20Project%20(6).png')
	.addFields(
		{ name: 'Akridiki', value: 'I am the owner. Yet... I suck at coding.' },
        { name: 'davidlao', value: 'Master coder. Made this project possible.' }
	)
	.setFooter('Revade : A Productionable Studios Bot', 'https://raw.githubusercontent.com/Akridiki/Revade/main/New%20Project%20(3).png');


///

const path = require("path"),
	fs = require("fs")


 
client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

	const command = args.shift().toLowerCase();

/// Developer Embed
if (command === 'developers')
message.channel.send(exampleEmbed);
/// Developer Embed


/// Ping Command
if (command === 'ping')
message.channel.send(`**Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms**`)

    //Verification Command
    if (command === 'verification') {
 
            let captcha = new Captcha();
            message.channel.send(
                "**Enter the text shown in the image below:**",
                new Discord.MessageAttachment(captcha.JPEGStream, "captcha.jpeg")
            );
            let collector = message.channel.createMessageCollector(m => m.author.id === message.author.id);
            collector.on("collect", m => {
                if (m.content.toUpperCase() === captcha.value){ message.channel.send("Verified Successfully!");
                let role = message.guild.roles.cache.find(r => r.name === "Verified");
                message.member.roles.add(role);
                }else{ message.channel.send("Failed Verification!");}
                collector.stop();
    });
    //End Of Verification Command

}
});
        

client.login(process.env.token);