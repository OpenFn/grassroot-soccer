upsert(
  'Event__c',
  'Name',
  fields(
    field('CommCare_Ext_ID__c', dataValue('form.question_group.intervention_ name')),
    field('Testing_Partner_Contact_Persion__c', dataValue('form.event_information.testing_partner__contact_people')),
    field('of_People_in_Attendance_Testing_Events__c', dataValue('form.event_information.number_in_attendance')),
    field('Coordinator__c', dataValue('form.event_information.event_coordinator')),
    field(
      'Did_an_organization_discuss_Malaria__c',
      dataValue('form.malaria_treatment_prevention.info_malaria_treatment')
    ),
    field('What_organization_s_What_topic_s__c', dataValue('form.malaria_treatment_prevention.which_organizations')),
    field(
      'How_was_the_information_presented__c',
      dataValue('form.malaria_treatment_prevention.how_was_info_presented')
    ),
    field('of_Participants__c', dataValue('form.malaria_treatment_prevention.how_many_total_participants')),
    field(
      'Did_other_organizations_conduct__c',
      dataValue('form.skills_activities.did_other_organisations_eg_youth-friendly_clinic_ministry_of_health_etc_con')
    ),
    field(
      'What_organization_s_What_topic_s__c',
      dataValue('form.skills_activities.what_organisations_delivered_a_session_and_what_was_the_topic_of_the_session')
    ),
    field('Facilitator_1__c	', dataValue('form.skills_activities.facilitators')),
    field(
      'How_many_people_attended_the_sessions__c, How_many_people_attended_the_sessions_oh__c',
      dataValue('form.skills_activities.how_many_people_attended_the_sessions_in_total')
    ),
    field(
      'X2_Main_challenges__c, X1_Main_successes__c',
      dataValue('form.bed_net_distribution.please_describe_highlights_key_challenges_and_main_lessons_learned_from_thi')
    ),
    field(
      'Number_of_Bed_Nets_Distributed__c',
      dataValue('form.bed_net_distribution.total_number_of_bed_nets_distributed')
    ),
    field(
      'X2_Main_challenges__c, X1_Main_successes__c',
      dataValue('form.event_overview.please_describe_highlights_key_challenges_and_main_lessons_learned_from_thi')
    ),
    field('Site__c', dataValue('form.basic_information.site')),
    field('Venue__c', dataValue('form.basic_information.venue')),
    field('Curriculum__c', dataValue('form.basic_information.curriculum')),
    field('X1_0_Intervention_Name__c', dataValue('form.basic_information.intervention')),
    field('Coach_1__c', dataValue('form.basic_information.coach_name')),
    field('CommCare_Ext_ID__c', dataValue('form.question_group.intervention_ name')),
    field('Date__c', dataValue('form.basic_information.event_details.event_date')),
    field('Testing_Partner_Contact_Persion__c', dataValue('form.basic_information.testing_partner__contact_people')),
    field('of_People_in_Attendance_Testing_Events__c', dataValue('form.basic_information.number_in_attendance')),
    field('Coordinator__c', dataValue('form.basic_information.event_coordinator')),
    field(
      'Did_an_organization_discuss_VMCC__c',
      dataValue('form.basic_information.question2.did_an_organisation_share_information_on_mmc')
    ),
    field(
      'What_organization_discussed_VMMC__c',
      dataValue('form.basic_information.question2.what_organisation_discussed_mmc')
    ),
    field(
      'How_was_the_information_presented__c',
      dataValue('form.basic_information.question2.how_was_this_information_presented_eg_lecture_individua_sessions_etc')
    ),
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
      'What_organization_s_What_topic_s__c',
      dataValue(
        'form.basic_information.information_sessions_other.what_organisations_delivered_a_session_and_what_was_the_topic_of_the_sessio'
      )
    ),
    field(
      'Facilitator_1__c Facilitator_2__c etc',
      dataValue('form.basic_information.information_sessions_other.facilitators')
    ),
    field(
      'How_many_people_attended_the_sessions__c',
      dataValue('form.basic_information.information_sessions_other.how_many_people_attended_the_sessions_in_total')
    ),
    field(
      'X2_Main_challenges__c, X1_Main_successes__c',
      dataValue(
        'form.basic_information.event_overview.please_describe_highlights_key_challenges_and_main_lessons_learned_from_thi'
      )
    ),
    field(
      'Number_of_Bed_Nets_Distributed__c',
      dataValue('form.basic_information.event_overview.total_number_of_bed_nets_distributed')
    ),
    field(
      'X2_Main_challenges__c, X1_Main_successes__c',
      dataValue(
        'form.basic_information.copy-1-of-event_overview.please_describe_highlights_key_challenges_and_main_lessons_learned_from_thi'
      )
    )
  )
);
