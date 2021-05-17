//openfn.org source
alterState(state => {
  function clean(str) {
    console.log('str', str);

    if (!str) return '';

    return str
      .split('_')
      .map(word => {
        let new_word = word.toString().toLowerCase();
        return new_word.slice(0, 1).toUpperCase() + new_word.slice(1);
      })
      .join(' ');
  }

  state.data.form['step_3_-_the_big_5'].faciliation = clean(state.data.form['step_3_-_the_big_5'].faciliation);

  return state;
});

upsert(
  'Coach_Support_Visit__c',
  'CommCare_Ext_ID__c',
  fields(
    field('CommCare_Ext_ID__c', dataValue('id')),
    //relationship('Coach__r', 'CommCare_Ext_ID__c', dataValue('form.step_1_basic_information.select_coach')),
    relationship('Venue__r', 'CommCare_Ext_ID__c', dataValue('form.hidden_properties.venue')),
    relationship('Event__r', 'CommCare_Ext_ID__c', dataValue('form.hidden_properties.intervention')),
    relationship('Curriculum_Aggregate__r', 'CommCare_Ext_ID__c', dataValue('form.hidden_properties.curriculum')),
    relationship('Site_Lookup__r', 'CommCare_Ext_ID__c', dataValue('form.hidden_properties.site')),
    field('Date__c', dataValue('form.step_2_practice_information.date_of_csv')),
    //  field(
    //    'Accurate_Information__c',
    //    dataValue(
    //      'form.step_3_the_big_five.question1.shares_accurate_information_about_hivaids_sexual_reproductive_health_and_ri'
    //    )
    //  ),

    //== TODO: FIx repeated mappings to only reference destination field 1 time ===//
    field(
      'Accurate_Information__c',
      dataValue('form.step_3_-_the_big_5.shares_accurate_information_about_hivaids_sexual_reproductive_health_and_ri')
    ),
    //  field('Creates_safe_space__c', dataValue('form.step_3_the_big_five.question1.creates_safe_space')),
    field('Creates_safe_space__c', dataValue('form.step_3_-_the_big_5.creates_safe_space')),
    //  field(
    //    'Builds_personal_connections__c',
    //    dataValue('form.step_3_the_big_five.question1.builds_personal_connections')
    //  ),
    field('Builds_personal_connections__c', dataValue('form.step_3_-_the_big_5.builds_personal_connections')),
    //  field('Gives_praise__c', dataValue('form.step_3_the_big_five.question1.gives_powerful_praise')),
    field('Gives_praise__c', dataValue('form.step_3_-_the_big_5.gives_praise')),
    //  field('Sparks_vital_conversations__c', dataValue('form.step_3_the_big_five.question1.sparks_vital_conversations')),
    field('Sparks_vital_conversations__c', dataValue('form.step_3_-_the_big_5.sparks_vital_conversations')),
    //  field(
    //    'X2_Warm_Up__c',
    //    dataValue(
    //      'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.warm_up'
    //    )
    //  ),
    field('X2_Warm_Up__c', dataValue('form.step_3_-_the_big_5.warm_up')),
    //  field(
    //    'X3_Activity__c',
    //    dataValue(
    //      'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.activity'
    //    )
    //  ),
    field('X3_Activity__c', dataValue('form.step_3_-_the_big_5.activity')),
    //  field(
    //    'X4_Cool_Down__c',
    //    dataValue(
    //      'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.cool_down'
    //    )
    //  ),
    field('X4_Cool_Down__c', dataValue('form.step_3_-_the_big_5.cool_down')),
    //  field(
    //    'Introduces_micromove__c',
    //    dataValue(
    //      'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.micromove'
    //    )
    //  ),
    //  field(
    //    'X5_Facilitation__c',
    //    dataValue(
    //      'form.step_4_comments.for_each_practice_component_describe_what_the_coach_did_well_and_how_the_co.faciliation'
    //    )
    //  ),
    field('X5_Facilitation__c', dataValue('form.step_3_-_the_big_5.faciliation')),
    field(
      'X6_Time_Management__c',
      dataValue('form.step_3_-_the_big_5.time_management')
    ),
    field(
      'X1_Preparation__c',
      dataValue('form.step_3_-_the_big_5.preparation')
    ),
    //field('Introduces_micromove__c', dataValue('form.step_3_-_the_big_5.faciliation')),
    field(
      'Notes__c',
      dataValue(
        'form.step_3_-_the_big_5.additional_notes.include_your_obsevations_related_to_preparation_punctuality_process'
      )
    )
  )
);
