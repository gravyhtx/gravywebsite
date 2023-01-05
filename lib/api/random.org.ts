import RandomOrg from 'random-org';

// GET RANDOM INTEGER USING TRUE RANDOM NUMBER GENERATOR (TRNG) FROM
// RANDOM.ORG'S API THAT USES A REAL-WORD ATMOS
// http://random.org/
export const randomApi = (min?: number, max?: number, n?: number) => {

  const key = process.env.RANDOM_ORG_API_KEY;
  
  if(key === undefined) {
    console.warn('There is no API Key for the Random.org number generator. Please enter your API key to use this feature.')
    return undefined;
  }

  min = min ? min : 0;
  max = max ? max : 100;
  n = n ? n : 1;

  var random = new RandomOrg({ apiKey: process.env.RANDOM_ORG_API_KEY });
  random.generateIntegers({ min: 0, max: 100, n: 1 })
    .then(function(result: any) {
      return result.random.data;
    });
}