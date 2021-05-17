// Push to production
upsert(
  'GRS_Referral_Agg__c',
  'CommCare_Ext_ID__c',
  fields(
    relationship(
      'SiteName__r',
      'CommCare_Ext_ID__c',
      dataValue('form.general_referral_information.event_information.site')
    ),
    field('CommCare_Ext_ID__c', dataValue('form.general_referral_information.event_information.site')),
    //TO DO
    //field('Business_Unit__c', dataValue('form.general_referral_information.event_information.business_unit')),
    relationship(
        //Attendance looks up to Event via the intervention_name
        'Events__r',
        'CommCare_Ext_ID__c',
        dataValue('form.general_referral_information.event_information.event_name')
      ),
    field('Type_of_Referral__c', dataValue('form.general_referral_information.type_of_referral')),
    field(
      'Enter_Partner_s_Name__c',
      dataValue('form.general_referral_information.partner_or_organization_referred_to')
    ),
    field('Males_Referred_HIV_Testing__c', dataValue('form.hivsti_services.males_referred_for_hiv_testing')),
    field('Males_referred_for_STI_Screening__c', dataValue('form.hivsti_services.males_referred_for_sti_screening')),
    field('Males_Referred_for_PEP__c', dataValue('form.hivsti_services.males_referred_for_pep')),
    field('Males_Referred_for_PrEP__c', dataValue('form.hivsti_services.males_referred_for_prep')),
    field('Males_Referred_for_VMMC__c', dataValue('form.hivsti_services.males_referred_for_vmmc')),
    field('Females_Referred_for_HIV_Testing__c', dataValue('form.hivsti_services.females_referred_for_hiv_testing')),
    field(
      'Females_Referred_for_STI_Screening__c',
      dataValue('form.hivsti_services.females_referred_for_sti_screening')
    ),
    field('Date_Referred__c', dataValue('form.general_referral_information.date_referred')),
    field('Females_Referred_for_PEP__c', dataValue('form.hivsti_services.females_referred_for_pep')),
    field('Females_Referred_for_PrEP__c', dataValue('form.hivsti_services.females_referred_for_prep')),
    field('Males_Referred_for_ART__c', dataValue('form.art_services.males_referred_for_art')),
    field('Males_Referred_for_SKILLZ_Club__c', dataValue('form.art_services.males_referred_for_skillz__club')),
    field('Females_Referred_for_ART__c', dataValue('form.art_services.females_referred_for_art')),
    field('Females_Referred_SKILLZ_Club__c', dataValue('form.art_services.females_referred_for_skillz__club')),
    field('Females_Referred_for_PMTCT__c', dataValue('form.art_services.females_referred_for_pmtct')),
    
    field(
      'Males_Referred_for_Psycho_Social_Support__c',
      dataValue('form.psycho_-_social_services.males_referred_for_psycho-social_support')
    ),
    field(
      'Females_Referred_Psycho_Social_Support__c',
      dataValue('form.psycho_-_social_services.females_referred_for_psycho-social_support')
    ),
    field('Males_Referred_for_TB_Screening__c', dataValue('form.tb_services.males_referred_for_tb_screening')),
    field('Females_Referred_for_TB_Screening__c', dataValue('form.tb_services.females_referred_for_rb_screening')),
    field(
      'Number_of_Male_Condoms_distributed__c',
      dataValue('form.condom_distributions.number_of_male_condoms_distributed')
    ),
    field('Number_of_Male_Condoms_Accessed__c', dataValue('form.condom_distributions.number_of_male_condoms_accessed')),
    field(
      'Number_of_Female_Condoms_distributed__c',
      dataValue('form.condom_distributions.number_of_female_condoms_distributed')
    ),
    field(
      'Number_of_Female_Condoms_Accessedx__c',
      dataValue('form.condom_distributions.number_of_female_condoms_accessed')
    ),
    field(
      'Females_Referred_for_Family_Planning__c',
      dataValue('form.other_srhr_services.females_referred_for_family_planning')
    ),
    field(
      'Females_Referred_for_Cervical_Cancer__c',
      dataValue('form.other_srhr_services.females_referred_for_cervical_cancer')
    ),
    field('Females_Referred_for_Antenatal__c', dataValue('form.other_srhr_services.females_referred_for_antenatal')),
    field(
      'Males_Referred_for_Malaria_Testing__c',
      dataValue('form.other_referral_services.males_referred_for_malaria_testing')
    ),
    field('Males_Referred_for_GBV__c', dataValue('form.other_referral_services.males_referred_for_gbv')),
    field(
      'Females_Referred_for_Malaria_Testing__c',
      dataValue('form.other_referral_services.females_referred_for_malaria_testing')
    ),
    field('Females_Referred_for_GBV__c', dataValue('form.other_referral_services.females_referred_for_gbv')),
    field(
      'Females_Referred_for_HPV_Vaccine__c',
      dataValue('form.other_referral_services.females_referred_for_hpv_vaccine')
    )
  )
);