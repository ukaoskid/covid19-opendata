/*
 * Export and Import a database on CouchDB.
 */

const http = require('http');

const from = {
  hostname: 'localhost',
  port: 5984,
  db: '/covid19-opendata',
  auth: 'Basic YWRtaW46cGFzc3dvcmQ='
};
const to = {
  hostname: 'localhost',
  port: 5984,
  db: '/testdb',
  auth: 'Basic YWRtaW46cGFzc3dvcmQ='
};

/*
 * Retrieving the documents from the source db.
 */
const exportDatabase = () => {

  const optsAllDocs = {
    hostname: from.hostname,
    port: from.port,
    path: `${from.db}/_all_docs?include_docs=true`,
    headers: {
      Authorization: from.auth
    }
  };

  return new Promise((resolve, reject) => {

    http.get(optsAllDocs, (response) => {

      let result = '';
      response.on('data', (chunk) => {
        result += chunk;
      });

      response.on('end', () => {
        resolve({ payload: prepareForImport(result) });
      });

      response.on('error', (error) => {
        reject({ error });
      });
    });
  });
};

/*
 * Preparing and cleaning the documents.
 */
const prepareForImport = (payload) => {

  const data = [];
  let sourceDb = JSON.parse(payload);
  let docs = sourceDb.rows;

  docs.forEach((doc) => {

    // Cleaning the revision field.
    delete doc.doc._rev;
    data.push(doc);
  });

  return {
    docs: data
  };
};

/*
 * Writing the documents in the destination db.
 */
const importDatabase = (payload) => {

  const data = JSON.stringify(payload);
  const optsBulkDocs = {
    hostname: to.hostname,
    port: to.port,
    path: `${to.db}/_bulk_docs`,
    method: 'POST',
    headers: {
      Authorization: to.auth,
      'Content-type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  return new Promise((resolve, reject) => {

    let response = '';
    const request = http.request(optsBulkDocs, (res) => {
      response = res.statusCode;
      resolve({ response });
    });

    request.on('error', (error) => {
      reject({ response, error });
    });

    request.write(data);
    request.end();
  });
};

// Main.
console.log('Processing data...');
exportDatabase().then((exportedDb) => {

  if (exportedDb.payload) {

    console.log('Data exported');
    console.log('Importing data...');
    importDatabase(exportedDb.payload).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    })
  } else {
    console.error(`Unknown error while getting data from ${from.hostname}`);
  }
}).catch((error) => {
  console.error(error);
});