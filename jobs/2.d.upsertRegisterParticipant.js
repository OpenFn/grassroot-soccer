alterState(state => {
  function objectToArray(object) {
    return !Array.isArray(object) ? [object] : object;
  }

  state.data.form.question1 = objectToArray(state.data.form.question1);

  return state;
});

beta.each(
  merge(
    dataPath('form.question1[*]'),
    fields(field('intervention_notes_to_save', dataValue('form.intervention_notes_to_save')))
  ),

  upsert(
    'Person__c',
    'Participant_Identification_Number_PID__c',
    fields(
      field('Notes__c', dataValue('intervention_notes_to_save')),
      field('First_Name__c', dataValue('participant_first_name')),
      field('Surname__c', dataValue('participant_surname')),
      relationship('RecordType', 'Name', 'Participant'),
      field('Participant_Identification_Number_PID__c', state => state.data.case['@case_id']),
      field('Sex__c', dataValue('gender')),
      field('Mobile_Number_1__c', dataValue('mobile_number')), //QUESTION: In CommCare, phone doesn't look like it's saving? 
      field('School_name_person__c', dataValue('school_name')),
      field('Date_of_Birth__c', dataValue('date_of_birth')),
      field('School_name_person__c', dataValue('school_name')),
      field('Physical_Address__c', dataValue('participants_home_address')),
      //field('Age__c', dataValue('form.question1.age_in_years')), //This is a SF formula field, cannot map
    )
  )
);

each(
  merge(dataPath('form.question1[*]'), fields(field('intervention_name', dataValue('form.intervention_name')))),
  upsert(
    'Attendance__c',
    'CommCare_Ext_ID__c',
    fields(
      field('CommCare_Ext_ID__c', state => {
        var eventid = dataValue('intervention_name')(state);
        var personid = state.data.case['@case_id'];
        return personid + '-' + eventid;
      }),
      relationship(
        //Attendance looks up to Persn via the case_id
        'Person_Attendance__r',
        'Participant_Identification_Number_PID__c',
        state => state.data.case['@case_id']
      ),
      relationship(
        //Attendance looks up to Event via the intervention_name
        'Event__r',
        'CommCare_Ext_ID__c',
        dataValue('intervention_name')
      ),
      field('Date_of_Birth__c', dataValue('date_of_birth'))
    )
  )
);

//First we insert Person record
// alterState(state => {
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

// alterState(state => {
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
