const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex(tables.department).delete();

    await knex(tables.department).insert([
        {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff01',
            name : 'Algemene heelkunde',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent',
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff02',
            name : 'Anatomo-pathologie',
            location : 'straat 39',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff03',
            name : 'Anesthesie en reanimatie',
            location : '/',
            hospital : 'AZ Sint-Lucas Gent',
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff04',
            name : 'Medisch centrum',
            location : 'Lostraat 28',
            hospital : 'Medisch Centrum Aalter'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff05',
            name : 'Cardiale revalidatie',
            location : 'straat 28',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff06',
            name : 'Rugrevalidatie, nek- en schouderunit',
            location : 'straat 28',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff07',
            name : 'Diabetesvoetkliniek',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff08',
            name : 'Endocrinologie',
            location : 'straat 55',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff09',
            name : 'Fysische geneeskunde',
            location : 'straat 29',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff10',
            name : 'Geriatrie',
            location : 'straat 80',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff11',
            name : 'Gynaecologie en verloskunde',
            location : 'straat 1',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff12',
            name : 'Hart- en vaatziekten',
            location : 'straat 25',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff13',
            name : 'Hartrevalidatie',
            location : 'straat 28',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff14',
            name : 'Huidziekten',
            location : 'straat 53',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff15',
            name : 'Infectieziekten',
            location : 'straat 53',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff16',
            name : 'Kinderziekten',
            location :'straat 61',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff17',
            name : 'Laboratorium',
            location : 'straat 38',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff18',
            name :'Medisch centrum',
            location : 'Slagmanstraat 1a',
            hospital : 'Medisch centrum Lochristi'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff19',
            name : 'Longziekten',
            location : 'straat 53',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff20',
            name : 'Maag-, darm-, en leverziekten',
            location : 'straat 98',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff21',
            name : 'Medische beeldvorming',
            location : 'straat 21',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff22',
            name : 'Medische genetica',
            location : 'straat 51',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff23',
            name : 'Mond-, kaak- en aangezichtschirurgie (stomatologie)',
            location : 'straat 66',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff24',
            name : 'Neurochirurgie',
            location : 'straat 58',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff25',
            name : 'Neurologie',
            location : 'straat 58',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff26',
            name : 'Neus-, keel- en oogziekten',
            location : 'straat 55',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff27',
            name : 'Nierziekten',
            location : 'straat 69',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff28',
            name : 'Nucleaire geneeskunde',
            location : 'straat 19',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff29',
            name : 'Oogheelkunde',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent'    
          },
          {
            id :  '7f28c5f9-d711-4cd6-ac15-d13d71abff30',
            name : 'Orthopedie',
            location : 'straat 23 en 24',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff31',
            name : 'Diëtiek',
            location : 'straat 28',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff32',
            name : 'Hand- en polsrevalidatie',
            location : 'straat 25',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff33',
            name : 'Rug- en nekrevalidatie',
            location : 'straat 28',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff34',
            name : 'Ambulante kinesitherapie',
            location : 'straat 25',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff35',
            name : 'Pedicure - voetverzorging',
            location : 'straat 55',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff36',
            name : 'Podologie',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff37',
            name : 'Sofrologie',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff38',
            name : 'Stemscreening',
            location : 'straat 55',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff39',
            name : 'Pijnkliniek',
            location : 'straat 79',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff40',
            name : 'Plastische heelkunde',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff41',
            name : 'Prenatale diagnostiek',
            location : 'straat 1',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff42',
            name : 'Psychiatrie',
            location : 'straat 58',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff43',
            name : 'Radiotherapie, oncologie en hematologie',
            location : 'straat 51',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff44',
            name : 'Reiskliniek',
            location : 'straat 53',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff45',
            name : 'Reumatologie',
            location : 'straat 97',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff46',
            name : 'Slaappathologie',
            location : 'straat 53',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff47',
            name : 'Spoedgevallendienst',
            location : 'straat 32',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff48',
            name : 'Tandheelkunde',
            location : 'straat 23',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff49',
            name : 'Thorax- en vaatheelkunde',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff50',
            name : 'Urologie',
            location : 'straat 41',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff51',
            name : 'Vruchtbaarheidscentrum',
            location : 'straat 1',
            hospital : 'AZ Sint-Lucas Gent'
          },
          {
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff52',
            name : 'Medisch centrum',
            location : 'Bloemenboslaan 26',
            hospital : 'Medisch centrum Zelzate'
          },
    ]);
  },
};