// push to production
upsert(
  'PHQ_9_Strong_Minds__c',
  'CommCare_Ext_ID__c',
  fields(
    field('CommCare_Ext_ID__c', dataValue('id')),
    //relationship('Intervention__r','CommCare_Ext_ID__c', dataValue('form.hidden_properties.intervention')),
    //relationship('Participant__r','CommCare_Ext_ID__c', dataValue('form.hidden_properties.participant_fullname')),
    field('Mobile_Contact_Information__c', dataValue('form.hidden_properties.mobile_number')),
    field('Curriculum__c', dataValue('form.hidden_properties.curriculum')),
    //field('Intervention__c', dataValue('form.hidden_properties.intervention')),
    field('Gender__c', dataValue('form.hidden_properties.gender')),
    field('Participant_Name__c', dataValue('form.hidden_properties.participant_fullname')),
    field('Venue__c', dataValue('form.hidden_properties.venue')),
    field('Site__c', dataValue('form.hidden_properties.site')),
    field('Interview_Date__c', dataValue('form.interview_date')),
    field('Resident_not_shifting_in_3_months_time__c', dataValue('form.full_time_resident')),
    field('Area_Center__c', dataValue('form.hidden_properties.coach_name')),
    //TODO: match multiple choice options in CC and SF for two fields below.
    field('Marital_Status__c', dataValue('form.begin_interview.what_is_your_marital_status')),
    field('Position_of_Respondent_in_Household__c',
      dataValue('form.begin_interview.position_of_respondent_in_the_household')
    ),
    field('Q1_Little_interest_pleasure__c', dataValue('form.begin_interview.questions.little_interest')),
    field('Q2_Sad_Down_Depressed_Hopeless__c', dataValue('form.begin_interview.questions.depressed_sad_hopeless')),
    field('Q3_Trouble_sleeping__c', dataValue('form.begin_interview.questions.trouble_sleeping')),
    field('Q4_Feeling_tired__c', dataValue('form.begin_interview.questions.heavy_burden')),
    field('Q5_Appetite_problems__c', dataValue('form.begin_interview.questions.appetite_problems')),
    field('Q6_Failure_Worthless_Guilt__c', dataValue('form.begin_interview.questions.feeling_bad')),
    field('Q7_Trouble_concentrating__c', dataValue('form.begin_interview.questions.trouble_concentrating')),
    field('Q8_Trouble_in_speech__c', dataValue('form.begin_interview.questions.moving_slowly')),
    field('Q9_Suicidal_thoughts__c', dataValue('form.begin_interview.questions.thoughts_suicide')),
    //field('PHQ9_Total_Score__c', dataValue('form.begin_interview.questions.phq9_result.PHQ9_score'))
  )
);
