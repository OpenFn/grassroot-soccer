//openfn.org source 
upsert(
  'Event__c',
  'CommCare_Case_ID__c',
  fields(
    field('CommCare_Case_ID__c', dataValue('form.case.@case_id')),
    //field('Name', dataValue('form.intervention_name')),
    field('Notes__c', dataValue('form.intervention_notes_to_save')),
    relationship('RecordType', 'Name', 'Intervention')
  )
);