import { CsvConverter } from './csv-converter';
import { CsvTransformer } from './csv-transformer';
import { Database } from './database';
import { Utils } from './utils';

const converter = new CsvConverter();
const transformer = new CsvTransformer();
const database = new Database(process.env.DB_NAME);
const databaseConfig = new Database(process.env.DB_NAME_CONFIG);

console.log(`Process started at ${new Date().toString()}`);

converter.getFiles().then(async (files) => {

  const dbPreparation: any = await database.prepareDb();
  if (!dbPreparation.ok) {

    console.log(dbPreparation);
    process.exit(1);
  }

  console.log(`DB preparation SUCCESS at ${new Date().toString()}`);

  for (const file of files) {

    console.log(`Processing ${file.filename}`);

    const csv = await converter.convertCsv(file);
    const document = await transformer.transform(csv);

    // Database storage.
    try {
      const dbResponse = await database.insert({ docs: document });
      console.log(`${file.filename}: SUCCESS ${JSON.stringify(dbResponse.response)} at ${new Date().toString()}`);
    } catch (error) {
      console.error(`${file.filename}: ERROR ${JSON.stringify(error)} at ${new Date().toString()}`);
    }
  }

  const config = await databaseConfig.getByDocument('config');
  await databaseConfig.insert({ docs: [Utils.prepareConfigUpdate(config.payload)] });

  console.log(`Process terminated at ${new Date().toString()}`);
});