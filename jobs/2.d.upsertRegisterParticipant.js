//First we insert Person record
alterState(state => {
  return upsert(
    'Person__c',
    'Participant_Identification_Number_PID__c',
    fields(
      field('Notes__c', dataValue('form.intervention_notes_to_save')),
      relationship('RecordType', 'Name', 'Participant'),
      field('Participant_Identification_Number_PID__c', dataValue('form.case.@case_id'))
    )
  )(state).then(state => {
    //Then we upsert related Attendance records
    return upsert(
      'Attendance__c',
      'CommCare_Ext_ID__c',
      fields(
        field('CommCare_Ext_ID__c', state => {
          var eventid = dataValue('form.intervention_name')(state);
          var personid = dataValue('form.case.@case_id')(state);
          return personid + '-' + eventid;
        }),
        relationship(
          //Attendance looks up to Persn via the case_id
          'Person__c',
          'Participant_Identification_Number_PID__c',
          dataValue('form.case.@case_id')
        ),
        relationship(
          //Attendance looks up to Event via the intervention_name
          'Event__c',
          'Name',
          dataValue('form.intervention_name')
        ),
        field('Date_of_Birth__c', dataValue('form.question1.date_of_birth')),
        field('Sex_c', dataValue('form.question1.gender')),
        field('Age__c', dataValue('form.question1.age_in_years')),
        field('Mobile_Number_1__c', dataValue('form.question1.mobile_number')),
        field('School_name_person__c', dataValue('form.question1.school_name'))
      )
    )(state);
  });
});
