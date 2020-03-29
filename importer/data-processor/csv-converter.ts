import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { CsvFile } from './models/csv/csv-file.interface';
import { Utils } from './utils';
import { CsvContent } from './models/csv/csv-content.interface';

export class CsvConverter {

  private CSV_FOLDER = '../../csse_covid_19_data/csse_covid_19_daily_reports';

  public async getFiles(): Promise<CsvFile[]> {

    return new Promise((resolve, reject) => {

      const csvPath = path.join(__dirname, this.CSV_FOLDER);
      const csvFileList: CsvFile[] = [];

      fs.readdir(csvPath, (err, files) => {

        // Filtering only csv files.
        files = files.filter((extension) => extension.includes(Utils.CSV_EXT));

        files.forEach(filename => {

          csvFileList.push({
            datetime: Utils.fileNameToDate(filename),
            completePath: `${csvPath}/${filename}`,
            filename,
            path: csvPath
          });
        });

        resolve(csvFileList);
      });
    });
  }

  public convertCsv(file: CsvFile): Promise<CsvContent> {

    return new Promise((resolve, reject) => {

      const content = [];
      fs.createReadStream(file.completePath)
        .pipe(csv({ mapHeaders: ({ header, index }) => header.trim() }))
        .on('data', (data) => content.push(data))
        .on('end', () => {
          resolve({ datetime: file.datetime, content });
        });
    });
  }
}