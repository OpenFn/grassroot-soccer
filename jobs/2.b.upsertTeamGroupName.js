// Upsert event by unique 'Name'
upsert(
  'Event__c',
  'CommCare_Ext_ID__c',
  fields(
    field(
      'Class_Group_Team__c',
      dataValue('form.question_group.group__team_name')
    ),
    relationship('RecordType', 'Name', 'Intervention'), 
    field(
      'CommCare_Ext_ID__c',
      dataValue('form.question_group.intervention_name')
    ),
  )
);