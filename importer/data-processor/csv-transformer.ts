import { CsvContent } from './models/csv/csv-content.interface';
import { RULES } from './models/rules/rules';
import { Rule } from './models/rules/rules.interface';
import { CovidDocument } from './models/covid/covid-document.interface';
import { TYPES } from './models/types';
import { Utils } from './utils';
import { ReplaceRule } from './models/rules/replace-rule.interface';
import { Geocode } from './models/geocode/geocode.inteface';

export class CsvTransformer {

  async transform(file: CsvContent): Promise<CovidDocument[]> {

    const covidDocuments: CovidDocument[] = [];

    let takenRule: Rule = this.getValidRule(file.datetime);
    if (takenRule) {

      for (const row of file.content) {

        let covidDocument: any = {};
        Object.keys(takenRule.columns).forEach((property) => {

          const value = row[takenRule.columns[property].header];
          const replaceRules = takenRule.columns[property].replace;
          const replacedValue = replaceRules ? this.replaceValue(value, replaceRules) : value;

          covidDocument[property] = this.convertPropertyToType(replacedValue, takenRule.columns[property].type)
        });

        covidDocuments.push(covidDocument);
      }
    }

    return covidDocuments;
  }

  private async geocodeCheck(value: CovidDocument) {

    value.latitude = 0;
    value.longitude = 0;

    if (!value.latitude || !value.longitude) {

      const geocode: Geocode = {
        city: value.admin2 ? value.admin2 : undefined,
        provinceState: value.provinceState,
        country: value.country,
        zipCode: value.fips ? value.fips : undefined,
      };

      try {

        const payload = await Utils.geocode(geocode);

        if (payload && payload.length === 1) {
          value.latitude = payload[0].lat;
          value.longitude = payload[0].lon;
        }
      } catch (error) {
        console.log(error);
      }
    }

    return value;
  }

  private replaceValue(value: string, replaceRules: ReplaceRule[]) {

    replaceRules.forEach((rule) => {
      value = value.replace(rule.what, rule.str)
    });

    return value;
  }

  private getValidRule(fileDatetime: number): Rule {

    let validRule: Rule;
    for (const rule in RULES) {

      validRule = RULES[rule];
      if (fileDatetime <= validRule.validUntil) {
        break;
      }
    }

    // Taking the last valid rule.
    if (!validRule) {
      validRule = RULES[RULES.length - 1];
    }

    return validRule;
  }

  private convertPropertyToType(value: any, type: string) {

    switch (type) {

      case TYPES.STRING:{
        return value.toString();
      }

      case TYPES.NUMBER: {
        const num = Number(value);
        return !isNaN(num) ? num : undefined;
      }

      case TYPES.GEO: {
        const num = Number(value);
        return !isNaN(num) ? num : 0;
      }

      case TYPES.DATETIME: {
        return Utils.toUTC(value);
      }
    }
  }
}