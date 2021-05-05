upsert(
  'Event__c',
  'Name',
  fields(
    field('Name', dataValue('form.name_of_skillz_plus_club')),
    //  relationship('RecordType', 'Name', 'Intervention'),
    field('Site__c.CommCare_Ext_ID__c', dataValue('form.skillz_plus_site')),
    field('Venue__c.CommCare_Ext_ID__c', dataValue('form.skillz_plus_venue')),
    field('Coach_A__c.CommCare_Ext_ID__c', dataValue('form.coaches'))
  )
);
