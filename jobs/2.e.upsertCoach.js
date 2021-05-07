//openfn.org source
alterState(state => {
  
  function clean(str){
    if(!!str)
    return str.split('_').map(word=>{let new_word = word.toString().toLowerCase();return (new_word.slice(0,1).toUpperCase()+new_word.slice(1))}).join(' ')

  }
  state.data.form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.micromove = clean(state.data.form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.micromove);
  
  return state;
});

upsert(
  'Coach_Support_Visit__c',
  'CommCare_Ext_ID__c',
  fields(
    field('CommCare_Ext_ID__c', dataValue('id')),
    // field('Country__c', dataValue('form.step_1_csv_information.country')), //do not map formulas
    relationship( 
      'Coach__r',
      'CommCare_Ext_ID__c',
      dataValue('form.step_1_csv_information.select_coach')
    ),
    relationship(
      'Venue__r',
      'CommCare_Ext_ID__c',
      dataValue('form.step_1_csv_information.venue')
    ),
    relationship(
      'Event__r',
      'Name',
      dataValue('form.step_1_csv_information.intervention')
    ),
    relationship(
      'Curriculum_Aggregate__r', //Q: Should we rather map to Curriculum__
      'CommCare_Ext_ID__c',
      dataValue('form.step_1_csv_information.curriculum')
    ), // No lookup? ====================================
    relationship(
      'Site_Lookup__r',
      'CommCare_Ext_ID__c',
      dataValue('form.step_1_csv_informationform.site')
    ),
    field('Date__c', dataValue('form.step_2_practice_information.date_of_csv')),
    field(
      'Accurate_Information__c',
      dataValue(
        'form.step_3_the_big_five.question1.shares_accurate_information_about_hivaids_sexual_and_reproductive_health_an'
      )
    ),
    //field(
    //   'Accurate_Information__c',
    //   dataValue(
    //     'form.step_3_-_the_big_5.shares_accurate_information_about_hivaids_sexual_reproductive_health_and_ri'
    //   )
    // ),
    field(
      'Creates_safe_space__c',
      dataValue('form.step_3_the_big_five.question1.creates_safe_space')
    ),
    // field(
    // //   'Creates_safe_space__c',
    // //   dataValue('form.step_3_-_the_big_5.creates_safe_space')
    // // ),
    field(
      'Builds_personal_connections__c',
      dataValue(
        'form.step_3_the_big_five.question1.builds_personal_connections'
      )
    ),
    // field(
    //   'Builds_personal_connections__c',
    //   dataValue('form.step_3_-_the_big_5.builds_personal_connections')
    // ),
    field(
      'Gives_praise__c',
      dataValue('form.step_3_the_big_five.question1.gives_powerful_praise')
    ),
    // field('Gives_praise__c', dataValue('form.step_3_-_the_big_5.gives_praise')),
    field(
      'Sparks_vital_conversations__c',
      dataValue('form.step_3_the_big_five.question1.sparks_vital_conversations')
    ),
    //field(
    //   'Sparks_vital_conversations__c',
    //   dataValue('form.step_3_-_the_big_5.sparks_vital_conversations')
    // ),
    field(
      'X2_Warm_Up__c',
      dataValue(
        'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.warm_up'
      )
    ),
    // field('X2_Warm_Up__c', dataValue('form.step_3_-_the_big_5.preparation')),
     field(
       'X3_Activity__c',
       dataValue(
         'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.activity'
       )
     ),
    // field('X3_Activity__c', dataValue('form.step_3_-_the_big_5.warm_up')),
    field(
      'X4_Cool_Down__c',
      dataValue(
        'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.cool_down'
      )
    ),
     // field('X4_Cool_Down__c', dataValue('form.step_3_-_the_big_5.cool_down')),
    field(
      'Introduces_micromove__c',
      dataValue(
        'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.micromove'
      )
    ),
    field(
      'X5_Facilitation__c',
      dataValue(
        'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.faciliation'
      )
    ),
    // field(
    //   'X5_Facilitation__c',
    //   dataValue('form.step_3_-_the_big_5.time_management')
    // ),
    field(
      'X6_Time_Management__c',
      dataValue(
        'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.time_management'
      )
    ),
    field(
      'X1_Preparation__c',
      dataValue(
        'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.practice_preparation'
      )
    ),
    field(
      'Introduces_micromove__c',
      dataValue('form.step_3_-_the_big_5.faciliation')
    ),
    field(
      'Notes__c',
      dataValue(
        'form.step_3_-_the_big_5.additional_notes.include_your_obsevations_related_to_preparation_punctuality_process'
      )
    // ),
    // field(
    //   'Notes__c',
    //   dataValue(
    //     'form.step_3_-_the_big_5.additional_notes.is_the_goal_of_the_practice_achieved'
    //   )
    // ),
    // field(
    //   'Notes__c',
    //   dataValue(
    //     'form.step_3_-_the_big_5.additional_notes.do_participants_understand_clearly_and_correctly_the_message'
    //   )
    // ),
    // field(
    //   'Notes__c',
    //   dataValue(
    //     'form.step_3_-_the_big_5.additional_notes.is_the_coach_able_to_manage_the_group'
    //   )
    // ),
    // field(
    //   'Notes__c',
    //   dataValue(
    //     'form.step_3_-_the_big_5.additional_notes.are_participants_engaged_in_the_session'
    //   )
    // ),
    // field(
    //   'Notes__c',
    //   dataValue(
    //     'form.step_3_-_the_big_5.additional_notes.focus_on_the_coach_did_behaviour-based-coaching_and_let_the_coach_know_how_'
    //   )
    // ),
    // field(
    //   'Notes__c',
    //   dataValue(
    //     'form.step_3_-_the_big_5.additional_notes.the_notes_section_helps_you_give_the_coach_relevant_feedback_that_heshe_can'
    //   )
    )
  )
);