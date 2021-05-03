upsert(
  'Home_Visit__c',
  'id',
  fields(
    field('', dataValue('id')),
    field('Event__c', dataValue('/basic_information/intervention_hidden')),
    field('First_Name__c', dataValue('/basic_information/participant_first_name')),
    field('Surname__c', dataValue('/basic_information/participant_surname')),
    field('Consent_Given__c', dataValue('/basic_information/consent_received')),
    field('Sex_c', dataValue('/basic_information/gender')),
    field('', dataValue('/basic_information/curriculum')),
    field('', dataValue('/basic_information/coach_id')),
    field('', dataValue('/basic_information/coach_name')),
    field('From_Venue__c', dataValue('/basic_information/venue_hidden')),
    field('', dataValue('/basic_information/site_hidden')),
    field('', dataValue('/basic_information/class')),
    field('', dataValue('/basic_information/grade')),
    field('Date_of_Birth__c', dataValue('/basic_information/date_of_birth')),
    field('', dataValue('/basic_information/tested_for_hiv_status')),
    field('', dataValue('/basic_information/prior_home_visit_notes')),
    field('Physical Address Community City', dataValue('/basic_information/participant_address')),
    field('Reason_for_Home_Visit__c', dataValue('/participant_infomation/reason_for_home')),
    field('Visit_Date__c', dataValue('/participant_infomation/visit_information/visit_date')),
    field('Consent_Given__c', dataValue('/participant_infomation/visit_information/consent_given'))
  )
);
