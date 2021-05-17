// push to production
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
    field('Business_Unit_Site__c', state => {
      const bu = dataValue('form.business_unit')(state);
      return bu === 'X' ? 'GRS Zambia' : bu;
    }),
    field('CommCare_Ext_ID__c', dataValue('external_commcare_id')),
    field('TB_Screening_Service_Provider__c', state =>
      Boolean(
        dataValue(
          'form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option2'
        )(state)
      )
    ),
    field('VMMC_Service_Provider__c', state =>
      Boolean(
        dataValue(
          'form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option3'
        )(state)
      )
    ),
    field('Post_Exposure_Prophylaxis_Service_Provid__c', state =>
      Boolean(
        dataValue(
          'form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option4'
        )(state)
      )
    ),
    field('PrEP_Service_Provider__c', state =>
      Boolean(
        dataValue(
          'form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option5'
        )(state)
      )
    ),
    field('HIV_STI_PREVENTION_Other_Service_Provid__c', state =>
      Boolean(
        dataValue(
          'form.referral_services.service_type.hiv_support__care.check_services_label.hiv_support_care_option6'
        )(state)
      )
    ),
    field('ART_Initiation_Service_Provider__c', state =>
      Boolean(
        dataValue('form.referral_services.service_type.art_support_services.art_services_group.art_services_option1')(
          state
        )
      )
    ),
    field('SKILLZ_Plus_Club_Support_Service_Provid__c', state =>
      Boolean(
        dataValue('form.referral_services.service_type.art_support_services.art_services_group.art_services_option2')(
          state
        )
      )
    ),
    field(
      'PMTCT_Service_Provider__c',
      state =>
        Boolean(
          dataValue('form.referral_services.service_type.art_support_services.art_services_group.art_services_option3')(
            state
          )
        ),
      field('ART_Services_Other_Service_Provider__c', state =>
        Boolean(
          dataValue(
            'form.referral_services.service_type.art_support_services.art_services_group.referred_art_support_services'
          )(state)
        )
      ),
      field(
        'Victim_Friendly_Services_Service_Provide__c',
        state =>
          Boolean(
            dataValue(
              'form.referral_services.service_type.child_protection_support_services.copy-1-of-check_the_services_that_were_provided.child_protection_option1'
            )(state)
          ) ||
          Boolean(
            dataValue(
              'form.referral_services.service_type.child_protection_support_services.copy-1-of-check_the_services_that_were_provided.child_protection_option2'
            )(state)
          )
      ),
      field('Legal_Services_Other_Service_Provider__c', state =>
        Boolean(
          dataValue(
            'form.referral_services.service_type.other_legal_services.confirmation_of_services_provided_label.legal_services_option3'
          )(state)
        )
      ),
      field('STI_Screen_Testing_Service_Provider__c', state =>
        Boolean(dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option1')(state))
      )
    ),
    field('Contraception_Family_Plan_Servi_Provider__c', state =>
      Boolean(dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option2')(state))
    ),
    field('Cervical_Cancer_Screen_Servi_Provider__c', state =>
      Boolean(dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option3')(state))
    ),
    field('HPV_vaccine_Service_Provider__c', state =>
      Boolean(dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option4')(state))
    ),
    field('Antenatal_Care_ANC_Service_Provider__c', state =>
      Boolean(dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option5')(state))
    ),
    field('Sexual_and_GBV_Abuse_Servi_Provider__c', state =>
      Boolean(dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option6')(state))
    ),
    field('Psycho_Social_Support_Service_Provider__c', state =>
      Boolean(dataValue('form.referral_services.service_type.other_srhr_services.service_label.srhr_option9')(state))
    )
  )
);
