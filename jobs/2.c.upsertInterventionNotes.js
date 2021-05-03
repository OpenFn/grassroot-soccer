//openfn.org source 
upsert(
  'Event__c',
  'Name',
  fields(
    field('Name', dataValue('form.intervention_name')),//TODO: Aicha to update intervention_name path
    field('Notes__c', dataValue('form.intervention_notes_to_save')),
    relationship('RecordType', 'Name', 'Intervention')
  )
);