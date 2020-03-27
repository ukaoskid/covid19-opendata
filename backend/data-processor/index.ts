import { Converter } from './converter';
import { CsvTransformer } from './csv-transformer';
import { CovidDocument } from './models/covid-document.interface';

const converter = new Converter();
const rr = new CsvTransformer();
converter.getFiles().then(async (files) => {

  let container: CovidDocument[] = [];

  for (const file of files) {

    console.log(`Processing ${file.filename}`);

    const csv = await converter.convertCsv(file);
    const document = await rr.transform(csv);

    container = container.concat(document);
    console.log(container);
  }

  console.log(container);
});