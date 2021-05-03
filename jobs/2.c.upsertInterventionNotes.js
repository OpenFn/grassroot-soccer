//openfn.org source 
upsert(
  'Event__c',
  'Name',
  fields(
    field('Name', dataValue('form.intervention_name')),
    field('Notes__c', dataValue('form.intervention_notes_to_save')),
    relationship('RecordType', 'Name', 'Intervention')
  )
);