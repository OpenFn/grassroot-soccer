// push to production
upsert(
  'Event__c',
  'Name',
  fields(
    field('CommCare_Ext_ID__c', dataValue('form.name_of_skillz_plus_club')),
    relationship('RecordType', 'CommCare_Ext_ID__c', 'Intervention'),
    relationship('Site__r', 'CommCare_Ext_ID__c', dataValue('form.skillz_plus_site')),
    relationship('Venue__r', 'CommCare_Ext_ID__c', dataValue('form.skillz_plus_venue')),
    relationship('Coach_A__r','CommCare_Ext_ID__c', dataValue('form.coaches'))
  )
);
