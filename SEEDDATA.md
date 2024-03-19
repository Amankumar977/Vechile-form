## Database Seeding

- **Seed Data Functionality**: We utilize the `seedData` function in the config file to populate our MongoDB database with initial data.
- **Import**: Firstly we import MongoClient from mongodb.
- **URI Component**: It is the mongoDB connnection MONGO_URL.
- **Data Collection**: The function inserts a predefined set of vehicle data into the "vehicles" collection.
- **Database Name**: The data is inserted into the "Rentify" database.
- **seedData function**: it is creating a MongoClient named as `client` withURI. then we are pputting with the help of a inbuilt function in mongoDB which is insertmany and then we are consoling to see if the data is inserted or not.
- **At the end** : We are closing the opened client.
- **Implementation Details**: For more information on how the seeding process works, refer to the [config/seedData.js](config/seedData.js) file.
