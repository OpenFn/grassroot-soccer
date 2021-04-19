upsert(
  'Event_C',
  'Name',
  fields(
    field(
      'Class_Group_Team__c',
      dataValue('form.question_group.group__team_name')
    ),
    relationship('RecordType', 'Name', 'Intervention')
  )
);
