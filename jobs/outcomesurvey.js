fn((state) => {

  
  state.capitalizeFirstLetter = (text) => {
    if (!text) return text; // Return the text if it's empty or undefined
      return text.charAt(0).toUpperCase() + text.slice(1);
  };
  
  state.replaceUnderscoreWithSpace = (text) => {
    if (typeof text !== 'string') {
      return ''; // Return an empty string if input is not a string
  }
  return text.replace(/_/g, ' ');
}

state.replaceSpaceWithSemiColon = (text) => {
    if (typeof text !== 'string') {
      return ''; // Return an empty string if input is not a string
  }
  return text.replace(/ /g, ';');
  
}

state.HIVtestMap = {
    agree: "Positive",
    negative: "Negative",
    "copy-2-of-days": "5 - 6 days",
    "i_dont_knowdeclined": "I don't know / Declined to answer",
    "i_dont_knowdeclined_answer": "I don't know / Declined to answer",
    "i_dont_knowdeclined_to_answer": "I don't know / Declined to answer"
  };



state.daysMap = {
    days: "1 - 2 days",
    "copy-1-of-days": "3 - 4 days",
    "copy-2-of-days": "5 - 6 days",
    "more_than_6_days": "More than 6 days",
    "none": "None"
  };
  
  state.agreeDisagreeMap = {
    Agree: 'Yes', //New
    Disagree: 'No', // Continued
    "I don't know/Declined to answer": "Declined to answer",
    "I_dont_know_declined_to_answer": "Declined to answer",
    "I_dont_knowdeclined_to_answer": "I don't know",
    "choice2": "No"
  };
  
  state.agreeDisagreeMap2 = {
    Agree: 'Yes', //New
    Disagree: 'No', // Continued
    "I don't know/Declined to answer": "Declined to answer",
    "I_dont_know_declined_to_answer": "Declined to answer",
    "I_dont_knowdeclined_to_answer": "Declined to answer",
    "choice2": "No"
  };
  
  state.timeMap = {
    "all_of_the_time": "All of the time",
    "most_of_the_time": "Most of the time", 
    "more_than_half_of_the_time": "More than half of the time",
    "less_than_half_of_the_time": "Less than half of the time",
    "some_of_the_time": "Some of the time",
    "at_no_time": "At no time",
    "choice10": "Less than half of the time"
  }
  
  state.choiceMapping = {
    "choice1": "Confidentiality concerns",
    "choice2": "Contraceptives including pills, injections, implants or similar",
    "choice3": "Condoms – male or female",
    "choice4": "Voluntary medical male circumcision",
    "choice10": "Less than half of the time",
    "Sexual and reproductive health informationtalks": "Sexual and reproductive health information/talks"

  }
  
  state.choiceMapping2 = {
    "Choice2": "Yes",
  }
  
  state.idkdeclinedtodeclined = {
    "I_dont_know_declined_to_answer": "Declined to answer",
  }
  
   state.idkdeclinedtoidkdeclined = {
    "I_dont_know_declined_to_answer": "I don't know / Declined to answer",
    "I_dont_knowdeclined_to_answer": "I don't know / Declined to answer"
  }
  
  
  // function capitalizeFirstLetter(text) {
  // if (!text) return text; // Return the text if it's empty or undefined
  // return text.charAt(0).toUpperCase() + text.slice(1);
  // }

  function transform(value) {
    if (!value) return;
    //console.log("value in switch", value.toString().trim().toLowerCase());
    switch (value.toString().trim().toLowerCase()) {
      case "Agree":
        return "Yes";
      case "Disagree":
        return "No";
      case "I don't know/Declined to answer":
        return "Declined to answer";
      default:
        return value;
    }
  }

  state.helperFunctions = { transform };

  return state;
});

fn((state) => {
  const { form } = state.data;
  state.surveyMappings = {
    CommCare_Ext_ID__c: dataValue("id"),
    Name_of_Interviewer__c: form["name_of_interviewer"],
    Date__c: form.date,
    Interview_Start_Time__c: form.interview_start_time,
    Interview_End_Time__c: form.interview_end_time,
    What_was_the_main_reason_the_participant__c:
      form[
        "copy-1-of-what_was_the_main_reason_the_participant_did_not_consent_to_participate_in_"
      ],
    Site_Name__c: state.capitalizeFirstLetter(form.site),
    Venue_Name__c: form.venue,
    Group_Name__c: form.group_name,
    //Grade__c: 'form.grade',
    Curriculum_Attended__c: form.curriculum,
    Give_permission_to_participate__c:
      form["did_the_individual_give_permission_to_participate_in_the_survey"],
    Main_reason_of_not_consenting__c: state.choiceMapping[state.replaceUnderscoreWithSpace(state.capitalizeFirstLetter(
      form["what_was_the_main_reason_the_participant_did_not_consent_to_participate_in_"]))],
    Participant_Name__c: form.participant_name,
    Participant_Gender__c: state.capitalizeFirstLetter(form.participant_gender),
    Participant_DOB__c: form.participant_date_of_birth,
    Currently_live_with_at_home__c: state.replaceUnderscoreWithSpace(state.capitalizeFirstLetter(form["who_do_you_currently_live_with_at_home"])),
    Days_did_you_go_without_food__c: state.daysMap[form["in_the_last_week_how_many_days_did_you_go_without_food"]],
    Ever_been_in_any_kind_of_sexual_relation__c: state.capitalizeFirstLetter(form["have_you_ever_been_in_any_kind_of_sexual_relationship_with_someone"]),
    In_any_form_of_sexual_relationship__c: state.choiceMapping2[state.capitalizeFirstLetter(form["are_you_currently_in_any_form_of_sexual_relationship"])],
    Age_of_your_current_last_sexual_partner__c: state.capitalizeFirstLetter(form["what_is_the_age_of_your_currentlast_sexual_partner"]),
    Ever_had_sexual_intercourse__c: state.capitalizeFirstLetter(form["have_you_ever_had_sexual_intercourse"]),
    Age_at_first_sex__c: state.capitalizeFirstLetter(form["how_old_were_you_when_you_had_sexual_intercourse_for_the_first_time"]),
    La__c: state.replaceUnderscoreWithSpace(state.capitalizeFirstLetter(form["the_last_time_you_had_sexual_intercourse_why_did_you_do_it"])),
    Last_2_years_pregnant_or_given_birth__c: state.capitalizeFirstLetter(form["in_the_last_2_years_did_you_ever_get_pregnant_or_give_birth_instruction_thi"]),
    HIV_positive_should_hide_it_from_others__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["people_who_test_hiv_positive_should_hide_it_from_others"])],
    I_would_rather_not_know_if_I_have_HIV__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_would_rather_not_know_if_i_have_hiv"])],
    someone_with_HIV_to_stop_taking_their_AR__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["it_is_okay_for_someone_with_hiv_to_stop_taking_their_arv_as_soon_as_they_st"])],
    People_with_HIV_to_have_unprotected_sex__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["it_is_okay_for_two_people_with_hiv_to_have_unprotected_sex_with_each_other"])],
    Someone_has_HIV_by_looking_at_him_or_her__c: state.capitalizeFirstLetter(form["i_can_tell_whether_someone_has_hiv_by_looking_at_him_or_her"]),
    talk_to_a_partner_about_HIV_STI_testing__c: state.capitalizeFirstLetter(form["i_know_how_to_talk_to_a_partner_about_hivsti_testing"]),
    HIV_testing_is_free_at_government_health__c: state.agreeDisagreeMap2[state.capitalizeFirstLetter(form["hiv_testing_is_free_at_government_health_facilities"])],
    Have_you_ever_tested_for_HIV__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["have_you_ever_tested_for_hiv"])],
    Result_of_your_last_HIV_test__c: state.HIVtestMap[form["what_was_the_result_of_your_last_most_recent_hiv_test"]],
    Where_to_get_support_services__c: state.capitalizeFirstLetter(form["i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related"]),
    Right_to_access_sexual_health_services__c: state.capitalizeFirstLetter(form["i_have_the_right_to_access_sexual_health_services_such_as_sti_and_hiv_testi"]),
    Where_to_get_support_services_for_GBV__c: state.agreeDisagreeMap(state.capitalizeFirstLetter[form["i_know_where_to_get_support_services_for_me_or_someone_else_for_gender-base"]]),
    Services_accessed_in_the_past_2_years__c: state.choiceMapping[state.replaceUnderscoreWithSpace(state.capitalizeFirstLetter(form["in_the_last_2_years_which_of_these_services_have_you_accessed_through_the_c"]))],
    Accessed_the_above_services__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["did_you_access_the_above_services_more_than_once_per_year"])],
    The_staff_at_my_nearest_clinic_are_frien__c: state.capitalizeFirstLetter(form["the_staff_at_my_nearest_clinic_are_friendly"]),
    Keep_my_personal_information_private__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["the_staff_at_my_nearest_clinic_will_keep_my_personal_information_private"])],
    Feel_stigmatism_or_judged__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_do_not_feel_stigmatism_or_judged_when_i_go_to_access_sexual_reproductive_"])],
    Suggests_using_a_condom__c: state.capitalizeFirstLetter(state.HIVtestMap[form["when_a_partner_suggests_using_a_condom_it_means_he_or_she_has_had_sex_with_"]]),
    A_condom_would_make_sex_less_pleasing__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["using_a_condom_would_make_sex_less_pleasant"])],
    I_know_how_to_correctly_use_a_condom__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_know_how_to_correctly_use_a_condom"])],
    Able_to_refuse_to_have_sex__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_would_be_able_to_refuse_to_have_sex_if_my_partner_did_not_want_to_use_a_c"])],
    Condoms_are_the_only_contraceptive__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["condoms_are_the_only_contraceptive_method_that_protect_against_pregnancy_as"])],
    Use_a_condom__c: state.idkdeclinedtoidkdeclined[state.capitalizeFirstLetter(form["i_should_use_a_condom_even_if_my_girlfriend_is_on_another_form_of_birth_con"])],
    The_last_time_you_had_sexual_intercourse__c: state.capitalizeFirstLetter(form["the_last_time_you_had_sexual_intercourse_did_you_and_your_partner_use_a_con"]),
    A_girl_woman_can_get_pregnant__c: state.idkdeclinedtoidkdeclined[state.capitalizeFirstLetter(form["a_girl_or_woman_can_get_pregnant_the_very_first_time_she_has_sex"])],
    Sign_of_Pregnancy__c: state.capitalizeFirstLetter(form["one_sign_of_pregnancy_is_a_girl_missing_her_period"]),
    Ever_used_family_planning_method__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["have_you_ever_used_any_type_of_family_planning"])],
    Recieved_Family_Planning__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["in_the_last_2_years_did_you_ask_for_or_receive_family_planning"])],
    Type_of_Family_Planning_accessed__c: state.replaceUnderscoreWithSpace(state.capitalizeFirstLetter(form["in_the_last_2_years_what_type_of_family_planning_services_did_you_access"])),
    Methods_to_avoid_unwanted_pregnancy__c: state.capitalizeFirstLetter(form["i_know_at_least_three_methods_to_avoid_an_unwanted_pregnancy"]),
    Support_for_prevention_of_teen_pregnancy__c: state.capitalizeFirstLetter(form["in_the_last_2_years_did_you_get_support_for_prevention_of_teenage_pregnancy"]),
    I_have_felt_cheerful_and_in_good_spirits__c: state.timeMap[(form["i_have_felt_cheerful_and_in_good_spirits"])],
    I_have_felt_calm_and_relaxed__c: state.timeMap[form["i_have_felt_calm_and_relaxed"]],
    I_have_felt_active_and_vigorous__c: state.timeMap[form["question11"]],
    I_woke_up_feeling_fresh_and_rested__c: state.timeMap[form["i_woke_up_feeling_fresh_and_rested"]],
    Life_filled_with_things_interesting_me__c: state.replaceUnderscoreWithSpace(state.capitalizeFirstLetter(form["my_daily_life_has_been_filled_with_things_that_interest_me"])),
    Sign_of_personal_weakness__c: state.idkdeclinedtoidkdeclined[state.capitalizeFirstLetter(form["a_mental_illness_is_a_sign_of_personal_weakness"])],
    //Sign_of_personal_weakness__c: state.capitalizeFirstLetter(form["seeking_help_for_mental_health_challenges_is_a_sign_of_weakness"]),
    Expectations_dealing_with_emotions__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["society_expects_boys_and_girls_to_deal_with_their_emotions_differently"])],
    Self_control_and_smart_decisions__c: state.capitalizeFirstLetter(form["self-control_helps_you_make_smart_decisions_when_you_are_angry_or_upset"]),
    Avoid_using_violent_behaviour__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["when_i_am_angry_i_know_how_to_avoid_using_violent_behaviour"])],
    Confidence_and_face_to_face_appointments__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_am_confident_attending_face_to_face_appointments_to_seek_information_abou"])],
    Seek_information_about_mental_illness__c: state.idkdeclinedtoidkdeclined[state.capitalizeFirstLetter(form["i_am_confident_that_i_know_where_to_seek_information_about_mental_illness"])],
    Bounce_back_from_difficult_situations__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_can_bounce_back_from_difficult_situations"])],
    Avoid_people_with_mental_illness__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["it_is_best_to_avoid_people_with_mental_illness_so_that_you_dont_develop_thi"])],
    Informed_decisions_about_sexual_health__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_can_make_my_own_informed_decisions_about_my_sexual_healthcare"])],
    Say_no_to_sex_despite_pressure__c: state.capitalizeFirstLetter(form["i_can_say_no_to_sex_even_if_my_boyfriend_or_friends_pressure_me_to_have_sex"]),
    Make_my_own_decisions_pressure__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_can_make_my_own_decisions_no_matter_how_much_pressure_i_get_from_others"])],
    Tell_someone_if_I_were_touched__c: state.capitalizeFirstLetter(form["i_would_tell_someone_if_i_were_touched_in_a_manner_that_made_me_uncomfortab"]),
    Say_no_to_sex_no_matter_who_asks_me__c: state.capitalizeFirstLetter(form["i_can_say_no_to_sex_no_matter_who_asks_me"]),
    How_to_overcome_challenges__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_know_how_to_overcome_challenges_that_i_may_face_in_my_life"])],
    I_can_achieve_my_goals__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_can_achieve_my_goals_even_if_i_face_challenges"])],
    Confident_setting_measurable_goals__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["i_feel_confident_setting_measurable_goals"])],
    Good_reason_to_hit_his_girlfriend_wife__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["sometimes_a_man_or_boyfriend_may_have_a_good_reason_to_hit_his_girlfriend_o"])],
    Take_part_in_household_chores__c: state.capitalizeFirstLetter(form["men_should_take_part_in_household_chores_such_as_washing_plates_and_sweepin"]),
    Girls_responsibility_on_pregnancy__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["it_is_only_the_girls_responsibility_to_avoid_getting_pregnant"])],
    Right_to_have_sex__c: state.capitalizeFirstLetter(form["a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want"]),
    Appropriate_for_a_girl_to_carry_condoms__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["it_is_not_appropriate_for_a_girlwoman_to_carry_condoms"])],
    Where_to_get_support__c: state.idkdeclinedtoidkdeclined[state.capitalizeFirstLetter(form["copy-1-of-i_know_where_to_get_support_services_for_me_or_someone_else_for_gender-base"])],
    Gone_to_seek_support_forself__c: state.agreeDisagreeMap[state.capitalizeFirstLetter(form["in_the_last_2_years_have_you_ever_gone_to_seek_support_for_yourself_or_for_"])],
    People_in_my_life_who_I_can_get_help__c: state.idkdeclinedtoidkdeclined[state.capitalizeFirstLetter(form["there_are_people_in_my_life_who_i_can_get_help_from_if_i_need_it"])],
    People_in_my_life_who_I_can_talk_to__c: state.capitalizeFirstLetter(form["there_are_people_in_my_life_who_i_can_talk_to_about_how_to_handle_things"]),
    Where_to_go_for_support_for_alcohol__c: state.idkdeclinedtoidkdeclined[state.capitalizeFirstLetter(form["i_know_where_to_go_for_support_if_i_or_someone_i_know_drinks_too_much_alcoh"])],
  };
  return state;
});

upsert(
  "SKILLZ_Outcome_Monitoring_Survey__c",
  "CommCare_Ext_ID__c",
  (state) => state.surveyMappings
);
