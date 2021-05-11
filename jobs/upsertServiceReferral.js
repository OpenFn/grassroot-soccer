// push to production
upsert(
  'NewReferral__c',
  'CommCare_Ext_ID__c',
  fields(
    field('Enter_Partner_s_Name__c', dataValue('form.general_referral_information.partner_or_organization_referred_to')),
    field('Type_of_Referral__c', dataValue('form.general_referral_information.type_of_referral')),
    field('Participants_Full_Name__c', dataValue('form.client_registration.participant_full_name')),
    field('Institution_Referred_To_3__c', dataValue('form.client_registration.participants_age_to_save')),
    field('Institution_Referred_To_3_Contact_Number__c', dataValue('form.client_registration.gender')),
    field('Parent_Guardian_Contact_Number__c', dataValue('form.client_registration.mobile_number')),
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
    field(
      'HIV_Testing_Services_GRS_Staff__c',
      dataValue('form.referral_services.hiv_support__care.check_the_services_that_client_was_referred_to')
    ),
    field(
      'HIV_STI_PREVENTION_Other_GRS_Staff__c',
      dataValue('form.referral_services.hiv_support__care.check_the_services_that_client_was_referred_to')
    ),
    field(
      'TB_Screening_GRS_Staff__c',
      dataValue('form.referral_services.hiv_support__care.check_the_services_that_client_was_referred_to')
    ),
    field(
      'Post_Exposure_Prophylaxis_GRS_Staff__c',
      dataValue('form.referral_services.hiv_support__care.check_the_services_that_client_was_referred_to')
    ),
    field(
      'PrEP_GRS_Staff__c',
      dataValue('form.referral_services.hiv_support__care.check_the_services_that_client_was_referred_to')
    ),
    field(
      'HIV_Other__c',
      dataValue('form.referral_services.hiv_support__care.check_the_services_that_client_was_referred_to')
    ),
    field(
      'ART_Initiation_GRS_Staff__c',
      dataValue('form.referral_services.art_support_services.check_the_services_that_client_was_referred_to')
    ),
    field(
      'PMTCT_GRS_Staff__c',
      dataValue('form.referral_services.art_support_services.check_the_services_that_client_was_referred_to')
    ),
    field(
      'SKILLZ_Plus_Club_Support_GRS_Staff__c',
      dataValue('form.referral_services.art_support_services.skillz_plus_club_option')
    ),
    field(
      'Sexual_and_GBV_Abuse_GRS_Staff__c',
      dataValue(
        'form.referral_services.child_protection_support_services.check_the_services_that_client_was_referred_to'
      )
    ),
    field(
      'Victim_Friendly_Services_GRS_Staff__c',
      dataValue('form.referral_services.child_protection_support_services.abuse_reported_to')
    ),
    field(
      'Legal_Services_Other_GRS_Staff__c',
      dataValue('form.referral_services.child_protection_support_services.type_of_post_violence_care')
    ),
    field('Legal_Services_Other_GRS_Staff__c', dataValue('form.referral_services.legal_services.legal_services')),
    field(
      'STI_Screen_Testing_GRS_Staff__c',
      dataValue('form.referral_services.other_srhr_services.check_the_services_that_client_was_referred_to')
    ),
    field(
      'Contraception_Family_Plan_GRS_Staff__c',
      dataValue('form.referral_services.other_srhr_services.check_the_services_that_client_was_referred_to')
    ),
    field(
      'Cervical_Cancer_Screening_GRS_Staff__c',
      dataValue('form.referral_services.other_srhr_services.check_the_services_that_client_was_referred_to')
    ),
    field(
      'HPV_vaccine_GRS_Staff__c',
      dataValue('form.referral_services.other_srhr_services.check_the_services_that_client_was_referred_to')
    ),
    field(
      'Antenatal_Care_ANC_GRS_Staff__c',
      dataValue('form.referral_services.other_srhr_services.check_the_services_that_client_was_referred_to')
    ),
    field(
      'Sexual_and_GBV_Abuse_GRS_Staff__c',
      dataValue('form.referral_services.other_srhr_services.check_the_services_that_client_was_referred_to')
    ),
    field(
      'Psycho_Social_Services_Other_GRS_Staff__c',
      dataValue('form.referral_services.other_srhr_services.check_the_services_that_client_was_referred_to')
    ),
    field('Date_Referred__c', dataValue('form.follow-up.date_referred')),
    field('Expected_Visit_Date__c', dataValue('form.follow-up.expected_visit_date'))
  )
);
