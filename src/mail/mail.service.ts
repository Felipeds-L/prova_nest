import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { User } from 'src/user/user.entity';
const nodemailer = require("nodemailer");

@Injectable()
export class MailService {

  async newUser(username: string, email: string){
    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9665e746ab93cf",
        pass: "6acd26e0dc004d"
      }
    });

    await transport.sendMail({
      from: email,
      to: "mail@teste.mail.com",
      subject: "New Account created!",
      text: `Hello ${username}, you create your account correctly!`,
      html:` <b>Hello ${username}, you create your account correctly!</b>`, 
    });
  }

  async newBet(username, email){
    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9665e746ab93cf",
        pass: "6acd26e0dc004d"
      }
    });

    await transport.sendMail({
      from: email,
      to: "mail@teste.mail.com",
      subject: "New Bet Made!",
      text: `Hello ${username}, you made a new bet correctly!`,
      html:` <b>Hello ${username}, you made a new bet correctly!</b>`, 
    });
  }
}
