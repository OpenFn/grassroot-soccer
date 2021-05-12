alterState(state => {
  function transform(value) {
    if (!value) return;
    switch (value.toString().trim().toLowerCase()) {
      case 'true':
      case 'yes':
      case 'agree':
        return 1;
      case 'false':
      case 'no':
      case 'disagree':
        return 2;
      case 'i_dont_know':
        return 3;
      case 'unanswered':
        return 4;
      case 'not_applicable':
        return 5;
      default:
        return value;
    }
  }

  state.helperFunctions = { transform };

  return state;
});

upsert(
  'Attendance__c',
  'CommCare_Ext_ID__c',
  fields(
    field('Event__c', dataValue('form.hidden_properties.intervention_name')),
   // relationship('Event__r', 'CommCare_Ext_ID__c', dataValue('form.hidden_properties.intervention_name')),
    relationship('Person_Attendance__r', 'CommCare_Ext_ID__c', dataValue('form.case.@case_id')),
    // relationship('Person_Attendance__r','CommCare_Ext_ID__c', state => {
    //   return (
    //     dataValue('form.hidden_properties.participant_first_name')(state) +
    //     dataValue('form.hidden_properties.participant_surname')(state)
    //   )
    // }),
    field('CommCare_Ext_ID__c', state => {
      return (
        dataValue('form.hidden_properties.intervention_name')(state) +
        dataValue('form.hidden_properties.participant_first_name')(state) +
        dataValue('form.hidden_properties.participant_surname')(state)
      )
        .toLowerCase()
        .replace(/\s/g, '')
        .trim();
    }),
    //field(
      //'Person_Attendance__c',
     // state =>
     //   dataValue('form.hidden_properties.participant_first_name')(state) +
    //    ' ' +
     //   dataValue('form.hidden_properties.participant_surname')(state)
    //),
    field('Site__c', dataValue('form.hidden_properties.site')),
    field('Gender__c', dataValue('form.hidden_properties.gender')),
    field('Grade__c', dataValue('form.hidden_properties.grade')),
    field('Class__c', dataValue('form.hidden_properties.class')),
    field('Pre_Post_Completed__c', state => {
      var done = dataValue('form.hidden_properties.pre_questionnaire_complete')(state);
      return done === 'Yes' ? true : done === 'No' ? false : undefined;
    }),
    field('Date_Pre_Administered__c', dataValue('form.date')),
    field('Pre_1__c', state => {
      const value =
        dataValue('form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.in_general_i_feel_good_about_myself')(state) ||
        dataValue('form.pre_challenge_zambia_-_skillz_core_zambia.i_know_what_i_am_good_at')(state) ||
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.i_have_talked_about_hiv_with_an_adult_in_the_past_two_months_outside_skillz'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_2__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_know_how_to_overcome_challenges_that_i_may_have_in_life'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.i_have_the_skills_and_knowledge_to_avoid_getting_infected_with_another_kind'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_3__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_can_make_my_own_decisions_no_matter_how_much_pressure_i_get_from_others'
        )(state) ||
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.unequal_power_in_relationships_can_contribute_to_the_spread_of_hiv'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_important_to_know_why_and_how_i_want_to_tell_someone_my_hiv_status'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_4__c', state => {
      const value =
        dataValue('form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.i_accept_myself_and_my_hiv_status')(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship'
        )(state) ||
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.the_most_effective_way_to_avoid_getting_hiv_is_to_abstain_from_sex'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_5__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_dont_always_have_to_do_what_people_expect_just_because_i_am_a_girlboy'
        )(state) ||
        dataValue('form.pre_challenge_nigeria_-_advanced_skills.malaria_is_spread_by_standing_under_the_hot_sun')(
          state
        ) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_6__c', state => {
      const value =
        dataValue('form.pre_challenge_nigeria_-_advanced_skills.drinking_alcohol_can_increase_my_risk_of_getting_hiv')(
          state
        ) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.are_you_or_have_you_been_past_12_months_in_a_sexual_relationship_na_if_not_'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_7__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.sleeping_under_a_mosquito_net_every_night_can_help_protect_me_from_malaria'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.are_you_or_your_boyfriendgirlfriend_currently_using_any_contraceptive_or_pr'
        )(state) ||
        dataValue('form.pre_challenge_zambia_-_skillz_core_zambia.girls_should_not_disagree_with_boys')(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_8__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.having_more_than_one_sexual_partner_over_the_same_time_period_increases_my_'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.if_a_girl_gets_pregnant_she_should_drop_out_of_school'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.i_have_an_older_person_in_my_life_i_can_go_to_for_advice'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_9__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.it_is_okay_for_someone_with_malaria_to_stop_taking_their_medication_as_soon'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.there_are_people_i_trust_with_whom_i_can_talk_about_my_status'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_have_the_right_to_say_no_to_sex_no_matter_who_asks_me'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_10__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.i_can_abstain_from_sex_until_i_am_older_even_if_it_is_difficult'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_have_an_older_person_in_my_life_i_can_go_to_for_advice'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_okay_for_two_people_with_hiv_to_have_unprotected_sex_with_each_other'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_11__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.i_would_say_no_to_playing_sport_with_someone_who_has_hiv'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.when_i_have_a_choice_it_is_important_to_eat_a_variety_of_foods_including_gr'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.if_i_test_positive_for_hiv_there_will_be_someone_who_will_help_and_support_'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_12__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.men_should_share_the_work_around_the_house_such_as_cleaning'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_okay_for_someone_with_hiv_to_stop_taking_their_arv_as_soon_as_they_st'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_13__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.it_is_the_males_responsibilty_to_make_decisions_in_a_relationship'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.art_adherence_is_an_important_part_of_my_overall_health_and_wellbeing'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_14__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.i_can_use_drugs_and_still_easily_reach_my_goals_in_life'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.mental_health_problems_have_nothing_to_do_with_being_lazy_or_weak_and_many_'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related'
        );

      return state.helperFunctions.transform(value);
    }),
    field('Pre_15__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.when_sick_it_is_better_to_visit_the_herb_seller_than_to_visit_a_doctor_or_a'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.the_most_common_illnesses_of_mental_health_are_depression_and_anxiety'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_know_where_to_get_support_services_for_me_or_someone_else_for_abuse'
        );

      return state.helperFunctions.transform(value);
    }),
    field('Pre_16__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.it_is_okay_to_use_violence_with_my_partner_if_he_or_she_makes_me_angry'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.biological_and_social_factors_contribute_to_females_and_males_experiencing_'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_have_the_right_to_access_sexual_health_services_such_as_sti_and_hiv_testi'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_17__c', state => {
      const value =
        dataValue(
          'form.pre_challenge_nigeria_-_advanced_skills.i_have_the_power_to_change_gender_expectations_that_i_do_not_agree_with'
        )(state) ||
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.if_sexually_active_one_sign_of_pregnancy_can_be_a_girl_missing_her_period'
        )(state);

      return state.helperFunctions.transform(value);
    }),
    field('Pre_18__c', state =>
      state.helperFunctions.transform(
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_would_say_no_to_playing_sport_with_someone_who_has_hiv'
        )(state)
      )
    ),
    field('Pre_19__c', state =>
      state.helperFunctions.transform(
        dataValue(
          'form.pre_challenge_zambia_-_skillz_core_zambia.i_can_tell_whether_someone_has_hiv_by_looking_at_him_or_her'
        )(state)
      )
    ),
    field('Pre_20__c', state =>
      state.helperFunctions.transform(
        dataValue('form.pre_challenge_zambia_-_skillz_core_zambia.i_know_what_decisions_to_make_to_achieve_my_goals')(
          state
        )
      )
    )
  )
);
