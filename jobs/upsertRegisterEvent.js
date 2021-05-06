upsert(
  'Event__c',
  'Name',
  fields(
    field('Name', dataValue('form.event_information.Event_Name')),
    field('Business_Unit__c', dataValue('form.event_information.business_unit')),
    relationship('Site__r','CommCare_Ext_ID__c', dataValue('form.event_information.site')),
    relationship('Venue__r', 'CommCare_Ext_ID__c',dataValue('form.event_information.Venue')),
    field('Country__c', dataValue('form.event_information.site_country')),    
    field('Date__c', dataValue('form.event_information.event_date')),
    field('Event_Type__c', dataValue('form.event_information.event_type')),
    field('Coordinator__c', dataValue('form.event_information.event_coordinator')),
    field('Coaches__c', dataValue('form.event_information.coaches'))
  )
);
