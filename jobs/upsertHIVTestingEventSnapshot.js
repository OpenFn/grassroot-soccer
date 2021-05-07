// push to production
upsert(
  'Event__c',
  'CommCare_Ext_ID__c',
  fields(
    field('Name', dataValue('form.basic_information.intervention')),
    field('Venue__c', dataValue('form.basic_information.venue')),
    field('Coach_A__c', dataValue('form.hidden_properties.coach_name')),
    field('Date__c', dataValue('form.basic_information.event_date')),
    field('Testing_Partner_Contact_Persion__c', dataValue('form.basic_information.testing_partner__contact_people')),
    field('of_People_in_Attendance_Testing_Events__c', dataValue('form.basic_information.number_in_attendance')),
    field('Event_Type__c', dataValue('form.basic_information.testing_event_type')),
    field('Coordinator__c', dataValue('form.basic_information.event_coordinator')),
    field(
      'What_organization_discussed_VMMC__c',
      dataValue('form.basic_information.question2.what_organisation_discussed_mmc')
    ),
    field(
      'What_organization_s_What_topic_s__c',
      dataValue(
        'form.basic_information.information_sessions_other.what_organisations_delivered_a_session_and_what_was_the_topic_of_the_sessio'
      )
    ),
    field(
      'How_was_the_information_presented__c',
      dataValue('form.basic_information.question2.how_was_this_information_presented_eg_lecture_individua_sessions_etc')
    ),
    field('how_many_people_attended_the_sessions__c', dataValue('form.basic_information.number_in_attendance')),
    field(
      'How_many_people_attended_the_sessions_oh__c',
      dataValue('form.basic_information.question2.approximately_how_many_people_attended_the_sessions_in_total')
    ),
    field(
      'Did_other_organizations_conduct__c',
      dataValue(
        'form.basic_information.information_sessions_other.did_other_organisations_eg_youth-friendly_clinic_ministry_of_health_etc_con'
      )
    ),
    field(
      'Testing_Key_Lesson_s_Learned__c',
      dataValue('form.basic_information.event_overview.highlights_key_challenges')
    ),
    field(
      'X2_Main_challenges__c',
      dataValue(
        'form.basic_information.event_overview.please_describe_highlights_key_challenges_and_main_lessons_learned_from_thi'
      )
    )
  )
);
