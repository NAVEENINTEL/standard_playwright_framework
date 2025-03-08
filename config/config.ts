import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

class Config {
  public baseUrl: string;
  public username: string;
  public password: string;

  private static instance: Config;

  private constructor() {
    this.baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
    this.username = process.env.USERNAME || 'standard_user';
    this.password = process.env.PASSWORD || 'secret_sauce';
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config.getInstance();
