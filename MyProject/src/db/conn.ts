import { AppDataSource } from '../data-source';

export async function conn() {
  try {
    await AppDataSource.initialize();
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);    
  };
};