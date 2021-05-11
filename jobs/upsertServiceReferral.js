// push to production
upsert(
  'NewReferral__c',
  'CommCare_Ext_ID__c',
  fields(
    field('Enter_Partner_s_Name__c', dataValue('form.general_referral_information.partner_or_organization_referred_to')),
    field('Type_of_Referral__c', dataValue('form.general_referral_information.type_of_referral')),
    field('Participants_Full_Name__c', dataValue('form.client_registration.participant_full_name')),
    //field('Institution_Referred_To_3__c', dataValue('form.client_registration.participants_age_to_save')),
    field('Institution_Referred_To_3_Contact_Number__c', dataValue('form.client_registration.gender')),
    //field('Parent_Guardian_Contact_Number__c', dataValue('form.client_registration.mobile_number')),
    field('CommCare_Ext_ID__c', dataValue('id')),
    //field('Venue__c', dataValue('form.client_registration.school_name')),
    //field('Grade__c', dataValue('form.client_registration.grade')),
    //field('Class__c', dataValue('form.client_registration.class')),
    field('Parent_Guardian_Full_Name__c', dataValue('form.parent__guardian_information.parent__guardian_full_name')),
    field('Relationship__c', dataValue('form.parent__guardian_information.relationship_to_client')),
    field('Parent_Guardian_Contact_Number__c', dataValue('form.parent__guardian_information.contact_number')),
    field('Institution_Referred_To_1__c', dataValue('form.referral_information.institution_referred_to')),
    field('Institution_Referred_To_2__c', dataValue('form.referral_information.copy-1-of-institution_referred_to')),
    field('Institution_Referred_To_3__c', dataValue('form.referral_information.copy-2-of-institution_referred_to')),
    
  )
);