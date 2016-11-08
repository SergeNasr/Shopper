This is a Shopper application app created using NodeJS (Express app) and ReactJS.

**How To Run**
- First, make sure you have postgres running on your localhost, on port 5432. Run `node models/database.js` to create the app's table.

- Second, run `npm run build`. This will compile all the front end dependencies.

- Finally, run `npm start` and head over to `localhost:3000` to check the app!

**Notes**

I decided to work more on the front end for this app since I love React!
However, i did a minimalistic version of Part 2. Just go to `localhost:3000/funnels.json` to see the json response.

**Possible Improvements**
- Use a common store to store the full state of the app, like Redux

- Configure tables to make part 2 simple to implement

- Adding functional (using nightwatch) and unit tests (since it's supposed to be prod level code)

Enjoy it!