// Push to production
upsert(
  'ART_ADHERENCE_SELF_SELF_REPORTING_TOOL__c',
  'CommCare_Ext_ID__c',
  fields(
    field('CommCare_Ext_ID__c', dataValue('id')),
    field('Date__c', dataValue('form.demographic_information.date')),
    field(
      'Treatment_Adherence_3__c',
      dataValue('form.treatment_adherence.in_the_past_month_have_you_taken_any_of_your_art_treatment_at_times_other_t')
    ),
    field(
      'Treatment_Adherence_2__c',
      dataValue('form.treatment_adherence.in_the_past_month_have_you_failed_to_take_any_of_your_art_treatment')
    ),
    field(
      'Treatment_Adherence_4__c',
      dataValue('form.treatment_adherence.in_the_past_month_have_you_taken_less_or_more_pills_of_any_of_your_art_trea')
    ),
    field(
      'Treatment_Adherence_5_a__c',
      dataValue('form.treatment_adherence.did_you_encounter_any_challenges_in_taking_your_medication_as_prescribed_in')
    ),
    //field('Clinical_Knowledge_2__c', dataValue('form.clinical_knowledge.do_you_know_your_viral_load')),
    field(
      'Clinical_Knowledge_1__c',
      dataValue('form.clinical_knowledge.when_did_you_last_go_for_these_two_clinical_tests')
    ),
    //field(
    //  'Treatment_Self_Efficacy__c',
    //  dataValue('form.treatment_self-efficacy.how_sure_are_you_that_you_will_be_taking_your_medication_as_are_directed')
    //),
    field(
      'Treatment_Self_Efficacy_10__c',
      dataValue(
        'form.treatment_self-efficacy.how_sure_are_you_that_your_medication_will_have_a_positive_effect_on_your_h'
      )
    ),
    field(
      'Treatment_Self_Efficacy_11__c',
      dataValue(
        'form.treatment_self-efficacy.how_sure_are_you_that_your_medication_will_help_you_live_a_longer_and_healt'
      )
    ),
    field(
      'Behavioural_Factors_12__c',
      dataValue('form.behavioural.in_the_past_month_did_you_go_for_a_party_or_other_leisure_activities')
    ),
    field('Behavioural_Factors_13__c', dataValue('form.behavioural.in_the_past_month_did_you_sleep_away_from_home')),
    field(
      'Behavioural_Factors_14__c',
      dataValue('form.behavioural.are_you_taking_any_traditional_medicine_as_a_supplement_to_the_arvs')
    ),
    field(
      'Behavioural_Factors_14__c',
      dataValue('form.behavioural.are_you_taking_any_other_religious_treatment_ie_holy_water_anointing_oilwat')
    ),
    field(
      'Behavioural_Factors_15__c',
      dataValue('form.behavioural.if_yes_to_any_of_the_above_did_it_affect_your_taking_of_medication_treatmen')
    )
  )
);
