upsert(
  'Event__c',
  'Name',
  fields(
    field('Name', dataValue('form.@name')),
    relationship('RecordType', 'Name', 'Intervention'),
    field('Grant__c.CommCare_Ext_ID__c', dataValue('form.grant')),
    field(
      'Business_Unit__c.CommCare_Ext_ID__c',
      dataValue('form.business_unit')
    ),
    field('Site__c.CommCare_Ext_ID__c', dataValue('form.site')),
    field('Country__c.CommCare_Ext_ID__c', dataValue('form.site_country')),
    field('Venue__c.CommCare_Ext_ID__c', dataValue('form.Venue')),
    field('Venue_Type__c', dataValue('form.venue_type')),
    field(
      'Curriculum__c.CommCare_Ext_ID__c',
      dataValue('form.curriculum_selection.curriculum')
    ),
    field(
      'Graduation_Minimum__c',
      dataValue('form.curriculum_selection.graduate_number')
    ),
    field('Delivery_Method__c', dataValue('form.delivery_method')),
    field('Class_Group_Team__c', dataValue('form.class_grade')),
    field('Geographical_area__c', dataValue('form.geographic_area')),
    field('Pre_Post_Completed__c', dataValue('form.prepost_administered')),
    field('Coach_A__c.CommCare_Ext_ID__c', dataValue('form.coaches')),
    field('Start_Date__c', dataValue('form.intervention_dates.start_date')),
    field('End_Date__c', dataValue('form.intervention_dates.end_date'))
  )
);
