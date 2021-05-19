// Push to production
alterState(state => {

  function getAge(dateString) {
    if (!dateString) return;

    const today = new Date();
    const birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function transform(value) {
    if (!value) return;
    switch (value.toString().trim()) {
      case 'i_dont_know__i_dont_recall':
        return "I don't know/I don't recall";
      case 'i_dont_recall':
        return "I don't know/I don't recall";
      case 'no':
        return 'No';
      case 'yes':
        return 'Yes';
      case 'na':
        return 'NA';      
      case 'disagree':
        return '2 (Disagree)';
      case 'agree':
        return '4 (Agree)';   
      case 'neither_agree_or_disagree':
        return '3 (Neither Agree or Disagree)';
      case 'strongly_agree':
        return '5 (Strongly Agree)';      
      case 'strongly_disagree':
        return '1 (Strongly Disagree)'; 
      default:
        return value;
    }
  }


  state.helperFunctions = { getAge };
  
  state.data.form.behavioural.are_you_taking_any_other_religious_treatment_ie_holy_water_anointing_oilwat = 
  transform(state.data.form.behavioural.are_you_taking_any_other_religious_treatment_ie_holy_water_anointing_oilwat)
  
  state.data.form.behavioural.are_you_taking_any_traditional_medicine_as_a_supplement_to_the_arvs = 
  transform(state.data.form.behavioural.are_you_taking_any_traditional_medicine_as_a_supplement_to_the_arvs)
  
  state.data.form.behavioural.if_yes_to_any_of_the_above_did_it_affect_your_taking_of_medication_treatmen = 
  transform(state.data.form.behavioural.if_yes_to_any_of_the_above_did_it_affect_your_taking_of_medication_treatmen)
  
  state.data.form.behavioural.in_the_past_month_did_you_go_for_a_party_or_other_leisure_activities = 
  transform(state.data.form.behavioural.in_the_past_month_did_you_go_for_a_party_or_other_leisure_activities)
  
  state.data.form.behavioural.in_the_past_month_did_you_sleep_away_from_home = 
  transform(state.data.form.behavioural.in_the_past_month_did_you_sleep_away_from_home)
 

  state.data.form.clinical_knowledge.question16 = 
  transform(state.data.form.clinical_knowledge.question16)
  
  state.data.form.treatment_adherence.did_you_encounter_any_challenges_in_taking_your_medication_as_prescribed_in = 
  transform(state.data.form.treatment_adherence.did_you_encounter_any_challenges_in_taking_your_medication_as_prescribed_in)
  
  state.data.form.treatment_adherence.in_the_past_month_have_you_failed_to_take_any_of_your_art_treatment = 
  transform(state.data.form.treatment_adherence.in_the_past_month_have_you_failed_to_take_any_of_your_art_treatment)
  
  state.data.form.treatment_adherence.in_the_past_month_have_you_taken_any_of_your_art_treatment_at_times_other_t = 
  transform(state.data.form.treatment_adherence.in_the_past_month_have_you_taken_any_of_your_art_treatment_at_times_other_t)
  
  state.data.form.treatment_adherence.in_the_past_month_have_you_taken_less_or_more_pills_of_any_of_your_art_trea = 
  transform(state.data.form.treatment_adherence.in_the_past_month_have_you_taken_less_or_more_pills_of_any_of_your_art_trea)
  
  state.data.form['treatment_self-efficacy'].how_sure_are_you_that_you_will_be_taking_your_medication_as_are_directed = how_sure_are_you_that_you_will_be_taking_your_medication_as_are_directed = 
  transform(state.data.form['treatment_self-efficacy'].how_sure_are_you_that_you_will_be_taking_your_medication_as_are_directed)
  
  state.data.form.treatment_self-efficacy.how_sure_are_you_that_your_medication_will_have_a_positive_effect_on_your_h = 
  transform(state.data.form.treatment_self.how_sure_are_you_that_your_medication_will_have_a_positive_effect_on_your_h)
  
  state.data.form.treatment_self-efficacy.how_sure_are_you_that_your_medication_will_help_you_live_a_longer_and_healt = 
  transform(state.data.form.treatment_self.how_sure_are_you_that_your_medication_will_help_you_live_a_longer_and_healt)
  
  
  return state;
});



upsert(
  'ART_ADHERENCE_SELF_SELF_REPORTING_TOOL__c',
  'CommCare_Ext_ID__c',
  fields(
    field('CommCare_Ext_ID__c', dataValue('id')),
    field('Date__c', dataValue('form.demographic_information.date')),
    field('Sex__c', dataValue('form.gender')),
    field('Facility_Name__c', dataValue('form.school')),
    field('Patient_ID_or_Facility_File_Number__c', dataValue('form.skillz_lplus_number')),
    field('Business_Unit__c', 'GRS Zambia'),
    field('Captured_By__c', dataValue('form.coach_name')),
    field('Verified_By__c', dataValue('form.coach_name')),
    field('Captured_Date__c', dataValue('form.demographic_information.date')),
    field('Verified_Date__c', dataValue('form.demographic_information.date')),
    field('Age__c', state => {
      const dob = dataValue('form.date_of_birth')(state);
      return state.helperFunctions.getAge(dob);
    }),    
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
    field('Clinical_Knowledge_2__c', dataValue('form.clinical_knowledge.do_you_know_your_viral_load')),
    field(
      'Clinical_Knowledge_1__c',
      dataValue('form.clinical_knowledge.when_did_you_last_go_for_these_two_clinical_tests')
    ),
    field(
      'Treatment_Self_Efficacy__c',
      dataValue('form.treatment_self-efficacy.how_sure_are_you_that_you_will_be_taking_your_medication_as_are_directed')
    ),
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
