upsert(
  'Person__c',
  'Participant_Identification_Number_PID__c',
  fields(
    field('Notes__c', dataValue('form.intervention_notes_to_save')),
    relationship('RecordType', 'Name', 'Intervention'),
    field('Participant_Identification_Number_PID__c', dataValue('form.case.@case_id')),

    relationship(
      'Attendance__c',
      'First_Name__c',
      dataValue('form.question1.participant_first_name')
    ),
    relationship(
      'Attendance__c',
      'Surname__c',
      dataValue('form.question1.participant_surname')
    ),
    relationship(
      'Attendance__c',
      'Name',
      dataValue('form.question1.participant_full_name')
    ),
    relationship(
      'Attendance__c',
      'Date_of_Birth__c',
      dataValue('form.question1.date_of_birth')
    ),
    relationship(
      'Attendance__c',
      'Age__c',
      dataValue('form.question1.age_in_years')
    ),
    relationship(
      'Attendance__c',
      'Sex_c',
      dataValue('form.question1.gender')
    ),
    relationship(
      'Attendance__c',
      'Mobile_Number_1__c',
      dataValue('form.question1.mobile_number')
    ),
    
    relationship(
      'Attendance__c',
      '"School_name_person__c	"',
      dataValue('form.question1.school_name')
    ),

  )
);
