import { Account, Client } from "react-native-appwrite";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!);

console.log(client);

const account = new Account(client);

export default account;

