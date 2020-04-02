# COVID-19 Open API

The COVID-19 (COronaVIrus Disease 2019) is an infectious disease caused by severe acute respiratory syndrome coronavirus (SARS-CoV-2).
This disease has been first identified in China (Wuhan, Hubei province) at the end of 2019 and declared as a pandemic on March 11th, 2020.

## Datasource

Data is taken from the **Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE)** [GitHub](https://github.com/CSSEGISandData/COVID-19).
Their datasources are:

- World Health Organization (WHO): [https://www.who.int/](https://www.who.int/)
- DXY.cn. Pneumonia. 2020. [http://3g.dxy.cn/newh5/view/pneumonia](http://3g.dxy.cn/newh5/view/pneumonia)
- BNO News: [https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/](https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/)
- National Health Commission of the People’s Republic of China (NHC): [http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml](http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml)
- China CDC (CCDC): [http://weekly.chinacdc.cn/news/TrackingtheEpidemic.htm](http://weekly.chinacdc.cn/news/TrackingtheEpidemic.htm)
- Hong Kong Department of Health: [https://www.chp.gov.hk/en/features/102465.html](https://www.chp.gov.hk/en/features/102465.html)
- Macau Government: [https://www.ssm.gov.mo/portal/](https://www.ssm.gov.mo/portal/)
- Taiwan CDC: [https://sites.google.com/cdc.gov.tw/2019ncov/taiwan?authuser=0](https://sites.google.com/cdc.gov.tw/2019ncov/taiwan?authuser=0)
- US CDC: [https://www.cdc.gov/coronavirus/2019-ncov/index.html](https://www.cdc.gov/coronavirus/2019-ncov/index.html)
- Government of Canada: [https://www.canada.ca/en/public-health/services/diseases/coronavirus.html](https://www.canada.ca/en/public-health/services/diseases/coronavirus.html)
- Australia Government Department of Health: [https://www.health.gov.au/news/coronavirus-update-at-a-glance](https://www.health.gov.au/news/coronavirus-update-at-a-glance)
- European Centre for Disease Prevention and Control (ECDC): [https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases](https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases)
- Ministry of Health Singapore (MOH): [https://www.moh.gov.sg/covid-19](https://www.moh.gov.sg/covid-19)
- Italy Ministry of Health: [http://www.salute.gov.it/nuovocoronavirus](http://www.salute.gov.it/nuovocoronavirus)
- 1Point3Arces: [https://coronavirus.1point3acres.com/en](https://coronavirus.1point3acres.com/en)
- WorldoMeters: [https://www.worldometers.info/coronavirus/](https://www.worldometers.info/coronavirus/)

## API structure

COVID-19 Open API is a structure that makes COVID-19 data availability as a service.

- Backend: [http://api.covid19-opendata.online:30000/](http://api.covid19-opendata.online:30000/)
- Frontend: [http://www.covid19-opendata.online/](http://www.covid19-opendata.online/)
- Swagger UI: [http://api.covid19-opendata.online:30000/api](http://api.covid19-opendata.online:30000/api)

## Examples

### Hello world
`curl --location --request GET 'http://api.covid19-opendata.online:30000/config'`

### Config
`curl --location --request GET 'http://api.covid19-opendata.online:30000/config'`

### Find

```
curl --location --request POST 'http://api.covid19-opendata.online:30000/data/find' \
--header 'Content-Type: application/json' \
--data-raw '{
 "selector": {
  "country": "Italy"
 }
}'
```

## Roadmap

I am looking for **contributors** in order to improve this system!

- [ ] Geocoder performance improvements (actually on-going)
- [ ] Aggregation API (a service which will allow to aggregate by a defined schema of properties).
- [ ] Improve example charts on the frontend.
