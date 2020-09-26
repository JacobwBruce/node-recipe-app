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
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: 'pythonwebrecipes@gmail.com',
      clientId: '592759427315-ciki7vsqmglihi9iag8b2lonuljv25d1.apps.googleusercontent.com',
      clientSecret: '5BVXgzVI2qLygJbudvAPaZ6X',
      refreshToken: '1//04ULeQc6OPXBDCgYIARAAGAQSNwF-L9IrHVHX8RF0J07CY7NGU4HztTI-Oplf5T8JZyn4IMEhmNmg7i9Muv-EPnmizp-41DCYex4',
      accessToken: 'ya29.a0AfH6SMCk-ZdHqlo387se9cclL3JmzCvuN9UMrRjFmX63YdcH7FRxQhmEO142OaO3Em4nmiqvEoWDKYsEIid7P9Hf8SkRKaX7rqaG7INuqbMrdGgYs2z32t5l48LnzrbLMVvauk4AwNkKlLd2H5NrBjwfIzDwxY4EhTM'
    }
  });

  let options = {
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
