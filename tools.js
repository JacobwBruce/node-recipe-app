import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

export const ingredientsFormatter = (meal) => {
  meal.ingredients = [];
  for (let x = 1; x < 21; x++) {
    if (meal[`strIngredient${x}`].length < 1) {
      break;
    }
    meal.ingredients.push(
      `${meal[`strIngredient${x}`]} | ${meal[`strMeasure${x}`]}`
    );
  }
  return meal;
};

export const recipeEmailFormatter = (recipeNames, ingredients) => {
  let output = 'Node.js Recipe App Ingredients List\n\n';
  if (typeof ingredients == 'string') {
    output += `${recipeNames}\n----------------------\n${ingredients.replace(
      /,/g,
      '\n'
    )}\n\n`;
  } else {
    for (let i = 0; i < recipeNames.length; i++) {
      output += `${recipeNames[i]}\n----------------------\n${ingredients[
        i
      ].replace(/,/g, '\n')}\n\n`;
    }
  }
  return output;
};

export const sendEmail = (email, subject, message) => {
  dotenv.config();
  let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: 'pythonwebrecipes@gmail.com',
      pass: 'Nibster3',
    },
  });

  let options = {
    from: 'pythonwebrecipes@gmail.com', // Sender address
    to: email, // List of recipients
    subject: subject, // Subject line
    text: message, // Plain text body
  };
  transport.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
