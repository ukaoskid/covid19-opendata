import { CsvConverter } from './csv-converter';
import { CsvTransformer } from './csv-transformer';
import { Database } from './database';

const converter = new CsvConverter();
const transformer = new CsvTransformer();
const database = new Database();

console.log(`Process started at ${new Date().toString()}`);

converter.getFiles().then(async (files) => {

  for (const file of files) {

    console.log(`Processing ${file.filename}`);

    const csv = await converter.convertCsv(file);
    const document = await transformer.transform(csv);

    // Database storage.
    try {
      const dbResponse = await database.insert({ docs: document });
      console.log(`${file.filename}: SUCCESS ${JSON.stringify(dbResponse)} at ${new Date().toString()}`);
    } catch (error) {
      console.error(`${file.filename}: ERROR ${JSON.stringify(error)} at ${new Date().toString()}`);
    }
  }

  console.log(`Process terminated at ${new Date().toString()}`);
});