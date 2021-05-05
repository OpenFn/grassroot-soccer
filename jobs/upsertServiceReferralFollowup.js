alterState(state => {
  state.data.external_commcare_id = (
    dataValue('form.hidden_properties.intervention_name')(state) +
    dataValue('form.hidden_properties.participant_first_name')(state) +
    dataValue('form.hidden_properties.participant_surname')(state)
  )
    .toString()
    .toLowerCase()
    .replace(/\s/g, '')
    .trim();

  return state;
});

upsert(
  'NewReferral__c',
  'CommCare_Ext_ID__c',
  fields(
    field('CommCare_Ext_ID__c', dataValue('external_commcare_id')),
    field(
      'TB_Screening_GRS_Staff__c',
      dataValue('form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option2')
    ),
    field(
      'TB_Services_Other_GRS_Staff__c',
      dataValue('form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option2')
    ),
    field(
      'VMMC_GRS_Staff__c',
      dataValue('form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option3')
    ),
    field(
      'Post_Exposure_Prophylaxis_GRS_Staff__c',
      dataValue('form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option4')
    ),
    field(
      'PrEP_GRS_Staff__c',
      dataValue('form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option5')
    ),
    field(
      'HIV_Other__c',
      dataValue('form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option6')
    ),
    field(
      'ART_Initiation_GRS_Staff__c',
      dataValue('form.referral_services.service_type.art_support_services.art_services_group.art_services_option1')
    ),
    field(
      'PMTCT_GRS_Staff__c',
      dataValue('form.referral_services.service_type.art_support_services.art_services_group.art_services_option3')
    ),
    field(
      'Legal_Services_Other_GRS_Staff__c',
      dataValue(
        'form.referral_services.service_type.other_legal_services.confirmation_of_services_provided_label.legal_services_option3'
      )
    ),
    field(
      'STI_Screen_Testing_GRS_Staff__c',
      dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option1')
    ),
    field(
      'STI_Treatment_GRS_Staff__c',
      dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option1')
    ),
    field(
      'Contraception_Family_Plan_GRS_Staff__c',
      dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option2')
    ),
    field(
      'Cervical_Cancer_Screening_GRS_Staff__c',
      dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option3')
    ),
    field(
      'HPV_vaccine_GRS_Staff__c',
      dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option4')
    ),
    field(
      'Antenatal_Care_ANC_GRS_Staff__c',
      dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option5')
    ),
    field(
      'Sexual_and_GBV_Abuse_GRS_Staff__c',
      dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option6')
    )
  )
);
