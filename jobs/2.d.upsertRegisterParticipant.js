query(
  `SELECT Id, Name, CommCare_Ext_ID__c FROM Event__c WHERE CommCare_Case_ID__c = '${state.data.form.case['@case_id']}'`
);

fn(state => {
  // Note: lastReferenceValue selects the first item in the references array.
  state.data.eventName = lastReferenceValue('records[0].CommCare_Ext_ID__c')(state);
  state.data.eventCase = dataValue('form.case.@case_id')(state);

  const characterMap = {
    º: 'o',
    ª: 'a',
    À: 'A',
    Á: 'A',
    Â: 'A',
    Ã: 'A',
    Ä: 'A',
    Å: 'A',
    Ấ: 'A',
    Ắ: 'A',
    Ẳ: 'A',
    Ẵ: 'A',
    Ặ: 'A',
    Æ: 'AE',
    Ầ: 'A',
    Ằ: 'A',
    Ȃ: 'A',
    Ả: 'A',
    Ạ: 'A',
    Ẩ: 'A',
    Ẫ: 'A',
    Ậ: 'A',
    Ç: 'C',
    Ḉ: 'C',
    È: 'E',
    É: 'E',
    Ê: 'E',
    Ë: 'E',
    Ế: 'E',
    Ḗ: 'E',
    Ề: 'E',
    Ḕ: 'E',
    Ḝ: 'E',
    Ȇ: 'E',
    Ẻ: 'E',
    Ẽ: 'E',
    Ẹ: 'E',
    Ể: 'E',
    Ễ: 'E',
    Ệ: 'E',
    Ì: 'I',
    Í: 'I',
    Î: 'I',
    Ï: 'I',
    Ḯ: 'I',
    Ȋ: 'I',
    Ỉ: 'I',
    Ị: 'I',
    Ð: 'D',
    Ñ: 'N',
    Ò: 'O',
    Ó: 'O',
    Ô: 'O',
    Õ: 'O',
    Ö: 'O',
    Ø: 'O',
    Ố: 'O',
    Ṍ: 'O',
    Ṓ: 'O',
    Ȏ: 'O',
    Ỏ: 'O',
    Ọ: 'O',
    Ổ: 'O',
    Ỗ: 'O',
    Ộ: 'O',
    Ờ: 'O',
    Ở: 'O',
    Ỡ: 'O',
    Ớ: 'O',
    Ợ: 'O',
    Ù: 'U',
    Ú: 'U',
    Û: 'U',
    Ü: 'U',
    Ủ: 'U',
    Ụ: 'U',
    Ử: 'U',
    Ữ: 'U',
    Ự: 'U',
    Ý: 'Y',
    à: 'a',
    á: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    ấ: 'a',
    ắ: 'a',
    ẳ: 'a',
    ẵ: 'a',
    ặ: 'a',
    æ: 'ae',
    ầ: 'a',
    ằ: 'a',
    ȃ: 'a',
    ả: 'a',
    ạ: 'a',
    ẩ: 'a',
    ẫ: 'a',
    ậ: 'a',
    ç: 'c',
    ḉ: 'c',
    è: 'e',
    é: 'e',
    ê: 'e',
    ë: 'e',
    ế: 'e',
    ḗ: 'e',
    ề: 'e',
    ḕ: 'e',
    ḝ: 'e',
    ȇ: 'e',
    ẻ: 'e',
    ẽ: 'e',
    ẹ: 'e',
    ể: 'e',
    ễ: 'e',
    ệ: 'e',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    ḯ: 'i',
    ȋ: 'i',
    ỉ: 'i',
    ị: 'i',
    ð: 'd',
    ñ: 'n',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ø: 'o',
    ố: 'o',
    ṍ: 'o',
    ṓ: 'o',
    ȏ: 'o',
    ỏ: 'o',
    ọ: 'o',
    ổ: 'o',
    ỗ: 'o',
    ộ: 'o',
    ờ: 'o',
    ở: 'o',
    ỡ: 'o',
    ớ: 'o',
    ợ: 'o',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'u',
    ủ: 'u',
    ụ: 'u',
    ử: 'u',
    ữ: 'u',
    ự: 'u',
    ý: 'y',
    ÿ: 'y',
    Ā: 'A',
    ā: 'a',
    Ă: 'A',
    ă: 'a',
    Ą: 'A',
    ą: 'a',
    Ć: 'C',
    ć: 'c',
    Ĉ: 'C',
    ĉ: 'c',
    Ċ: 'C',
    ċ: 'c',
    Č: 'C',
    č: 'c',
    C̆: 'C',
    c̆: 'c',
    Ď: 'D',
    ď: 'd',
    Đ: 'D',
    đ: 'd',
    Ē: 'E',
    ē: 'e',
    Ĕ: 'E',
    ĕ: 'e',
    Ė: 'E',
    ė: 'e',
    Ę: 'E',
    ę: 'e',
    Ě: 'E',
    ě: 'e',
    Ĝ: 'G',
    Ǵ: 'G',
    ĝ: 'g',
    ǵ: 'g',
    Ğ: 'G',
    ğ: 'g',
    Ġ: 'G',
    ġ: 'g',
    Ģ: 'G',
    ģ: 'g',
    Ĥ: 'H',
    ĥ: 'h',
    Ħ: 'H',
    ħ: 'h',
    Ḫ: 'H',
    ḫ: 'h',
    Ĩ: 'I',
    ĩ: 'i',
    Ī: 'I',
    ī: 'i',
    Ĭ: 'I',
    ĭ: 'i',
    Į: 'I',
    į: 'i',
    İ: 'I',
    ı: 'i',
    Ĳ: 'IJ',
    ĳ: 'ij',
    Ĵ: 'J',
    ĵ: 'j',
    Ķ: 'K',
    ķ: 'k',
    Ḱ: 'K',
    ḱ: 'k',
    K̆: 'K',
    k̆: 'k',
    Ĺ: 'L',
    ĺ: 'l',
    Ļ: 'L',
    ļ: 'l',
    Ľ: 'L',
    ľ: 'l',
    Ŀ: 'L',
    ŀ: 'l',
    Ł: 'l',
    ł: 'l',
    Ḿ: 'M',
    ḿ: 'm',
    M̆: 'M',
    m̆: 'm',
    Ń: 'N',
    ń: 'n',
    Ņ: 'N',
    ņ: 'n',
    Ň: 'N',
    ň: 'n',
    ŉ: 'n',
    N̆: 'N',
    n̆: 'n',
    Ō: 'O',
    ō: 'o',
    Ŏ: 'O',
    ŏ: 'o',
    Ő: 'O',
    ő: 'o',
    Œ: 'OE',
    œ: 'oe',
    P̆: 'P',
    p̆: 'p',
    Ŕ: 'R',
    ŕ: 'r',
    Ŗ: 'R',
    ŗ: 'r',
    Ř: 'R',
    ř: 'r',
    R̆: 'R',
    r̆: 'r',
    Ȓ: 'R',
    ȓ: 'r',
    Ś: 'S',
    ś: 's',
    Ŝ: 'S',
    ŝ: 's',
    Ş: 'S',
    Ș: 'S',
    ș: 's',
    ş: 's',
    Š: 'S',
    š: 's',
    Ţ: 'T',
    ţ: 't',
    ț: 't',
    Ț: 'T',
    Ť: 'T',
    ť: 't',
    Ŧ: 'T',
    ŧ: 't',
    T̆: 'T',
    t̆: 't',
    Ũ: 'U',
    ũ: 'u',
    Ū: 'U',
    ū: 'u',
    Ŭ: 'U',
    ŭ: 'u',
    Ů: 'U',
    ů: 'u',
    Ű: 'U',
    ű: 'u',
    Ų: 'U',
    ų: 'u',
    Ȗ: 'U',
    ȗ: 'u',
    V̆: 'V',
    v̆: 'v',
    Ŵ: 'W',
    ŵ: 'w',
    Ẃ: 'W',
    ẃ: 'w',
    X̆: 'X',
    x̆: 'x',
    Ŷ: 'Y',
    ŷ: 'y',
    Ÿ: 'Y',
    Y̆: 'Y',
    y̆: 'y',
    Ź: 'Z',
    ź: 'z',
    Ż: 'Z',
    ż: 'z',
    Ž: 'Z',
    ž: 'z',
    ſ: 's',
    ƒ: 'f',
    Ơ: 'O',
    ơ: 'o',
    Ư: 'U',
    ư: 'u',
    Ǎ: 'A',
    ǎ: 'a',
    Ǐ: 'I',
    ǐ: 'i',
    Ǒ: 'O',
    ǒ: 'o',
    Ǔ: 'U',
    ǔ: 'u',
    Ǖ: 'U',
    ǖ: 'u',
    Ǘ: 'U',
    ǘ: 'u',
    Ǚ: 'U',
    ǚ: 'u',
    Ǜ: 'U',
    ǜ: 'u',
    Ứ: 'U',
    ứ: 'u',
    Ṹ: 'U',
    ṹ: 'u',
    Ǻ: 'A',
    ǻ: 'a',
    Ǽ: 'AE',
    ǽ: 'ae',
    Ǿ: 'O',
    ǿ: 'o',
    Þ: 'TH',
    þ: 'th',
    Ṕ: 'P',
    ṕ: 'p',
    Ṥ: 'S',
    ṥ: 's',
    X́: 'X',
    x́: 'x',
    Ѓ: 'Г',
    ѓ: 'г',
    Ќ: 'К',
    ќ: 'к',
    A̋: 'A',
    a̋: 'a',
    E̋: 'E',
    e̋: 'e',
    I̋: 'I',
    i̋: 'i',
    Ǹ: 'N',
    ǹ: 'n',
    Ồ: 'O',
    ồ: 'o',
    Ṑ: 'O',
    ṑ: 'o',
    Ừ: 'U',
    ừ: 'u',
    Ẁ: 'W',
    ẁ: 'w',
    Ỳ: 'Y',
    ỳ: 'y',
    Ȁ: 'A',
    ȁ: 'a',
    Ȅ: 'E',
    ȅ: 'e',
    Ȉ: 'I',
    ȉ: 'i',
    Ȍ: 'O',
    ȍ: 'o',
    Ȑ: 'R',
    ȑ: 'r',
    Ȕ: 'U',
    ȕ: 'u',
    B̌: 'B',
    b̌: 'b',
    Č̣: 'C',
    č̣: 'c',
    Ê̌: 'E',
    ê̌: 'e',
    F̌: 'F',
    f̌: 'f',
    Ǧ: 'G',
    ǧ: 'g',
    Ȟ: 'H',
    ȟ: 'h',
    J̌: 'J',
    ǰ: 'j',
    Ǩ: 'K',
    ǩ: 'k',
    M̌: 'M',
    m̌: 'm',
    P̌: 'P',
    p̌: 'p',
    Q̌: 'Q',
    q̌: 'q',
    Ř̩: 'R',
    ř̩: 'r',
    Ṧ: 'S',
    ṧ: 's',
    V̌: 'V',
    v̌: 'v',
    W̌: 'W',
    w̌: 'w',
    X̌: 'X',
    x̌: 'x',
    Y̌: 'Y',
    y̌: 'y',
    A̧: 'A',
    a̧: 'a',
    B̧: 'B',
    b̧: 'b',
    Ḑ: 'D',
    ḑ: 'd',
    Ȩ: 'E',
    ȩ: 'e',
    Ɛ̧: 'E',
    ɛ̧: 'e',
    Ḩ: 'H',
    ḩ: 'h',
    I̧: 'I',
    i̧: 'i',
    Ɨ̧: 'I',
    ɨ̧: 'i',
    M̧: 'M',
    m̧: 'm',
    O̧: 'O',
    o̧: 'o',
    Q̧: 'Q',
    q̧: 'q',
    U̧: 'U',
    u̧: 'u',
    X̧: 'X',
    x̧: 'x',
    Z̧: 'Z',
    z̧: 'z',
    й: 'и',
    Й: 'И',
    ё: 'е',
    Ё: 'Е',
  };

  const chars = Object.keys(characterMap).join('|');
  const allAccents = new RegExp(chars, 'g');

  function matcher(match) {
    return characterMap[match];
  }

  const replaceAccents = function (string) {
    return string.replace(allAccents, matcher);
  };

  function objectToArray(object) {
    return !Array.isArray(object) ? [object] : object;
  }

  const { form } = state.data;
  if (form.question1) {
    console.log('Ensuring that "question1" is an array.');
    form.question1 = objectToArray(form.question1);
  } else if (!form.new_participants) {
    console.log('Nothing to upsert. No participants were registered');
  } else {
    console.log('Shifting "new_participants" to "question1" array.');
    form.question1 = objectToArray(form.new_participants);
    console.log('Creating a "case" object inside each item in that array.');
    form.question1 = form.question1.map(item => ({
      ...item,
      case: item.create_skillz_plus_participant.case,
    }));
  }

  console.log('Done with initial data manipulation.');
  const persons = merge(
    dataPath('form.question1[*]'),
    fields(field('intervention_notes_to_save', dataValue('form.intervention_notes_to_save')))
  )(state);

  const attendances = merge(
    dataPath('form.question1[*]'),
    fields(
      field('intervention_name', dataValue('form.intervention_name')),
      field('eventCase', dataValue('eventCase')),
      field('eventName', dataValue('eventName'))
    )
  )(state);

  return { ...state, persons, attendances, replaceAccents };
});

each(
  'persons[*]',
  upsert(
    'Person__c',
    'Participant_Identification_Number_PID__c',
    fields(
      field('Notes__c', dataValue('intervention_notes_to_save')),
      field('First_Name__c', dataValue('participant_first_name')),
      field('Surname__c', dataValue('participant_surname')),
      relationship('RecordType', 'Name', 'Participant'),
      relationship('Site__r', 'CommCare_Ext_ID__c', dataValue('grp_location.site_id')),
      field('Participant_Identification_Number_PID__c', state => state.data.case['@case_id']),
      field('Sex__c', dataValue('gender')),
      field('Mobile_Number_1__c', dataValue('mobile_number')), //QUESTION: In CommCare, phone doesn't look like it's saving?
      field('School_name_person__c', dataValue('school_name')),
      field('Date_of_Birth__c', dataValue('date_of_birth')),
      field('School_name_person__c', dataValue('school_name')),
      field('Physical_Address__c', dataValue('participants_home_address'))
      //field('Age__c', dataValue('form.question1.age_in_years')), //This is a SF formula field, cannot map
    )
  )
);

each(
  'attendances[*]',
  upsert(
    'Attendance__c',
    'CommCare_Ext_ID__c',
    fields(
      field('CommCare_Ext_ID__c', state => {
        const eventid = state.replaceAccents(`${state.data.intervention_name}` || `${state.data.eventName}`); //dataValue('intervention_name')(state) || `${state.data.eventName}`;
        const personid = state.data.case['@case_id'];
        const value = personid + '-' + eventid.replace(/\//gi, '');
        return scrubEmojis(value, '');
      }),
      relationship(
        //Attendance looks up to Persn via the case_id
        'Person_Attendance__r',
        'Participant_Identification_Number_PID__c',
        state => state.data.case['@case_id']
      ),
      relationship(
        //Attendance looks up to Event via the Event case_id
        'Event__r',
        'CommCare_Case_ID__c',
        state => `${state.data.eventCase}`
      ),
      // relationship(
      //   //Attendance looks up to Event via the intervention_name
      //   'Event__r',
      //   'CommCare_Ext_ID__c',
      //   state => `${state.data.intervention_name}` || `${state.data.eventName}`
      // ),
      field('Date_of_Birth__c', dataValue('date_of_birth'))
    )
  )
);

//First we insert Person record
// fn(state => {
//   return upsert(
//     'Person__c',
//     'Participant_Identification_Number_PID__c',
//     fields(
//       field('Notes__c', dataValue('form.intervention_notes_to_save')),
//       field('First_Name__c', dataValue('form.question1.participant_first_name')),
//       field('Surname__c', dataValue('form.question1.participant_surname')),
//       relationship('RecordType', 'Name', 'Participant'),
//       field('Participant_Identification_Number_PID__c', state => state.data.case['@case_id']),
//       field('Sex__c', dataValue('form.question1.gender')),
//       //field('Age__c', dataValue('form.question1.age_in_years')), //This is a SF formula field, cannot map
//       field('Mobile_Number_1__c', dataValue('form.question1.mobile_number')),
//       field('School_name_person__c', dataValue('form.question1.school_name'))
//     )
//   )(state);
// });

// fn(state => {
//   //Then we upsert related Attendance records
//   return upsert(
//     'Attendance__c',
//     'CommCare_Ext_ID__c',
//     fields(
//       field('CommCare_Ext_ID__c', state => {
//         var eventid = dataValue('form.intervention_name')(state);
//         var personid = dataValue('form.case.@case_id')(state);
//         return personid + '-' + eventid;
//       }),
//       relationship(
//         //Attendance looks up to Persn via the case_id
//         'Person_Attendance__r',
//         'Participant_Identification_Number_PID__c',
//         dataValue('form.case.@case_id')
//       ),
//       relationship(
//         //Attendance looks up to Event via the intervention_name
//         'Event__r',
//         'Name',
//         dataValue('form.intervention_name')
//       ),
//       field('Date_of_Birth__c', dataValue('form.question1.date_of_birth'))
//     )
//   )(state);
// });
