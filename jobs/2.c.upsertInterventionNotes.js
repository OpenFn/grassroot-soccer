upsert(
  'Event_C',
  'Name',
  fields(
    field('Notes__c', dataValue('form.intervention_notes_to_save')),
    relationship('RecordType', 'Name', 'Intervention')
  )
);
