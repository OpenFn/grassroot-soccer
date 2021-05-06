upsert(
  'Home_Visit__c',
  'CommCare_Ext_ID__c',
  fields(
    field('CommCare_Ext_ID__c', dataValue('id')),
    relationship('Event__r', 'CommCare_Ext_ID__c', dataValue('form.basic_information.intervention_hidden')),
    relationship('Person_visiting__r', 'Participant_Identification_Number_PID__c', dataValue('form.case.@case_id')),
    // field('First_Name__c', dataValue('form.basic_information.participant_first_name')),
    // field('Surname__c', dataValue('form.basic_information.participant_surname')),
    field('Consent_Given__c', dataValue('form.basic_information.consent_received')),
    field('Sex__c', dataValue('form.basic_information.gender')),
    field('From_Venue__c', dataValue('form.basic_information.venue_hidden')),
    field('Date_of_Birth__c', dataValue('form.basic_information.date_of_birth')),
    field('Physical Address Community City', dataValue('form.basic_information.participant_address')),
    field('Reason_for_Home_Visit__c', dataValue('form.participant_infomation.reason_for_home_visit')),
    field('Visit_Date__c', dataValue('form.participant_infomation.visit_information.visit_date')),
    field('Consent_Given__c', dataValue('form.participant_infomation.visit_information.consent_given'))
  )
);