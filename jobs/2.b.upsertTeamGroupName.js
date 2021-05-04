// Upsert event by unique 'Name'
upsert(
  'Event__c',
  'Name',
  fields(
    field(
      'Class_Group_Team__c',
      dataValue('form.question_group.group__team_name')
    ),
    relationship('RecordType', 'Name', 'Intervention'), 
    field(
      'Name',
      dataValue('form.question_group.intervention_name')
    ),
  )
);